import {useState, useEffect, useContext} from 'react';
import {View, ScrollView, Text, Image} from 'react-native';

import {Spinner, Button, ErrorComponent} from '../../components';

import {PokemonContext} from '../../context/pokemonContext';
import {API_BASE_URL} from '../../constants';

import {styles} from './styles';

export const PokemonDetailsScreen = ({route}) => {
  const {
    pokemons,
    pokemonDetails,
    totalCount,
    isFilteredResult,
    loading,
    error,
    fetchPokemonDetails,
  } = useContext(PokemonContext);

  const [pokemonId, setPokemonId] = useState(route.params.id);

  useEffect(() => {
    fetchPokemonDetails(`${API_BASE_URL}pokemon/${pokemonId}`);
  }, [pokemonId]);

  const nextName = pokemons.find(p => p.id === pokemonId + 1)?.name;
  const prevName = pokemons.find(p => p.id === pokemonId - 1)?.name;

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorComponent message={error} />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.details}>
        <Text style={styles.title}>{pokemonDetails.name}</Text>

        <View style={styles.topSection}>
          <View style={styles.imageContainer}>
            {pokemonDetails.imageUrl && (
              <Image
                source={{uri: pokemonDetails.imageUrl}}
                style={styles.image}
              />
            )}
          </View>

          <Text style={styles.description}>{pokemonDetails.description}</Text>
        </View>

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
          {pokemonId > 1 && !isFilteredResult && (
            <Button
              type="dark"
              handlePress={() => setPokemonId(prev => (prev -= 1))}
              style={styles.button}>
              <Text>{prevName}</Text>
            </Button>
          )}

          {pokemonId < totalCount && !isFilteredResult && (
            <Button
              type="dark"
              handlePress={() => setPokemonId(prev => (prev += 1))}
              style={styles.button}>
              <Text>{nextName}</Text>
            </Button>
          )}
        </View>
      </View>
    </ScrollView>
  );
};
