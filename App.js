import { StatusBar } from 'expo-status-bar';
import { config } from "@gluestack-ui/config"
import { GluestackUIProvider, Text, Box } from "@gluestack-ui/themed"
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{
            headerShown: false,statusBarColor: '#2F80ED'
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

