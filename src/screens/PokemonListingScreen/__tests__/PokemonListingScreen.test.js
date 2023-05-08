import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen} from '@testing-library/react-native';

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

describe('functional tests', () => {
  test('renders error message', () => {
    const wrapper = render(
      <PokemonContext.Provider
        value={{
          pokemons: [],
          fetchPokemons: () => {},
          nextURL: '',
          getAlltyps: () => {},
          error: 'error message',
          fetchPokemonDetails: () => {},
        }}>
        <PokemonListingScreen navigation={{navigate: () => {}}} />,
      </PokemonContext.Provider>,
    );

    expect(screen.getByText('error message')).toBeTruthy();
  });
});
