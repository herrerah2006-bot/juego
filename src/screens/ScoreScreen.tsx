import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ScoreScreen() {
  const [maxScore, setMaxScore] = useState<string | null>('0');

  useEffect(() => {
    const obtenerPuntaje = async (): Promise<void> => {
      const valor = await AsyncStorage.getItem('maxScore');
      setMaxScore(valor);
    };
    obtenerPuntaje();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mejor Puntuación</Text>
      <Text style={styles.score}>{maxScore || '0'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22 },
  score: { fontSize: 40, fontWeight: 'bold', color: 'green' }
});