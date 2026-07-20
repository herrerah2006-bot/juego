import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

// Definimos la interfaz para la posición del insecto
interface Position {
  top: number;
  left: number;
}

export default function GameScreen() {
  // Agregamos los tipos <number> y <Position>
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [insectPosition, setInsectPosition] = useState<Position>({ top: 100, left: 100 });

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      guardarPuntuacion(score);
      Alert.alert("¡Tiempo terminado!", `Tu puntuación final fue: ${score}`);
      setScore(0);
      setTimeLeft(30);
    }
  }, [timeLeft]);

  const guardarPuntuacion = async (finalScore: number): Promise<void> => {
    try {
      const existingScore = await AsyncStorage.getItem('maxScore');
      if (finalScore > parseInt(existingScore || '0')) {
        await AsyncStorage.setItem('maxScore', finalScore.toString());
      }
    } catch (e) {
      console.error("Error guardando el puntaje", e);
    }
  };

  const moveInsect = (): void => {
    const newTop = Math.floor(Math.random() * (height - 200));
    const newLeft = Math.floor(Math.random() * (width - 100));
    setInsectPosition({ top: newTop, left: newLeft });
  };

  const catchInsect = (): void => {
    setScore(score + 1);
    moveInsect();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>Tiempo: {timeLeft}s</Text>
      <Text style={styles.scoreText}>Insectos cazados: {score}</Text>
      
      <TouchableOpacity 
        style={[styles.insect, { top: insectPosition.top, left: insectPosition.left }]} 
        onPress={catchInsect}
      >
        <Text style={styles.insectText}>🪲</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e0f7fa' },
  timerText: { fontSize: 30, color: 'red', textAlign: 'center', marginTop: 30 },
  scoreText: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  insect: { position: 'absolute', width: 60, height: 60, justifyContent: 'center', alignItems: 'center' },
  insectText: { fontSize: 40 }
});