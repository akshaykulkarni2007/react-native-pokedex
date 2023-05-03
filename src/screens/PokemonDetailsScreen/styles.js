import {StyleSheet} from 'react-native';

import {COLORS} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BODY_BG,
  },
  details: {
    maxWidth: '90%',
    marginLeft: '5%',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  title: {
    color: COLORS.DARK,
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginVertical: 16,
  },
  description: {
    color: COLORS.DARK,
    fontSize: 20,
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
  },
});
