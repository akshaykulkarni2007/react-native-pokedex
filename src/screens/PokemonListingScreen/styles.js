import {StyleSheet} from 'react-native';

import {COLORS} from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    backgroundColor: COLORS.BODY_BG,
  },
  listContainer: {
    width: '90%',
    marginLeft: '5%',
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
