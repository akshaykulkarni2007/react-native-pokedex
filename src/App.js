import {SafeAreaView, Text, StyleSheet} from 'react-native';

import {PokemonProvider} from './context/pokemonContext';

import {Navigation} from './routes';

const App = () => {
  return (
    <SafeAreaView style={styles.appContainer}>
      <PokemonProvider>
        <Navigation />
      </PokemonProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

export default App;
