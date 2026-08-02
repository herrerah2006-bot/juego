import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import GameScreen from './src/screens/GameScreen';
import LoginScreen from './src/screens/LoginScreen';
import ScoreScreen from './src/screens/ScoreScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs({ route }) {
  
  const userData = route.params || {};

  return (
    <Tab.Navigator>
     
      <Tab.Screen 
        name="Juego" 
        component={GameScreen} 
        initialParams={userData} 
      />
      <Tab.Screen 
        name="Puntuaciones" 
        component={ScoreScreen} 
        initialParams={userData} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}