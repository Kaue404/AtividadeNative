import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/login';
import Register from './pages/Register';
import Cards from './pages/Cards';
import CardDetails from './pages/CardDetails';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "LOGIN", headerTitleAlign: 'center', headerStyle: {
            backgroundColor: "#1a1a1a", 
          },
          headerTintColor: "#fff", 
        }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: 'CADASTRAR USUÁRIO', headerTitleAlign: 'center', headerStyle: {
            backgroundColor: "#1a1a1a", 
          },
          headerTintColor: "#fff",  }}
        />
        <Stack.Screen
          name="Cards"
          component={Cards}
          options={{ title: 'CARDS', headerTitleAlign: 'center', headerStyle: {
            backgroundColor: "#1a1a1a", 
          },
          headerTintColor: "#fff", }}
        />
        <Stack.Screen
          name="CardDetails"
          component={CardDetails}
          options={{ title: 'DETALHES DO CARD', headerTitleAlign: 'center',  headerStyle: {
            backgroundColor: "#1a1a1a", 
          },
          headerTintColor: "#fff", }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
