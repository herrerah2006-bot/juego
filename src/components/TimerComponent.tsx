import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

interface TimerProps {
  initialTime: number;
  onTimeUp: () => void;
}

export default function TimerComponent({ initialTime, onTimeUp }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Text style={styles.timerText}>Tiempo: {timeLeft}s</Text>
  );
}

const styles = StyleSheet.create({
  timerText: { fontSize: 30, color: 'red', textAlign: 'center', marginTop: 30 }
});