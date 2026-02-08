import { Injectable } from '@angular/core';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore, collection, onSnapshot, doc, getDoc, setDoc, updateDoc, increment, arrayUnion } from 'firebase/firestore';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MysteryService {
  
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
          unlockedMysteries: [], // ✅ Array vacío inicialmente
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

      // Verificar si el usuario existe
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        // Crear usuario si no existe
        await setDoc(userRef, {
          puntos: 0,
          nombre: userId,
          fechaCreacion: new Date(),
          unlockedMysteries: [mysteryId], // ✅ Primer misterio desbloqueado
        });
        console.log(`✅ Usuario creado y misterio ${mysteryId} desbloqueado`);
      } else {
        // Agregar misterio al array (arrayUnion evita duplicados)
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

      // Si no existe, retornar valores por defecto
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

          // Ordenar por puntos (descendente) - ✅ Con tipos explícitos
          players.sort((a: any, b: any) => (b.puntos || 0) - (a.puntos || 0));

          // Retornar solo el top
          resolve(players.slice(0, limit));
        },
        reject
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

          // Ordenar por puntos - ✅ Con tipos explícitos
          players.sort((a: any, b: any) => (b.puntos || 0) - (a.puntos || 0));
          resolve(players);
        },
        reject
      );
    });
  } catch (error) {
    console.error('❌ Error al obtener jugadores:', error);
    return [];
  }
}
}