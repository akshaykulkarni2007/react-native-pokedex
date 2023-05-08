import {useContext} from 'react';
import {View} from 'react-native';
import {render, screen, fireEvent} from '@testing-library/react-native';

import {PokemonContext, PokemonProvider} from '../pokemonContext';

const TestElement = () => {
  const {pokemons} = useContext(PokemonContext);
  return <View>{pokemons.length}</View>;
};

const renderConsumer = () =>
  render(
    <PokemonProvider>
      <TestElement />
    </PokemonProvider>,
  );

describe('Pokemon Context Tests', () => {
  test('pokemons list', () => {
    renderConsumer();
    screen.debug();
  });
});
