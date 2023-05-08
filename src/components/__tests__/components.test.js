import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen, fireEvent} from '@testing-library/react-native';

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

describe('functional tests', () => {
  test('searches when search button is clicked', () => {
    const searchPokemons = jest.fn();

    render(
      <PokemonContext.Provider
        value={{searchPokemons, setSearchTerm: () => {}}}>
        <PokemonListHeader setShowFilters={() => {}} />
      </PokemonContext.Provider>,
    );

    const input = screen.getByPlaceholderText('Name or Number');
    const button = screen.getByLabelText('search');

    fireEvent.changeText(input, '1');
    fireEvent.press(button);
    expect(searchPokemons).toHaveBeenCalled();

    fireEvent.changeText(input, '');
    fireEvent.changeText(input, '1');
    fireEvent(input, 'submitEditing');
    expect(searchPokemons).toHaveBeenCalled();
  });

  test('opens filters modal when button is clicked', () => {
    const searchPokemons = jest.fn();
    const setShowFilters = jest.fn();

    render(
      <PokemonContext.Provider
        value={{searchPokemons, setSearchTerm: () => {}}}>
        <PokemonListHeader setShowFilters={setShowFilters} />
      </PokemonContext.Provider>,
    );

    const button = screen.getByLabelText('filter');

    fireEvent.press(button);
    expect(setShowFilters).toHaveBeenCalled();
  });
});
