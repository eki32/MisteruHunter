import {
  Component,
  inject,
  afterNextRender,
  signal,
  ChangeDetectorRef,
  NgZone,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MysteryService } from './services/mystery';

declare global {
  interface Window {
    checkAnswerPopup: (titulo: string) => void;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  showWelcome = signal(true);
  private mysteryService = inject(MysteryService);
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);

  userId: string = ''; // Vacío hasta que haga login
  playerName = signal(''); // ✅ NUEVO: Para mostrar el nombre del jugador

  totalPoints = signal(0);
  selectedMystery = signal<any>(null);
  private awardedMysteries: Set<string> = new Set();

  showSuccessModal = signal(false);
  solvedMysteryTitle = signal('');
  earnedPoints = signal(0);

  showRanking = signal(false);
  topPlayers = signal<any[]>([]);
  loadingRanking = signal(false);
  userRank = signal<number | null>(null);
  showAllPlayers = signal(false);

  // ✅ Control del sistema de login/registro
  isLoginMode = signal(true); // true = login, false = registro
  nameError = signal('');
  passwordError = signal('');

  // ✅ NUEVO: Control del menú de usuario
  showUserMenu = signal(false);

  private map: any;
  private playerMarker: any;
  private L: any;
  misteriosList: any[] = [];
  private markers: Map<string, any> = new Map();

  private userProgress: { puntos: number; unlockedMysteries: string[] } = {
    puntos: 0,
    unlockedMysteries: [],
  };

  constructor() {
    window.checkAnswerPopup = (titulo: string) => {
      this.ngZone.run(() => {
        const inputElement = document.getElementById(`ans-${titulo}`) as HTMLInputElement;
        if (!inputElement) return;

        const respuestaUser = inputElement.value.trim();
        this.validarDesdePopup(titulo, respuestaUser);
      });
    };

    afterNextRender(async () => {
      const leafletModule = await import('leaflet');
      this.L = leafletModule.default || leafletModule;

      // ✅ Verificar si hay sesión guardada
      const savedUserId = localStorage.getItem('mysteryHunterUserId');
      const savedPlayerName = localStorage.getItem('mysteryHunterPlayerName');
      
      if (savedUserId && savedPlayerName) {
        this.userId = savedUserId;
        this.playerName.set(savedPlayerName);
        this.userProgress = await this.mysteryService.getUserProgress(this.userId);
        this.totalPoints.set(this.userProgress.puntos);
        this.showWelcome.set(false); // Saltar pantalla de bienvenida
        console.log('👋 Sesión recuperada:', savedPlayerName);
      }

      await this.initMap(this.L);
      this.loadMysteries(this.L);
      this.loadRanking();
    });
  }

  // ✅ Toggle entre login y registro
  toggleMode() {
    this.isLoginMode.update((v) => !v);
    this.nameError.set('');
    this.passwordError.set('');
  }

  // ✅ NUEVO: Toggle menú de usuario
  toggleUserMenu() {
    this.showUserMenu.update((v) => !v);
  }

  // ✅ NUEVO: Cerrar sesión
logout() {
  // Confirmar antes de cerrar sesión
  if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
    // Limpiar datos locales
    localStorage.removeItem('mysteryHunterUserId');
    localStorage.removeItem('mysteryHunterPlayerName');
    
    // Resetear el estado de la aplicación
    this.userId = '';
    this.playerName.set('');
    this.totalPoints.set(0);
    this.userProgress = { puntos: 0, unlockedMysteries: [] };
    this.showRanking.set(false);
    
    // Resetear los marcadores del mapa
    this.markers.forEach((marker) => {
      if (this.L) {
        const lockedIcon = this.L.icon({
          iconUrl: 'assets/locked.png',
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        });
        marker.setIcon(lockedIcon);
        marker.bindPopup(`
          <div style="text-align: center; padding: 10px;">
            <b>🔒 Bloqueado</b><br>
            <span style="font-size: 12px;">Acércate para desbloquear</span>
          </div>`);
      }
    });
    
    // Actualizar los misterios a bloqueados
    this.misteriosList.forEach((m) => {
      m.desbloqueado = false;
    });
    
    // Mostrar pantalla de bienvenida
    this.showWelcome.set(true);
    
    console.log('👋 Sesión cerrada');
  }
}



  // ✅ Procesar login o registro
  async handleAuth(playerName: string, password: string) {
    // Limpiar errores
    this.nameError.set('');
    this.passwordError.set('');

    // Validaciones
    if (!playerName || !playerName.trim()) {
      this.nameError.set('Por favor, escribe tu nombre');
      return;
    }

    if (!password || password.length < 4) {
      this.passwordError.set('La contraseña debe tener al menos 4 caracteres');
      return;
    }

    const trimmedName = playerName.trim();

    if (this.isLoginMode()) {
      // ✅ MODO LOGIN
      const result = await this.mysteryService.loginPlayer(trimmedName, password);

      if (result.success && result.userId) {
        // Login exitoso
        this.userId = result.userId;
        this.playerName.set(trimmedName);
        localStorage.setItem('mysteryHunterUserId', result.userId);
        localStorage.setItem('mysteryHunterPlayerName', trimmedName);

        // Cargar progreso
        this.userProgress = await this.mysteryService.getUserProgress(result.userId);
        this.totalPoints.set(this.userProgress.puntos);

        console.log('✅ Login exitoso:', trimmedName);
        this.showWelcome.set(false);
        
        // Recargar misterios con el progreso del usuario
        if (this.L) {
          this.loadMysteries(this.L);
        }
      } else {
        // Login fallido
        if (result.error === 'Usuario no encontrado') {
          this.nameError.set('❌ Usuario no encontrado');
        } else if (result.error === 'Contraseña incorrecta') {
          this.passwordError.set('❌ Contraseña incorrecta');
        } else {
          this.nameError.set('❌ Error al iniciar sesión');
        }
      }
    } else {
      // ✅ MODO REGISTRO
      const result = await this.mysteryService.registerPlayer(trimmedName, password);

      if (result.success && result.userId) {
        // Registro exitoso
        this.userId = result.userId;
        this.playerName.set(trimmedName);
        localStorage.setItem('mysteryHunterUserId', result.userId);
        localStorage.setItem('mysteryHunterPlayerName', trimmedName);

        this.userProgress = { puntos: 0, unlockedMysteries: [] };
        this.totalPoints.set(0);

        console.log('✅ Registro exitoso:', trimmedName);
        this.showWelcome.set(false);
      } else {
        // Registro fallido
        if (result.error === 'El nombre ya está en uso') {
          this.nameError.set('⚠️ Este nombre ya está en uso');
        } else {
          this.nameError.set('❌ Error al registrarse');
        }
      }
    }
  }

  toggleRanking() {
    this.showRanking.update((v) => !v);
    if (this.showRanking()) {
      this.showAllPlayers.set(false);
      this.loadRanking();
      this.showUserMenu.set(false); // Cerrar menú de usuario al abrir ranking
    }
  }

  toggleShowAllPlayers() {
    this.showAllPlayers.update((v) => !v);
  }

  getVisiblePlayers(): any[] {
    const limit = this.showAllPlayers() ? 10 : 6;
    return this.topPlayers().slice(0, limit);
  }

  async loadRanking() {
    this.loadingRanking.set(true);
    try {
      const ranking = await this.mysteryService.getTopPlayers(10);
      this.topPlayers.set(ranking);

      const allPlayers = await this.mysteryService.getAllPlayers();
      const userIndex = allPlayers.findIndex((p) => p.id === this.userId);
      this.userRank.set(userIndex >= 0 ? userIndex + 1 : null);

      console.log('🏆 Ranking cargado:', ranking);
    } catch (error) {
      console.error('❌ Error al cargar ranking:', error);
    } finally {
      this.loadingRanking.set(false);
    }
  }

  validarDesdePopup(titulo: string, respuestaUser: string) {
    const misterio = this.misteriosList.find((m) => m.titulo === titulo);

    if (!misterio) {
      alert('Error: Misterio no encontrado');
      return;
    }

    console.log('🔍 Validando:');
    console.log('   Usuario escribió:', respuestaUser.toLowerCase());
    console.log('   Respuesta correcta:', misterio.respuesta.toLowerCase());

    if (respuestaUser.toLowerCase() === misterio.respuesta.toLowerCase()) {
      console.log('✅ ¡Respuesta correcta!');

      this.map.closePopup();
      misterio.desbloqueado = true;

      this.ngZone.run(() => {
        this.solvedMysteryTitle.set(misterio.titulo);
        this.earnedPoints.set(50);
        this.showSuccessModal.set(true);

        console.log('🎉 Modal activado:', {
          show: this.showSuccessModal(),
          title: this.solvedMysteryTitle(),
          points: this.earnedPoints(),
        });

        this.totalPoints.update((p) => p + 50);
        this.cdr.detectChanges();
      });

      const marker = this.markers.get(misterio.id);
      if (marker && this.L) {
        const unlockedIcon = this.L.icon({
          iconUrl: 'assets/unlocked.png',
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        });

        marker.setIcon(unlockedIcon);

        const popupContent = `
          <div class="popup-info" style="width: 220px; padding: 10px;">
            <img src="${misterio.imagen}" style="width: 100%; border-radius: 8px; margin-bottom: 8px;">
            <h3 style="margin: 0 0 8px 0; color: #d4af37;">${misterio.titulo}</h3>
            <p style="font-size: 13px; line-height: 1.4; margin: 0;">${misterio.descripcion}</p>
          </div>`;
        marker.bindPopup(popupContent);
      }

      Promise.all([
        this.mysteryService.unlockMystery(this.userId, misterio.id),
        this.mysteryService.addPoints(this.userId, 50),
      ])
        .then(() => {
          console.log('✅ Progreso guardado en Firebase');
          this.loadRanking();
        })
        .catch((err) => {
          console.error('❌ Error al guardar:', err);
        });
    } else {
      console.log('❌ Respuesta incorrecta');
      alert('Respuesta incorrecta. ¡Sigue intentándolo!');
      const inputElement = document.getElementById(`ans-${titulo}`) as HTMLInputElement;
      if (inputElement) {
        inputElement.value = '';
        inputElement.focus();
      }
    }
  }

  closeSuccessModal() {
    this.showSuccessModal.set(false);

    const misterioResuelto = this.misteriosList.find((m) => m.titulo === this.solvedMysteryTitle());

    if (misterioResuelto) {
      const marker = this.markers.get(misterioResuelto.id);

      if (marker) {
        setTimeout(() => {
          this.map.setView(marker.getLatLng(), 17, {
            animate: true,
            duration: 0.5,
          });

          marker.openPopup();
        }, 300);
      }
    }
  }

  async initMap(L: any): Promise<void> {
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            this.finishMapSetup(L, latitude, longitude);
            resolve();
          },
          () => {
            console.warn('Ubicación denegada.');
            this.finishMapSetup(L, 43.263, -2.935);
            resolve();
          },
          { enableHighAccuracy: true },
        );
      } else {
        this.finishMapSetup(L, 43.263, -2.935);
        resolve();
      }
    });
  }

  private finishMapSetup(L: any, lat: number, lng: number) {
    this.map = L.map('map', {
      center: [lat, lng],
      zoom: 14,
      zoomControl: false,
    });

    const iconDefault = L.icon({
      iconRetinaUrl: '/leaflet/marker-icon-2x.png',
      iconUrl: '/leaflet/marker-icon.png',
      shadowUrl: '/leaflet/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    L.Marker.prototype.options.icon = iconDefault;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap',
      className: 'map-lighter',
    }).addTo(this.map);

    this.map.locate({
      setView: false,
      watch: true,
      enableHighAccuracy: true,
    });

    this.map.on('locationfound', (e: any) => {
      if (!this.playerMarker) {
        this.playerMarker = L.circleMarker(e.latlng, {
          radius: 8,
          color: '#007bff',
          fillColor: '#007bff',
          fillOpacity: 0.8,
        }).addTo(this.map);
      } else {
        this.playerMarker.setLatLng(e.latlng);
      }
      this.updateMysteriesDistance(e.latlng);
    });
  }

  updateMysteriesDistance(userLocation: any) {
    if (!this.L || this.misteriosList.length === 0) return;

    const lockedIcon = this.L.icon({
      iconUrl: 'assets/locked.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    this.misteriosList.forEach((m) => {
      if (m.desbloqueado) {
        return;
      }

      const marker = this.markers.get(m.id);
      if (!marker) return;

      const mysteryPos = this.L.latLng(m.latitud, m.longitud);
      const distance = userLocation.distanceTo(mysteryPos);
      const unlockRadius = m.radioDesbloqueo || 50;

      console.log(`📍 ${m.titulo}: ${Math.round(distance)}m - Resuelto: ${m.desbloqueado}`);

      marker.setIcon(lockedIcon);

      if (distance < unlockRadius) {
        const popupContent = `
          <div class="popup-mystery" style="padding: 12px; text-align: center; min-width: 200px;">
            <h3 style="color: #d4af37; margin: 0 0 10px 0; font-size: 16px;">🔍 ${m.titulo}</h3>
            <p style="font-style: italic; margin: 10px 0; font-size: 14px; line-height: 1.4;">"${m.acertijo}"</p>
            <p style="font-size: 11px; color: #4ade80; margin: 5px 0; font-weight: bold;">✓ Estás en el lugar correcto</p>
            <input type="text" id="ans-${m.titulo}" placeholder="Respuesta..." 
                   style="width: calc(100% - 16px); padding: 8px; margin: 10px 0; border: 2px solid #d4af37; border-radius: 6px;">
            <button onclick="window.checkAnswerPopup('${m.titulo}')" 
                    style="padding: 10px 20px; background: #d4af37; color: #1a1a1a; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%;">
              Resolver
            </button>
          </div>`;
        marker.bindPopup(popupContent);
      } else {
        marker.bindPopup(`
          <div style="text-align: center; padding: 10px;">
            <b>🔒 Bloqueado</b><br>
            <span style="font-size: 12px;">Estás a ${Math.round(distance)}m</span>
          </div>`);

        const proximityRadius = unlockRadius * 3;
        if (distance < proximityRadius && navigator.vibrate) {
          navigator.vibrate(100);
        }
      }
    });
  }

  checkAnswer(inputValue: string) {
    const misterioActual = this.selectedMystery();
    if (misterioActual) {
      this.validarDesdePopup(misterioActual.titulo, inputValue);
    }
  }

  loadMysteries(L: any) {
    if (!this.map) {
      console.error('❌ El mapa no está inicializado');
      return;
    }

    const lockedIcon = L.icon({
      iconUrl: 'assets/locked.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    const unlockedIcon = L.icon({
      iconUrl: 'assets/unlocked.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    this.mysteryService.getMysteries().subscribe((misterios) => {
      console.log('📦 Misterios cargados:', misterios);

      this.misteriosList = misterios.map((m) => ({
        ...m,
        desbloqueado: this.userProgress.unlockedMysteries.includes(m.id),
      }));

      this.misteriosList.forEach((m) => {
        console.log(`${m.titulo} - Desbloqueado: ${m.desbloqueado} - Radio: ${m.radioDesbloqueo}m`);

        const mysteryPos = L.latLng(m.latitud, m.longitud);
        const initialIcon = m.desbloqueado ? unlockedIcon : lockedIcon;
        const marker = L.marker(mysteryPos, { icon: initialIcon }).addTo(this.map);

        this.markers.set(m.id, marker);

        if (m.desbloqueado) {
          const popupContent = `
            <div class="popup-info" style="width: 220px; padding: 10px;">
              <img src="${m.imagen}" style="width: 100%; border-radius: 8px; margin-bottom: 8px;" alt="${m.titulo}">
              <h3 style="margin: 0 0 8px 0; color: #d4af37;">${m.titulo}</h3>
              <p style="font-size: 13px; line-height: 1.4; margin: 0;">${m.descripcion}</p>
            </div>`;
          marker.bindPopup(popupContent);
        } else {
          marker.bindPopup(`
            <div style="text-align: center; padding: 10px;">
              <b>🔒 Bloqueado</b><br>
              <span style="font-size: 12px;">Acércate a ${m.radioDesbloqueo || 50}m para desbloquear</span>
            </div>`);
        }
      });

      if (this.playerMarker) {
        const userLocation = this.playerMarker.getLatLng();
        this.updateMysteriesDistance(userLocation);
      }
    });
  }
}