import {Text} from 'react-native';

import {pokemonEmptyListStyles} from './styles';

export const PokemonEmptyList = () => {
  return <Text style={pokemonEmptyListStyles.text}>No results found!</Text>;
};
