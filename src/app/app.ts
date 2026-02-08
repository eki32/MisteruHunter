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

  userId: string = '';
  playerName = signal('');

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

  isLoginMode = signal(true);
  nameError = signal('');
  passwordError = signal('');
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

  // ✅ NUEVO: Variables para controlar el rastreo de ubicación
  private watchId: number | null = null;
  private locationAttempts = 0;
  private maxLocationAttempts = 3;

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

      const savedUserId = localStorage.getItem('mysteryHunterUserId');
      const savedPlayerName = localStorage.getItem('mysteryHunterPlayerName');
      
      if (savedUserId && savedPlayerName) {
        this.userId = savedUserId;
        this.playerName.set(savedPlayerName);
        this.userProgress = await this.mysteryService.getUserProgress(this.userId);
        this.totalPoints.set(this.userProgress.puntos);
        this.showWelcome.set(false);
        console.log('👋 Sesión recuperada:', savedPlayerName);
      }

      await this.initMap(this.L);
      this.loadMysteries(this.L);
      this.loadRanking();
    });
  }

  toggleMode() {
    this.isLoginMode.update((v) => !v);
    this.nameError.set('');
    this.passwordError.set('');
  }

  toggleUserMenu() {
    this.showUserMenu.update((v) => !v);
  }

  logout() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      localStorage.removeItem('mysteryHunterUserId');
      localStorage.removeItem('mysteryHunterPlayerName');
      
      this.userId = '';
      this.playerName.set('');
      this.totalPoints.set(0);
      this.userProgress = { puntos: 0, unlockedMysteries: [] };
      this.showRanking.set(false);
      
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
      
      this.misteriosList.forEach((m) => {
        m.desbloqueado = false;
      });
      
      this.showWelcome.set(true);
      
      console.log('👋 Sesión cerrada');
    }
  }

  async handleAuth(playerName: string, password: string) {
    this.nameError.set('');
    this.passwordError.set('');

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
      const result = await this.mysteryService.loginPlayer(trimmedName, password);

      if (result.success && result.userId) {
        this.userId = result.userId;
        this.playerName.set(trimmedName);
        localStorage.setItem('mysteryHunterUserId', result.userId);
        localStorage.setItem('mysteryHunterPlayerName', trimmedName);

        this.userProgress = await this.mysteryService.getUserProgress(result.userId);
        this.totalPoints.set(this.userProgress.puntos);

        console.log('✅ Login exitoso:', trimmedName);
        this.showWelcome.set(false);
        
        if (this.L) {
          this.loadMysteries(this.L);
        }
      } else {
        if (result.error === 'Usuario no encontrado') {
          this.nameError.set('❌ Usuario no encontrado');
        } else if (result.error === 'Contraseña incorrecta') {
          this.passwordError.set('❌ Contraseña incorrecta');
        } else {
          this.nameError.set('❌ Error al iniciar sesión');
        }
      }
    } else {
      const result = await this.mysteryService.registerPlayer(trimmedName, password);

      if (result.success && result.userId) {
        this.userId = result.userId;
        this.playerName.set(trimmedName);
        localStorage.setItem('mysteryHunterUserId', result.userId);
        localStorage.setItem('mysteryHunterPlayerName', trimmedName);

        this.userProgress = { puntos: 0, unlockedMysteries: [] };
        this.totalPoints.set(0);

        console.log('✅ Registro exitoso:', trimmedName);
        this.showWelcome.set(false);
      } else {
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
      this.showUserMenu.set(false);
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

  // ✅ CORREGIDO: Mejor manejo de geolocalización con reintentos
async initMap(L: any): Promise<void> {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      console.log('🔍 Solicitando permisos de geolocalización...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('✅ Ubicación inicial obtenida:', latitude, longitude);
          this.finishMapSetup(L, latitude, longitude);
          resolve();
        },
        (error) => {
          console.error('❌ Error de geolocalización:', error.message, error.code);
          // Usar ubicación por defecto (Bilbao)
          this.finishMapSetup(L, 43.263, -2.935);
          resolve();
        },
        { 
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        },
      );
    } else {
      console.warn('⚠️ Geolocalización no disponible en este navegador');
      this.finishMapSetup(L, 43.263, -2.935);
      resolve();
    }
  });
}

private finishMapSetup(L: any, lat: number, lng: number) {
  console.log('🗺️ Configurando mapa en:', lat, lng);
  
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

  console.log('📍 Creando marcador de jugador en:', lat, lng);
  this.playerMarker = L.circleMarker([lat, lng], {
    radius: 10,
    color: '#ffffff',
    fillColor: '#007bff',
    fillOpacity: 1,
    weight: 3,
  }).addTo(this.map);

  // ✅ CORREGIDO: Watchear ubicación con configuración más tolerante
  this.map.locate({
    setView: false,
    watch: true,
    enableHighAccuracy: true,
    maximumAge: 30000, // ✅ Permitir ubicación de hasta 30 segundos
    timeout: 30000, // ✅ Aumentar timeout a 30 segundos
  });

  // ✅ Manejar actualizaciones de ubicación
  this.map.on('locationfound', (e: any) => {
    console.log('📍 Ubicación actualizada:', e.latlng.lat, e.latlng.lng, 'Precisión:', e.accuracy + 'm');
    
    if (this.playerMarker) {
      this.playerMarker.setLatLng(e.latlng);
    }
    
    this.updateMysteriesDistance(e.latlng);
  });

  // ✅ CORREGIDO: Manejar errores sin spam en consola
  this.map.on('locationerror', (e: any) => {
    // Solo mostrar warning, no error
    console.warn('⚠️ Timeout de ubicación (es normal, seguirá intentando):', e.message);
    // El mapa seguirá intentando obtener la ubicación automáticamente
  });
}

  // ✅ NUEVO: Función separada para rastrear ubicación con mejor manejo de errores
 private startLocationTracking() {
  if (!navigator.geolocation) {
    console.warn('⚠️ No se puede rastrear ubicación: geolocalización no disponible');
    return;
  }

  console.log('🎯 Iniciando rastreo continuo de ubicación...');

  this.watchId = navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      console.log('📍 Ubicación actualizada:', latitude, longitude, 'Precisión:', accuracy + 'm');
      
      this.locationAttempts = 0;
      
      if (this.playerMarker && this.L) {
        const newPos = this.L.latLng(latitude, longitude);
        this.playerMarker.setLatLng(newPos);
        this.updateMysteriesDistance(newPos);
      }
    },
    (error) => {
      this.locationAttempts++;
      console.error(`❌ Error al rastrear ubicación (intento ${this.locationAttempts}):`, error.message);
      
      // ✅ Solo reiniciar si hay muchos errores consecutivos
      if (this.locationAttempts >= this.maxLocationAttempts) {
        console.warn('⚠️ Reiniciando rastreo...');
        this.stopLocationTracking();
        
        setTimeout(() => {
          this.locationAttempts = 0;
          this.startLocationTracking();
        }, 5000);
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 15000, // ✅ 15 segundos
      maximumAge: 5000 // ✅ Permitir ubicación de hasta 5 segundos
    }
  );

  console.log('✅ Rastreo iniciado');
}

  // ✅ NUEVO: Detener rastreo de ubicación
private stopLocationTracking() {
  if (this.watchId !== null) {
    navigator.geolocation.clearWatch(this.watchId);
    console.log('🛑 Rastreo detenido');
    this.watchId = null;
  }
}
  updateMysteriesDistance(userLocation: any) {
    if (!this.L || this.misteriosList.length === 0) {
      console.log('⚠️ No se puede actualizar distancias: mapa o lista vacía');
      return;
    }

    const lockedIcon = this.L.icon({
      iconUrl: 'assets/locked.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    console.log('🔄 Actualizando distancias de', this.misteriosList.length, 'misterios...');

    this.misteriosList.forEach((m) => {
      if (m.desbloqueado) {
        return;
      }

      const marker = this.markers.get(m.id);
      if (!marker) {
        console.warn(`⚠️ No se encontró marcador para ${m.titulo}`);
        return;
      }

      const mysteryPos = this.L.latLng(m.latitud, m.longitud);
      const distance = userLocation.distanceTo(mysteryPos);
      const unlockRadius = m.radioDesbloqueo || 50;

      console.log(`📍 ${m.titulo}: ${Math.round(distance)}m de ${unlockRadius}m - Desbloqueado: ${m.desbloqueado}`);

      marker.setIcon(lockedIcon);

      if (distance < unlockRadius) {
        console.log(`🔓 ${m.titulo} está DESBLOQUEADO (${Math.round(distance)}m)`);
        
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
        console.log(`🔒 ${m.titulo} está BLOQUEADO (${Math.round(distance)}m)`);
        
        marker.bindPopup(`
          <div style="text-align: center; padding: 10px;">
            <b>🔒 Bloqueado</b><br>
            <span style="font-size: 12px;">Estás a ${Math.round(distance)}m</span><br>
            <span style="font-size: 11px; color: #666;">Acércate a ${unlockRadius}m</span>
          </div>`);
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

      this.markers.forEach((marker) => {
        this.map.removeLayer(marker);
      });
      this.markers.clear();

      this.misteriosList.forEach((m) => {
        console.log(`${m.titulo} - Desbloqueado: ${m.desbloqueado} - Radio: ${m.radioDesbloqueo}m - Pos: (${m.latitud}, ${m.longitud})`);

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
        console.log('🔄 Actualizando distancias iniciales desde:', userLocation);
        this.updateMysteriesDistance(userLocation);
      }
    });
  }
}