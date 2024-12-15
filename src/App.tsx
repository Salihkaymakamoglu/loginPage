import  Navigation  from './navigation';
import * as React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet } from 'react-native';

SplashScreen.preventAutoHideAsync();

export function App() {
  return (
    <Navigation />
  );

}
