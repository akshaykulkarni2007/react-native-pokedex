import {useState, useEffect, useContext} from 'react';
import {View, Text, Pressable} from 'react-native';

import {PokemonContext} from '../../context/pokemonContext';
import {API_BASE_URL} from '../../constants';

import {styles} from './styles';

export const PokemonDetailsScreen = ({route, navigation}) => {
  const {pokemonDetails, totalCount, fetchPokemonDetails} =
    useContext(PokemonContext);

  const [pokemonId, setPokemonId] = useState(route.params.id);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchPokemonDetails(`${API_BASE_URL}pokemon/${pokemonId}`);
  }, [pokemonId]);

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
