import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TimerComponent from '../components/TimerComponent';
import { guardarPuntaje } from '../services/gameService';

const { width, height } = Dimensions.get('window');

interface Position {
  top: number;
  left: number;
}

export default function GameScreen() {
  const [score, setScore] = useState<number>(0);
  const [insectPosition, setInsectPosition] = useState<Position>({ top: 200, left: 150 });
  const [gameEnded, setGameEnded] = useState<boolean>(false); 

  const route = useRoute<any>();
  
  const { nombre = 'Jugador', correo = '', edad = '', image = null } = route.params || {};
const manejarFinDelJuego = async () => {
    if (gameEnded) return;
    
    
    const puntajeActual = score;
    setGameEnded(true);

    try {
      await AsyncStorage.setItem('maxScore', puntajeActual.toString());
      
      await guardarPuntaje(nombre, puntajeActual, correo, image);
    } catch (e) {
      console.error("Error al procesar el puntaje final", e);
    }

    Alert.alert("¡Tiempo terminado!", `Tu puntuación final fue: ${puntajeActual}`);
  };

  const moveInsect = (): void => {
    if (gameEnded) return; 
    const newTop = Math.floor(Math.random() * (height - 250)) + 100;
    const newLeft = Math.floor(Math.random() * (width - 100)) + 20;
    setInsectPosition({ top: newTop, left: newLeft });
  };

  const catchInsect = (): void => {
    
    if (gameEnded) return; 

    setScore((prevScore) => prevScore + 1);
    moveInsect();
  };

  return (
    <View style={styles.container}>
      
      {!gameEnded && <TimerComponent initialTime={30} onTimeUp={manejarFinDelJuego} />}

      
      {gameEnded && <Text style={styles.timerText}>Tiempo: 0s</Text>}

      <Text style={styles.scoreText}>Insectos cazados: {score}</Text>
      
      
      {!gameEnded && (
        <TouchableOpacity 
          style={[styles.insect, { top: insectPosition.top, left: insectPosition.left }]} 
          onPress={catchInsect}
          activeOpacity={0.7}
        >
          <Text style={styles.insectText}>🪲</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e0f7fa', position: 'relative' },
  timerText: { fontSize: 30, color: 'red', textAlign: 'center', marginTop: 30 },
  scoreText: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 10 },
  insect: { 
    position: 'absolute', 
    width: 70, 
    height: 70, 
    justifyContent: 'center', 
    alignItems: 'center',
    zIndex: 999 
  },
  insectText: { fontSize: 40 }
});