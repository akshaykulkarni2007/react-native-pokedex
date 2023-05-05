import {useState, useContext} from 'react';
import {View, Text, TextInput, Pressable, Image} from 'react-native';

import {PokemonContext} from '../context/pokemonContext';

import {API_BASE_URL} from '../constants';

import {pokemonListHeaderStyles} from './styles';

export const PokemonListHeader = ({setShowFilters}) => {
  const {searchPokemons} = useContext(PokemonContext);

  const [searchTerm, setSearchTerm] = useState('');
  return (
    <>
      <Text style={pokemonListHeaderStyles.title}>Pokedex</Text>
      <Text style={pokemonListHeaderStyles.subtitle}>
        Search for any pokemon that exists on the planet
      </Text>

      <View style={pokemonListHeaderStyles.filterContainer}>
        <View style={pokemonListHeaderStyles.searchBar}>
          <Pressable
            style={pokemonListHeaderStyles.searchButton}
            onPress={() =>
              searchPokemons(`${API_BASE_URL}pokemon`, searchTerm)
            }>
            <Image
              source={require('../assets/images/search.png')}
              style={pokemonListHeaderStyles.searchIcon}
            />
          </Pressable>

          <TextInput
            placeholder="Name or Number"
            style={pokemonListHeaderStyles.searchInput}
            value={searchTerm}
            onChangeText={val => setSearchTerm(val)}
            returnKeyType="search"
            autoCapitalize="none"
            onSubmitEditing={() => {
              searchPokemons(`${API_BASE_URL}pokemon`, searchTerm);
            }}
          />
        </View>

        <Pressable
          style={pokemonListHeaderStyles.filterButton}
          onPress={() => setShowFilters(true)}>
          <Image
            source={require('../assets/images/filter.png')}
            style={pokemonListHeaderStyles.filterIcon}
          />
        </Pressable>
      </View>
    </>
  );
};
