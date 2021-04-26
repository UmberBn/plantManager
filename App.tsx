import React from 'react';
import {
  Jost_400Regular,
  Jost_600SemiBold,
} from '@expo-google-fonts/jost';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import Routes from './src/routes';

export default function app(){
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  if(!fontsLoaded) return <AppLoading />
  return(
    <Routes />
  )
}
