import { Injectable } from '@angular/core';
import { initializeApp, getApp, getApps } from 'firebase/app';
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  arrayUnion,
  getDocs,
} from 'firebase/firestore';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MysteryService {
  // ✅ NUEVO: Hashear contraseña de forma simple pero efectiva
  private async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  // ✅ CORREGIDO: Registrar usuario con contraseña (usando getDocs en lugar de onSnapshot)
  async registerPlayer(playerName: string, password: string): Promise<{ success: boolean; error?: string; userId?: string }> {
    try {
      const app = getApps().length === 0 ? initializeApp(environment.firebase) : getApp();
      const db = getFirestore(app);
      const usersRef = collection(db, 'usuarios');
      
      // Verificar si el nombre ya existe (usando getDocs en lugar de onSnapshot)
      const snapshot = await getDocs(usersRef);
      
      const existingUser = snapshot.docs.find((doc) => {
        const data = doc.data();
        return data['nombre']?.toLowerCase() === playerName.toLowerCase();
      });

      if (existingUser) {
        return { success: false, error: 'El nombre ya está en uso' };
      }

      // Crear nuevo usuario
      const userId = 'player_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
      const hashedPassword = await this.hashPassword(password);

      const userRef = doc(db, 'usuarios', userId);
      await setDoc(userRef, {
        nombre: playerName,
        password: hashedPassword,
        puntos: 0,
        unlockedMysteries: [],
        fechaCreacion: new Date(),
      });

      console.log('✅ Jugador registrado:', playerName);
      return { success: true, userId };
    } catch (error) {
      console.error('❌ Error al registrar jugador:', error);
      return { success: false, error: 'Error al registrar' };
    }
  }

  // ✅ CORREGIDO: Login de usuario con contraseña (usando getDocs en lugar de onSnapshot)
  async loginPlayer(playerName: string, password: string): Promise<{ success: boolean; error?: string; userId?: string; userData?: any }> {
    try {
      const app = getApps().length === 0 ? initializeApp(environment.firebase) : getApp();
      const db = getFirestore(app);
      const usersRef = collection(db, 'usuarios');

      const hashedPassword = await this.hashPassword(password);
      
      // Obtener snapshot una sola vez
      const snapshot = await getDocs(usersRef);
      
      const userDoc = snapshot.docs.find((doc) => {
        const data = doc.data();
        return data['nombre']?.toLowerCase() === playerName.toLowerCase();
      });

      if (!userDoc) {
        return { success: false, error: 'Usuario no encontrado' };
      }

      const userData = userDoc.data();

      // Verificar contraseña
      if (userData['password'] !== hashedPassword) {
        return { success: false, error: 'Contraseña incorrecta' };
      }

      // Login exitoso
      return {
        success: true,
        userId: userDoc.id,
        userData: {
          nombre: userData['nombre'],
          puntos: userData['puntos'] || 0,
          unlockedMysteries: userData['unlockedMysteries'] || [],
        },
      };
    } catch (error) {
      console.error('❌ Error en login:', error);
      return { success: false, error: 'Error al iniciar sesión' };
    }
  }

  // ✅ Añadir puntos al usuario
  async addPoints(userId: string, amount: number) {
    try {
      const app = getApps().length === 0 ? initializeApp(environment.firebase) : getApp();
      const db = getFirestore(app);
      const userRef = doc(db, 'usuarios', userId);

      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        await setDoc(userRef, {
          puntos: amount,
          nombre: userId,
          fechaCreacion: new Date(),
          unlockedMysteries: [],
        });
        console.log(`✅ Usuario ${userId} creado con ${amount} puntos`);
      } else {
        await updateDoc(userRef, {
          puntos: increment(amount),
        });
        console.log(`✅ +${amount} puntos para ${userId}`);
      }
    } catch (error) {
      console.error('❌ Error al añadir puntos:', error);
    }
  }

  // ✅ Desbloquear misterio para un usuario específico
  async unlockMystery(userId: string, mysteryId: string) {
    try {
      const app = getApps().length === 0 ? initializeApp(environment.firebase) : getApp();
      const db = getFirestore(app);
      const userRef = doc(db, 'usuarios', userId);

      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        await setDoc(userRef, {
          puntos: 0,
          nombre: userId,
          fechaCreacion: new Date(),
          unlockedMysteries: [mysteryId],
        });
        console.log(`✅ Usuario creado y misterio ${mysteryId} desbloqueado`);
      } else {
        await updateDoc(userRef, {
          unlockedMysteries: arrayUnion(mysteryId),
        });
        console.log(`✅ Misterio ${mysteryId} añadido a ${userId}`);
      }

      return true;
    } catch (error) {
      console.error('❌ Error al desbloquear misterio:', error);
      throw error;
    }
  }

  // ✅ Obtener progreso del usuario
  async getUserProgress(userId: string): Promise<{
    puntos: number;
    unlockedMysteries: string[];
  }> {
    try {
      const app = getApps().length === 0 ? initializeApp(environment.firebase) : getApp();
      const db = getFirestore(app);
      const userRef = doc(db, 'usuarios', userId);

      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        return {
          puntos: data['puntos'] || 0,
          unlockedMysteries: data['unlockedMysteries'] || [],
        };
      }

      return {
        puntos: 0,
        unlockedMysteries: [],
      };
    } catch (error) {
      console.error('❌ Error al obtener progreso:', error);
      return {
        puntos: 0,
        unlockedMysteries: [],
      };
    }
  }

  // ✅ Obtener todos los misterios
  getMysteries(): Observable<any[]> {
    return new Observable((subscriber) => {
      const app = getApps().length === 0 ? initializeApp(environment.firebase) : getApp();
      const db = getFirestore(app);
      const colRef = collection(db, 'misterios');

      const unsubscribe = onSnapshot(
        colRef,
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          subscriber.next(data);
        },
        (error) => {
          subscriber.error(error);
        },
      );

      return () => unsubscribe();
    });
  }

  // ✅ Obtener top jugadores ordenados por puntos
  async getTopPlayers(limit: number = 10): Promise<any[]> {
    try {
      const app = getApps().length === 0 ? initializeApp(environment.firebase) : getApp();
      const db = getFirestore(app);
      const usersRef = collection(db, 'usuarios');

      return new Promise((resolve, reject) => {
        onSnapshot(
          usersRef,
          (snapshot) => {
            const players = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
              misteriosResueltos: (doc.data()['unlockedMysteries'] || []).length,
            }));

            players.sort((a: any, b: any) => (b.puntos || 0) - (a.puntos || 0));
            resolve(players.slice(0, limit));
          },
          reject,
        );
      });
    } catch (error) {
      console.error('❌ Error al obtener top jugadores:', error);
      return [];
    }
  }

  // ✅ Obtener todos los jugadores para calcular ranking
  async getAllPlayers(): Promise<any[]> {
    try {
      const app = getApps().length === 0 ? initializeApp(environment.firebase) : getApp();
      const db = getFirestore(app);
      const usersRef = collection(db, 'usuarios');

      return new Promise((resolve, reject) => {
        onSnapshot(
          usersRef,
          (snapshot) => {
            const players = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

            players.sort((a: any, b: any) => (b.puntos || 0) - (a.puntos || 0));
            resolve(players);
          },
          reject,
        );
      });
    } catch (error) {
      console.error('❌ Error al obtener jugadores:', error);
      return [];
    }
  }

  // ✅ DEPRECADO: Ya no se usa con el sistema de contraseñas
  async getPlayerByName(playerName: string): Promise<{ id: string; nombre: string } | null> {
    try {
      const app = getApps().length === 0 ? initializeApp(environment.firebase) : getApp();
      const db = getFirestore(app);
      const usersRef = collection(db, 'usuarios');

      return new Promise((resolve, reject) => {
        onSnapshot(
          usersRef,
          (snapshot) => {
            const player = snapshot.docs.find((doc) => {
              const data = doc.data();
              return data['nombre']?.toLowerCase() === playerName.toLowerCase();
            });

            if (player) {
              resolve({
                id: player.id,
                nombre: player.data()['nombre'],
              });
            } else {
              resolve(null);
            }
          },
          reject,
        );
      });
    } catch (error) {
      console.error('❌ Error al buscar jugador:', error);
      return null;
    }
  }

  async updatePlayerName(userId: string, playerName: string): Promise<void> {
    try {
      const app = getApps().length === 0 ? initializeApp(environment.firebase) : getApp();
      const db = getFirestore(app);
      const userRef = doc(db, 'usuarios', userId);

      await setDoc(
        userRef,
        {
          nombre: playerName,
          puntos: 0,
          unlockedMysteries: [],
          fechaCreacion: new Date(),
        },
        { merge: true },
      );

      console.log('✅ Jugador registrado:', playerName);
    } catch (error) {
      console.error('❌ Error al registrar jugador:', error);
    }
  }
}