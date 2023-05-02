import {StyleSheet} from 'react-native';

import {COLORS, POKEMON_COLORS} from '../../constants';

export default StyleSheet.create({
  container: {
    marginBottom: 20,
    backgroundColor: POKEMON_COLORS.WATER,
  },
  listContainer: {
    width: '90%',
    marginLeft: '5%',
  },
  title: {
    color: COLORS.DARK,
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginTop: 16,
    paddingBottom: 8,
    borderBottomColor: COLORS.DARK,
    borderBottomWidth: 1,
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 8,
  },
  cardColumnWrapperStyle: {
    justifyContent: 'space-between',
  },
  navButton: {
    width: '45%',
    marginVertical: 10,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: 'dashed',
  },
});
