import {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {PokemonListingScreen, PokemonDetailsScreen} from '../screens';

import {PokemonContext} from '../context/pokemonContext';
import {SCREEN_NAMES} from '../constants';

const Stack = createStackNavigator();

export const Navigation = () => {
  const {pokemonDetails} = useContext(PokemonContext);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={SCREEN_NAMES.POKEMON_LISTING}>
        <Stack.Screen
          name={SCREEN_NAMES.POKEMON_LISTING}
          component={PokemonListingScreen}
          options={{title: 'Pokedex'}}
        />
        <Stack.Screen
          name={SCREEN_NAMES.POKEMON_DETAILS}
          component={PokemonDetailsScreen}
          options={({route}) => ({title: pokemonDetails?.name})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
