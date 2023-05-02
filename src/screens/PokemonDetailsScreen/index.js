import {useState, useEffect} from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import axios from 'axios';

import {API_BASE_URL} from '../../constants';

import {styles} from './styles';

export const PokemonDetailsScreen = ({route, navigation}) => {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonId, setPokemonId] = useState(route.params.id);
  const [error, setError] = useState(false);

  const {totalCount} = route.params;

  useEffect(() => {
    fetchPokemonDetails();
  }, [pokemonId]);

  const fetchPokemonDetails = async () => {
    try {
      const {data: pokemonDetails} = await axios.get(
        `${API_BASE_URL}pokemon/${pokemonId}`,
      );

      console.log(pokemonDetails.name, pokemonId);

      // setPokemon({
      //   id: pokemonDetails.id,
      //   name: pokemonDetails.name,
      //   imageUrl: pokemonDetails.sprites.front_default,
      //   // attributes: {height: height, weight: weight, gender: , eggGroup: , abilities: pokemonDetails.abilities.map(ability => ability.ability.name), types: pokemonDetails.types.map(type => type.type.name), weakAgainst:},
      //   // stats: pokemonDetails.stats.map(stat => ({name: stat.stat.name, value: stat.base_stat})),
      //   // evolutionChain: {}
      // });
    } catch (error) {
      console.log(error);
      setError('Something went wrong...');
    }
  };

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      {/* <Image source={''} style={styles.image} /> */}
      <Text style={styles.name}>Details for {pokemonId}</Text>
      <Text style={styles.description}>description</Text>
      {pokemonId < totalCount && (
        <Pressable onPress={() => setPokemonId(prev => (prev += 1))}>
          <Text>Next</Text>
        </Pressable>
      )}
      {pokemonId > 1 && (
        <Pressable onPress={() => setPokemonId(prev => (prev -= 1))}>
          <Text>Prev</Text>
        </Pressable>
      )}
    </View>
  );
};
