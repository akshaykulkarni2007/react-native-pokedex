import axios from 'axios';
import {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';

import {Spinner, Card} from '../../components';

import {API_BASE_URL} from '../../constants';

import styles from './styles';

export const PokemonListingScreen = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    const {data: pokemonList} = await axios.get(
      `${API_BASE_URL}pokemon?limit=2`,
    );

    pokemonList.results.forEach(async item => {
      const {data: details} = await axios.get(item.url);

      setPokemons(prev => [
        ...prev,
        {
          name: details.name,
          imageUrl: details.sprites.front_default,
          types: details.types.map(type => type.type.name),
        },
      ]);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokedex</Text>
      <Text style={styles.subtitle}>
        Search for any pokemon that exists on the planet
      </Text>

      <FlatList
        data={pokemons}
        keyExtractor={item => item.name}
        renderItem={({item, index}) => (
          <Card
            title={item.name}
            image={item.imageUrl}
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
