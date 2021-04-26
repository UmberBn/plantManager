import React from 'react';
import { StyleSheet, View, Platform, Text, Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import colors from '../styles/colors';
import eu from '../images/eu.jpeg';
import fonts from '../styles/fonts';

export function Header() {
  return (
    <View style={ styles.container }>
      <View>
        <Text style={ styles.greeting }>
          Olá,
        </Text>
        <Text style={ styles.userName }>
          Humberto
        </Text>
      </View>
      <Image style={ styles.image } source={ eu }/>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: Platform.OS === 'ios' ? getStatusBarHeight() : 25,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 40,
  },
  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  userName: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40, 
  }
})