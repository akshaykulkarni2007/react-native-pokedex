import {StyleSheet} from 'react-native';

import {COLORS} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    maxWidth: '90%',
    marginLeft: '5%',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  label: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  value: {
    fontWeight: 'normal',
  },
  detailsRow: {
    marginVertical: 5,
  },
  description: {},
  sectionTitle: {
    marginVertical: 16,
    fontWeight: 'bold',
    fontSize: 20,
  },
  actionBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginVertical: 24,
  },
  button: {
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: COLORS.DARK,
  },
  buttonLabel: {
    textAlign: 'center',
    color: COLORS.WHITE,
  },
  prevButton: {
    // left: 0,
  },
});
