import {useState, useEffect} from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';
import axios from 'axios';

import {Card} from '../../components';

import {API_BASE_URL, SCREEN_NAMES} from '../../constants';

import styles from './styles';

export const PokemonListingScreen = ({navigation}) => {
  const [pokemons, setPokemons] = useState([]);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [nextURL, setNextURL] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchInitalData();
  }, []);

  const fetchPokemons = async url => {
    try {
      const {data: pokemonList} = await axios.get(url);

      setNextURL(pokemonList.next);

      pokemonList.results.forEach(async item => {
        const {data: details} = await axios.get(item.url);

        setPokemons(prev => [
          ...prev,
          {
            id: details.id,
            name: details.name,
            imageUrl: details.sprites.front_default,
            types: details.types.map(type => type.type.name),
          },
        ]);
      });
    } catch (error) {
      console.log(error);
      setError('Something went wrong...');
    }
  };

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
      <FlatList
        data={pokemons}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <Pressable
            onPress={() =>
              navigation.navigate(SCREEN_NAMES.POKEMON_DETAILS, {
                id: item.id,
                name: item.name,
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
  );
};
