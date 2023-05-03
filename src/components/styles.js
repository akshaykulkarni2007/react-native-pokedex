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
