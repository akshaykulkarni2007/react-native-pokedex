import {useState, useEffect, useContext} from 'react';
import {View, ScrollView, Text, Image, Pressable} from 'react-native';

import {PokemonContext} from '../../context/pokemonContext';
import {API_BASE_URL} from '../../constants';

import {styles} from './styles';

export const PokemonDetailsScreen = ({route}) => {
  const {pokemonDetails, totalCount, error, fetchPokemonDetails} =
    useContext(PokemonContext);

  const [pokemonId, setPokemonId] = useState(route.params.id);

  useEffect(() => {
    fetchPokemonDetails(`${API_BASE_URL}pokemon/${pokemonId}`);
  }, [pokemonId]);

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: pokemonDetails.imageUrl}} style={styles.image} />
      <Text>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}> {pokemonDetails.name}</Text>
      </Text>

      <Text style={styles.sectionTitle}>Physical Attributes</Text>
      {Object.entries(pokemonDetails.attributes).map(([key, value]) => (
        <Text style={styles.detailsRow} key={key}>
          <Text style={styles.label}>{key}: </Text>
          <Text>{Array.isArray(value) ? value.join(', ') : value}</Text>
        </Text>
      ))}

      <Text style={styles.sectionTitle}>Stats</Text>
      {pokemonDetails.stats.map(({name, value}) => (
        <Text style={styles.detailsRow} key={name}>
          <Text style={styles.label}>{name}: </Text>
          <Text>{value}</Text>
        </Text>
      ))}

      <Text style={styles.description}>description</Text>

      <View style={styles.actionBar}>
        {pokemonId > 1 && (
          <Pressable
            onPress={() => setPokemonId(prev => (prev -= 1))}
            style={styles.button}>
            <Text style={styles.buttonLabel}>Previous Pokemon</Text>
          </Pressable>
        )}

        {pokemonId < totalCount && (
          <Pressable
            onPress={() => setPokemonId(prev => (prev += 1))}
            style={[styles.button, styles.prevButton]}>
            <Text style={styles.buttonLabel}>Next Pokemon</Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
};
