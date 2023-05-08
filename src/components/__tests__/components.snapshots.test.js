import React from 'react';
import renderer from 'react-test-renderer';

import {PokemonContext} from '../../context/pokemonContext';
import {PokemonEmptyList, PokemonListHeader, Filters, Card} from '..';

describe('renders components correctly', () => {
  jest.mock('react-native-linear-gradient', () => 'LinearGradient');

  test('renders PokemonEmptyList correctly', () => {
    const tree = renderer.create(<PokemonEmptyList />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders PokemonListHeader correctly', () => {
    const tree = renderer
      .create(
        <PokemonContext.Provider value={{searchPokemons: () => {}}}>
          <PokemonListHeader setShowFilters={() => {}} />
        </PokemonContext.Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders Card correctly', () => {
    const tree = renderer
      .create(
        <Card
          image="url"
          title="title"
          description="description"
          bgcolor={['red', 'blue']}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders Filters correctly', () => {
    const tree = renderer
      .create(
        <PokemonContext.Provider
          value={{types: [], setSelectedTypes: [], setSelectedGenders: []}}>
          <Filters showFilters={false} setShowFilters={() => {}} />
        </PokemonContext.Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
