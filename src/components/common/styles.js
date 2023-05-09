import {StyleSheet} from 'react-native';

import {COLORS} from '../../constants';

export const buttonStyles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
    borderRadius: 10,
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

export const checkboxStyles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
    flexGrow: 1,
  },
});

export const spinnerStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const errorStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  message: {
    fontSize: 20,
    color: COLORS.DARK,
    marginBottom: 20,
  },
});
