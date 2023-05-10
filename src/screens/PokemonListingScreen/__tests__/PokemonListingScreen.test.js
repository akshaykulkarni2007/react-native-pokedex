import React from 'react';
import renderer from 'react-test-renderer';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';

import {PokemonContext} from '../../../context/pokemonContext';
import {PokemonListingScreen} from '..';

import {SCREEN_NAMES} from '../../../constants';

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

  test('renders more items on reaching end', async () => {
    const fetchPokemons = jest.fn();

    const wrapper = render(
      <PokemonContext.Provider
        value={{
          pokemons: [
            {
              id: 1,
              name: 'name',
              imageUrl: 'image',
              types: ['TYPE'],
            },
          ],
          fetchPokemons,
          nextURL: 'test',
          getAlltyps: () => {},
          error: null,
          fetchPokemonDetails: () => {},
        }}>
        <PokemonListingScreen navigation={{navigate: () => {}}} />,
      </PokemonContext.Provider>,
    );

    const list = screen.getByTestId('pokemonlist');

    try {
      fireEvent.scroll(list);
    } catch (e) {}

    fireEvent(list, 'endReached');
    expect(fetchPokemons).toBeCalled();
  });

  test('navigates to details screen with correct ID', async () => {
    const mockNavigate = jest.fn();

    const wrapper = render(
      <PokemonContext.Provider
        value={{
          pokemons: [
            {
              id: 1,
              name: 'name',
              imageUrl: 'image',
              types: ['TYPE'],
            },
          ],
          fetchPokemons: () => {},
          nextURL: 'test',
          getAlltyps: () => {},
          error: null,
          fetchPokemonDetails: () => {},
        }}>
        <PokemonListingScreen navigation={{navigate: mockNavigate}} />,
      </PokemonContext.Provider>,
    );

    await waitFor(() => {
      expect(screen.findByTestId('card-1')).toBeTruthy();
    });

    const button = await screen.findByTestId('card-1');

    fireEvent.press(button);
    expect(mockNavigate).toBeCalledWith(SCREEN_NAMES.POKEMON_DETAILS, {
      id: 1,
      name: 'name',
    });
  });
});
