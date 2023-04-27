import {StyleSheet} from 'react-native';

export const cardStyles = StyleSheet.create({
  container: {
    width: '45%',
    marginVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red',
  },
  image: {
    width: 96,
    height: 96,
    resizeMode: 'contain',
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'pink',
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
