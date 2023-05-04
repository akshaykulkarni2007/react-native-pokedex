import React from 'react';
import renderer from 'react-test-renderer';

import {PokemonContext} from '../../../context/pokemonContext';
import {PokemonListingScreen} from '..';

describe('renders PokemonListingScreen correctly', () => {
  jest.mock('react-native-linear-gradient', () => 'LinearGradient');

  test('renders screen correctly', () => {
    const tree = renderer
      .create(
        <PokemonContext.Provider
          value={{
            pokemons: [],
            fetchPokemons: () => {},
            nextURL: '',
            getAlltyps: () => {},
            error: null,
            fetchPokemonDetails: () => {},
          }}>
          <PokemonListingScreen navigation={{navigate: () => {}}} />
        </PokemonContext.Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
