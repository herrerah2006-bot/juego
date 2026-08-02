import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { guardarPuntaje } from '../services/gameService';

const { width, height } = Dimensions.get('window');

export default function GameScreen() {
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [pos, setPos] = useState({ top: 150, left: 150 });

  const route = useRoute<any>();
  const { nombre = 'Jugador', correo = '', image = null } = route.params || {};

  
  const scoreRef = useRef(0);
  scoreRef.current = score;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finalizarJuego();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const finalizarJuego = async () => {
    const puntajeFinal = scoreRef.current;
    try {
      await AsyncStorage.setItem('maxScore', puntajeFinal.toString());
      await guardarPuntaje(nombre, puntajeFinal, correo, image);
    } catch (e) {
      console.error(e);
    }
    Alert.alert("¡Tiempo Agotado!", `Puntuación obtenida: ${puntajeFinal}`);
  };

  const tocarInsecto = () => {
    setScore((prev) => prev + 1);
    
    
    const nextTop = Math.floor(Math.random() * (height - 300)) + 50;
    const nextLeft = Math.floor(Math.random() * (width - 100)) + 20;
    setPos({ top: nextTop, left: nextLeft });
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.timerText}>Tiempo: {timeLeft}s</Text>
        <Text style={styles.scoreText}>Insectos cazados: {score}</Text>
      </View>

      
      <TouchableWithoutFeedback onPress={tocarInsecto}>
        <View style={[styles.insectContainer, { top: pos.top, left: pos.left }]}>
          <Text style={styles.insectEmoji}>🪲</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#e0f7fa',
    position: 'relative'
  },
  header: {
    marginTop: 40,
    alignItems: 'center',
    zIndex: 1
  },
  timerText: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#d32f2f' 
  },
  scoreText: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#333',
    marginTop: 5 
  },
  insectContainer: { 
    position: 'absolute', 
    width: 80, 
    height: 80, 
    justifyContent: 'center', 
    alignItems: 'center',
    zIndex: 999, 
    elevation: 5 
  },
  insectEmoji: { 
    fontSize: 50 
  }
});