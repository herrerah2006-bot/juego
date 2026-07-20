import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

interface Props {
  navigation: any;
}

export default function LoginScreen({ navigation }: Props) {
  const [nombre, setNombre] = useState<string>('');
  const [correo, setCorreo] = useState<string>('');

  const handleRegister = () => {
    if (nombre === '' || correo === '') {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return;
    }
    
    
    console.log("Datos del usuario:", { nombre, correo });
    
    
    navigation.navigate('MainTabs');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro de Usuario</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Nombre" 
        value={nombre} 
        onChangeText={setNombre} 
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="Correo electrónico" 
        value={correo} 
        onChangeText={setCorreo} 
        keyboardType="email-address"
      />
      
      <Button title="Registrarse y Jugar" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { 
    height: 50, 
    borderColor: '#ccc', 
    borderWidth: 1, 
    borderRadius: 8, 
    marginBottom: 15, 
    paddingHorizontal: 10 
  }
});