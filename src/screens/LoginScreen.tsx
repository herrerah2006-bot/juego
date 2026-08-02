import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Props {
  navigation: any;
}

export default function LoginScreen({ navigation }: Props) {
  const [nombre, setNombre] = useState<string>('');
  const [correo, setCorreo] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [edad, setEdad] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState<boolean>(true);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAuthAction = async () => {
    if (correo === '' || password === '' || (isRegistering && (nombre === '' || edad === ''))) {
      Alert.alert("Error", "Por favor, completa todos los campos requeridos");
      return;
    }

    try {
      if (isRegistering) {
        Alert.alert("Éxito", "Usuario registrado correctamente");
      } else {
        Alert.alert("Éxito", "Sesión iniciada correctamente");
      }

      console.log("Datos del usuario:", { nombre, correo, edad, image });
      
      
      navigation.navigate('MainTabs', { 
        nombre: nombre || 'Jugador', 
        correo: correo, 
        edad: edad, 
        image: image 
      });

    } catch (error: any) {
      Alert.alert("Error de autenticación", "Ocurrió un error inesperado. Verifica tus datos.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{isRegistering ? 'Registro de Usuario' : 'Iniciar Sesión'}</Text>
      
      {isRegistering && (
        <>
          <TextInput 
            style={styles.input} 
            placeholder="Nick / Nombre" 
            placeholderTextColor="#888"
            value={nombre} 
            onChangeText={setNombre} 
          />
          <TextInput 
            style={styles.input} 
            placeholder="Edad" 
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={edad} 
            onChangeText={setEdad} 
          />
          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Text style={styles.imageButtonText}>Subir imagen de perfil</Text>
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={styles.avatar} />}
        </>
      )}

      <TextInput 
        style={styles.input} 
        placeholder="Correo electrónico" 
        placeholderTextColor="#888"
        value={correo} 
        onChangeText={setCorreo} 
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput 
        style={styles.input} 
        placeholder="Contraseña" 
        placeholderTextColor="#888"
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry
      />
      
      <Button title={isRegistering ? "Registrarse y Jugar" : "Iniciar Sesión"} onPress={handleAuthAction} />

      <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
        <Text style={styles.switchText}>
          {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
        </Text>
      </TouchableOpacity>
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
  },
  imageButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  imageButtonText: {
    color: '#333',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignSelf: 'center',
    marginBottom: 15,
  },
  switchText: {
    color: '#007AFF',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '500',
  }
});