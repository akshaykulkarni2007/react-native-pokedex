import {Platform, StyleSheet} from 'react-native';

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

export const filtersStyles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: COLORS.WHITE,
    marginTop: 36,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomColor: COLORS.GRAY,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 24,
    color: COLORS.DARK,
    fontWeight: 'bold',
  },
  closeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: 35,
    height: 35,
    borderRadius: 35,
  },
  closeButtonText: {
    fontSize: 24,
  },
  modalBody: {
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  filterTitle: {
    color: COLORS.DARK,
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  typesList: {
    maxHeight: 300,
    padding: 10,
  },
  genderList: {
    padding: 10,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: COLORS.WHITE,
    borderTopWidth: 1,
    borderTopColor: COLORS.GRAY,

    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -5,
          width: 0,
        },
      },
      android: {
        // elevation:   4,
        // backgroundColor: 'rgba(0, 0, 0, 0.3)',
      },
    }),
  },
  actionButton: {
    flexGrow: 1,
  },
});

export const pokemonListHeaderStyles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    gap: 16,
    marginVertical: 8,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  searchInput: {
    flexGrow: 1,
    backgroundColor: COLORS.GRAY,
    paddingHorizontal: 8,
    paddingVertical: 20,
    borderRadius: 16,
  },
  searchButton: {
    position: 'absolute',
    right: 8,
    zIndex: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  filterButton: {
    backgroundColor: COLORS.DARK,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  filterIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
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
});

export const pokemonEmptyListStyles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: 600,
  },
});
