import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProps} from 'react-native-gesture-handler';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnviromentBUttonProps extends RectButtonProps {
  title: string;
  active?: boolean;
}

const EnviromentButton: React.FC<EnviromentBUttonProps> = ({
  title, active = false, ...rest
}) => {
  return (
    <RectButton
      style={[
        styles.container,
        active && styles.containerActive
      ]}
      {...rest}
    >
      <Text style={[
        styles.text,
        active && styles.textActive
      ]}
      >
        {title}
      </Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.shape,
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 12,
    height: 40,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  containerActive: {
    backgroundColor: colors.green_light
  },
  text: {
    color: colors.heading,
    fontFamily: fonts.text,
  },
  textActive: {
    fontFamily: fonts.heading,
    color: colors.green_dark,

  }
})

export default EnviromentButton;
