import {SafeAreaView, Text, StyleSheet} from 'react-native';

import {Navigation} from './routes';

const App = () => {
  return (
    <SafeAreaView style={styles.appContainer}>
      <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

export default App;
