import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen, fireEvent} from '@testing-library/react-native';

import {PokemonContext} from '../../../context/pokemonContext';

import {PokemonDetailsScreen} from '..';

import {pokemons, attributes, stats} from './fakes';

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

  test('shows spinner while loading', () => {
    const wrapper = render(
      <PokemonContext.Provider
        value={{
          pokemons,
          pokemonDetails: {attributes: {}, stats: [], evolutionChain: []},
          totalCount: 0,
          loading: true,
          error: null,
          fetchPokemonDetails: () => {},
        }}>
        <PokemonDetailsScreen route={{params: {id: 1}}} />,
      </PokemonContext.Provider>,
    );

    expect(screen.getByTestId('spinner')).toBeTruthy();
  });

  test('shows error message when there is error', () => {
    const wrapper = render(
      <PokemonContext.Provider
        value={{
          pokemons: [],
          pokemonDetails: {attributes: {}, stats: [], evolutionChain: []},
          totalCount: 0,
          loading: false,
          error: 'error message',
          fetchPokemonDetails: () => {},
        }}>
        <PokemonDetailsScreen route={{params: {id: 1}}} />,
      </PokemonContext.Provider>,
    );

    expect(screen.getByText('error message')).toBeTruthy();
  });

  test('correctly calculates next and previous pokemon IDs', () => {
    const wrapper = render(
      <PokemonContext.Provider
        value={{
          pokemons,
          pokemonDetails: {attributes: {}, stats: [], evolutionChain: []},
          totalCount: 0,
          loading: false,
          error: null,
          fetchPokemonDetails: () => {},
        }}>
        <PokemonDetailsScreen route={{params: {id: 2}}} />,
      </PokemonContext.Provider>,
    );

    const nextButton = screen.findByText(pokemons[2].name);
    const prevButton = screen.findByText(pokemons[0].name);

    expect(nextButton).toBeTruthy();
    expect(prevButton).toBeTruthy();
  });

  test('correctly renders attributes and stats', () => {
    const wrapper = render(
      <PokemonContext.Provider
        value={{
          pokemons,
          pokemonDetails: {attributes, stats, evolutionChain: []},
          totalCount: 0,
          loading: false,
          error: null,
          fetchPokemonDetails: () => {},
        }}>
        <PokemonDetailsScreen route={{params: {id: 2}}} />,
      </PokemonContext.Provider>,
    );

    expect(wrapper.findByText('test1')).toBeTruthy();
    expect(wrapper.findByText('test2')).toBeTruthy();
    expect(wrapper.findByText('value1')).toBeTruthy();
    expect(wrapper.findByText('value2')).toBeTruthy();
    expect(wrapper.findByText('name1')).toBeTruthy();
    expect(wrapper.findByText('name2')).toBeTruthy();
    expect(wrapper.findByText('value12')).toBeTruthy();
    expect(wrapper.findByText('value23')).toBeTruthy();
  });

  test('navigates with next button correctly', async () => {
    render(
      <PokemonContext.Provider
        value={{
          pokemons,
          pokemonDetails: {attributes, stats, evolutionChain: []},
          isFilteredResult: false,
          totalCount: 3,
          loading: false,
          error: null,
          fetchPokemonDetails: () => {},
        }}>
        <PokemonDetailsScreen route={{params: {id: 1}}} />,
      </PokemonContext.Provider>,
    );

    const button = await screen.findByText('test2');

    fireEvent(button, 'handlePress');
    expect(await screen.findByText('test3')).toBeTruthy();
  });

  test('navigates with prev button correctly', async () => {
    render(
      <PokemonContext.Provider
        value={{
          pokemons,
          pokemonDetails: {attributes, stats, evolutionChain: []},
          isFilteredResult: false,
          totalCount: 3,
          loading: false,
          error: null,
          fetchPokemonDetails: () => {},
        }}>
        <PokemonDetailsScreen route={{params: {id: 3}}} />,
      </PokemonContext.Provider>,
    );

    const button = await screen.findByText('test2');

    fireEvent(button, 'handlePress');
    expect(await screen.findByText('test1')).toBeTruthy();
  });
});
