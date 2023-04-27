import {StyleSheet} from 'react-native';

export const cardStyles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '45%',

    marginVertical: 10,
    // backgroundColor: '#ddd',
    height: 130,
    borderWidth: 1,
    borderColor: 'pink',
  },
  image: {
    width: '100%',
    height: 300,
    // resizeMode: 'contain',
  },
  content: {},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    color: '#666',
  },
});
