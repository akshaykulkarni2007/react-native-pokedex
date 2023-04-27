import {StyleSheet} from 'react-native';

export const cardStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
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
    textAlign: 'center',
    fontWeight: 'bold',
  },
  description: {
    color: '#666',
    textAlign: 'center',
  },
});
