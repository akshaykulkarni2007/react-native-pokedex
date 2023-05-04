import React from 'react';
import renderer from 'react-test-renderer';

import {PokemonContext} from '../../../context/pokemonContext';
import {PokemonDetailsScreen} from '..';

describe('renders PokemonDetailsScreen correctly', () => {
  jest.mock('react-native-linear-gradient', () => 'LinearGradient');

  test('renders screen correctly', () => {
    const tree = renderer
      .create(
        <PokemonContext.Provider
          value={{
            pokemons: [],
            pokemonDetails: {attributes: {}, stats: [], evolutionChain: []},
            totalCount: 0,
            loading: false,
            error: null,
            fetchPokemonDetails: () => {},
          }}>
          <PokemonDetailsScreen route={{params: {id: 1}}} />
        </PokemonContext.Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
