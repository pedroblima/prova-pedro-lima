import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Restaurantes from '../screens/restaurantes/Restaurantes';
import Restaurante from '../screens/restaurante/Restaurante';




const Stack = createStackNavigator();

export default function Router() {



  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Restaurantes">
        <Stack.Screen name='Restaurantes' component={Restaurantes} />
        <Stack.Screen name='Restaurante' component={Restaurante} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})