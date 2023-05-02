import {cloneElement} from 'react';
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

export const filtersStyles = StyleSheet.create({
  filterContainer: {},
  modalContent: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    marginTop: 36,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomColor: COLORS.GRAY,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 24,
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
});
