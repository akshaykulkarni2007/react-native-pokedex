import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {PokemonListingScreen, PokemonDetailsScreen} from '../screens';

import {SCREEN_NAMES} from '../constants';

const Stack = createStackNavigator();

export const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName={SCREEN_NAMES.POKEMON_LISTING}>
      <Stack.Screen
        name={SCREEN_NAMES.POKEMON_LISTING}
        component={PokemonListingScreen}
        options={{title: 'PokeDex'}}
      />
      <Stack.Screen
        name={SCREEN_NAMES.POKEMON_DETAILS}
        component={PokemonDetailsScreen}
        options={({route}) => ({title: route.params.name})}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
