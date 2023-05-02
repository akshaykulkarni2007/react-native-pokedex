import {StyleSheet} from 'react-native';

import {COLORS} from '../constants';

export const cardStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 8,
  },
  image: {
    width: 96,
    height: 96,
    resizeMode: 'contain',
    marginTop: 10,
  },
  content: {
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    color: COLORS.DARK,
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  description: {
    color: COLORS.DARK,
    textAlign: 'center',
  },
});
