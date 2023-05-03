import {StyleSheet} from 'react-native';

import {COLORS, POKEMON_COLORS} from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    backgroundColor: COLORS.BODY_BG,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 8,
  },
  searchInput: {
    flexGrow: 1,
    backgroundColor: COLORS.GRAY,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  filterButton: {
    backgroundColor: COLORS.DARK,
    padding: 16,
    borderRadius: 16,
  },
  filterIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
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
    borderColor: COLORS.DARK,
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: 'dashed',
  },
});
