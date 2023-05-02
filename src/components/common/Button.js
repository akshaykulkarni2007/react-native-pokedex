import {Pressable, Text, StyleSheet} from 'react-native';

import {COLORS} from '../../constants';

export const Button = props => {
  const {type = primary, children, handlePress, style} = props;

  return (
    <Pressable
      style={[styles.button, styles[type], style]}
      onPress={handlePress}>
      <Text style={[styles.label, styles[`${type}Label`]]}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 16,
    borderRadius: 16,
  },
  primary: {
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.DARK,
  },
  dark: {
    backgroundColor: COLORS.DARK,
  },
  label: {
    fontSize: 20,
  },
  primaryLabel: {
    color: COLORS.DARK,
  },
  darkLabel: {
    color: COLORS.WHITE,
  },
});
