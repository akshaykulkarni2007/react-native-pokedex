import {View, Text, FlatList} from 'react-native';

import {Spinner, Card} from '../../components';

import {useAxios} from '../../hooks';

import styles from './styles';

export const PokemonListingScreen = () => {
  const {data, loading, error} = useAxios('pokemon?limit=50');

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <Text>Error</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokedex</Text>
      <Text style={styles.subtitle}>
        Search for any pokemon that exists on the planet
      </Text>

      <FlatList
        data={data?.results}
        keyExtractor={(item, index) => `pokemon-${index}`}
        renderItem={({item, index}) => (
          <Card
            title={item.name}
            image={''}
            description={`${index + 1}`.padStart(3, '0')}
            // bgcolor={'red'}
          />
        )}
        numColumns={2}
        columnWrapperStyle={styles.cardColumnWrapperStyle}
      />
    </View>
  );
};
