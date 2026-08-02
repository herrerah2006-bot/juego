import { addDoc, collection } from 'firebase/firestore';
import { db } from '../screens/firebaseConfig';

export const guardarPuntaje = async (
  nombre: string, 
  puntuacion: number, 
  correo: string, 
  fotoPerfil: string | null
) => {
  try {
    const docRef = await addDoc(collection(db, "puntajes"), {
      nombre: nombre,
      puntuacion: puntuacion,
      correo: correo,
      fotoPerfil: fotoPerfil,
      fecha: new Date().toISOString()
    });
    console.log("Documento escrito con ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error al agregar el documento: ", e);
    throw e;
  }
};