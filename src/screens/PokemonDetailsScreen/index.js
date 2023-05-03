import {useState, useEffect, useContext} from 'react';
import {View, ScrollView, Text, Image, Pressable} from 'react-native';

import {Spinner, Button} from '../../components';

import {PokemonContext} from '../../context/pokemonContext';
import {API_BASE_URL} from '../../constants';

import {styles} from './styles';

export const PokemonDetailsScreen = ({route}) => {
  const {pokemonDetails, totalCount, loading, error, fetchPokemonDetails} =
    useContext(PokemonContext);

  const [pokemonId, setPokemonId] = useState(route.params.id);

  useEffect(() => {
    fetchPokemonDetails(`${API_BASE_URL}pokemon/${pokemonId}`);
  }, [pokemonId]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.details}>
        <Text style={styles.title}>{pokemonDetails.name}</Text>

        {pokemonDetails.imageUrl && (
          <Image source={{uri: pokemonDetails.imageUrl}} style={styles.image} />
        )}

        <Text style={styles.description}>{pokemonDetails.description}</Text>

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

        <Text>
          <Text style={styles.label}>Evolution Chain: </Text>
          <Text style={styles.value}>
            {pokemonDetails.evolutionChain.join(' -> ')}
          </Text>
        </Text>

        <View style={styles.actionBar}>
          {pokemonId > 1 && (
            <Button
              type="dark"
              handlePress={() => setPokemonId(prev => (prev -= 1))}
              style={styles.button}>
              <Text>Previous</Text>
            </Button>
          )}

          {pokemonId < totalCount && (
            <Button
              type="dark"
              handlePress={() => setPokemonId(prev => (prev += 1))}
              style={styles.button}>
              <Text>Next</Text>
            </Button>
          )}
        </View>
      </View>
    </ScrollView>
  );
};
