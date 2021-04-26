import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  View
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import wateringImage from '../assets/watering.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/core';

export function Welcome() {
  const navigation = useNavigation();
  function handleToStart(){
    navigation.navigate('UserIdentification');
  }
  return (
    <SafeAreaView style={ styles.container }>
      <View style={ styles.wrapper }>
        <Text style={ styles.title }>
          Gerencie {"\n"}
          suas plantas de{"\n"}
          forma fácil
        </Text>
        <Image
          source={ wateringImage }
          style={ styles.image }
          resizeMode="contain"
        />
        <Text style={ styles.subtitle }>
          Não esqueça mais de regar suas plantas.
          Nós cuidamos de lembrar você sempre que precisar.
        </Text>
        <TouchableOpacity
          style={ styles.button }
          activeOpacity={ 0.7 }
          onPress={ handleToStart }
        >
          <Entypo
            name="chevron-right"
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  title: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 28,
    textAlign: 'center',
    marginTop: 38,
    lineHeight: 34, 
  },
  image: {
    height: Dimensions.get('window').width * 0.7,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56,
  },
  buttonIcon: {
    color: colors.white,
    fontSize: 24,
  }
})