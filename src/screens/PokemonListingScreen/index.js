import {useState, useEffect, useContext} from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';

import {Card} from '../../components';

import {PokemonContext} from '../../context/pokemonContext';
import {API_BASE_URL, SCREEN_NAMES} from '../../constants';

import styles from './styles';

export const PokemonListingScreen = ({navigation}) => {
  const {pokemons, totalCount, fetchPokemons, nextURL, error} =
    useContext(PokemonContext);

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    fetchInitalData();
  }, []);

  const fetchInitalData = async () => {
    fetchPokemons(`${API_BASE_URL}pokemon?limit=12`);
  };

  const handleLoadMore = async () => {
    if (!hasScrolled) {
      return null;
    }

    if (nextURL) {
      fetchPokemons(nextURL);
    }
  };

  const ListHeader = () => (
    <>
      <Text style={styles.title}>Pokedex</Text>
      <Text style={styles.subtitle}>
        Search for any pokemon that exists on the planet
      </Text>
    </>
  );

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={pokemons}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <Pressable
              onPress={() =>
                navigation.navigate(SCREEN_NAMES.POKEMON_DETAILS, {
                  id: item.id,
                  name: item.name,
                  // totalCount,
                  // url: item.detailsURL,
                })
              }
              style={styles.navButton}>
              <Card
                title={item.name}
                image={item.imageUrl}
                description={`${item.id}`.padStart(3, '0')}
                // bgcolor={{backgroundColor: 'red'}}
              />
            </Pressable>
          )}
          ListHeaderComponent={ListHeader}
          numColumns={2}
          columnWrapperStyle={styles.cardColumnWrapperStyle}
          onEndReached={handleLoadMore}
          onScroll={() => setHasScrolled(true)}
          onEndThreshold={50}
        />
      </View>
    </View>
  );
};
