import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';

import {PokemonContext} from '../../context/pokemonContext';
import {PokemonListHeader, Filters} from '..';

describe('PokemonListHeader functional tests', () => {
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

describe('Filter functional tests', () => {
  test('closes filters on clicking close button', () => {
    const setShowFilters = jest.fn();

    render(
      <PokemonContext.Provider value={{searchPokemons: () => {}}}>
        <Filters setShowFilters={setShowFilters} />
      </PokemonContext.Provider>,
    );

    const button = screen.getByText('X');

    fireEvent.press(button);
    expect(setShowFilters).toHaveBeenCalled();
  });

  test('resets filters on "Reset" button click', async () => {
    const setShowFilters = jest.fn();
    const setSelectedTypes = jest.fn();
    const setSelectedGenders = jest.fn();

    render(
      <PokemonContext.Provider
        value={{
          types: ['ghost'],
          searchPokemons: () => {},
          setSelectedTypes,
          setSelectedGenders,
        }}>
        <Filters setShowFilters={setShowFilters} />
      </PokemonContext.Provider>,
    );

    const button = screen.getByText('Reset');
    const genderCheckbox = screen.getByTestId(/checkbox-male/i);
    const typeCheckbox = screen.getByTestId(/checkbox-ghost/i);

    fireEvent(genderCheckbox, 'onValueChange', true);
    fireEvent(typeCheckbox, 'onValueChange', true);

    expect(genderCheckbox.children[0].props.value).toBeTruthy();
    expect(typeCheckbox.children[0].props.value).toBeTruthy();

    fireEvent.press(button);

    expect(genderCheckbox.children[0].props.value).toBeFalsy();
    expect(typeCheckbox.children[0].props.value).toBeFalsy();

    expect(setSelectedTypes).toHaveBeenCalled();
    expect(setSelectedGenders).toHaveBeenCalled();
    expect(setShowFilters).toHaveBeenCalled();
  });

  test('applies filters on "Apply" button click', async () => {
    const setShowFilters = jest.fn();
    const setSelectedTypes = jest.fn();
    const setSelectedGenders = jest.fn();

    render(
      <PokemonContext.Provider
        value={{
          types: ['ghost'],
          searchPokemons: () => {},
          setSelectedTypes,
          setSelectedGenders,
        }}>
        <Filters setShowFilters={setShowFilters} />
      </PokemonContext.Provider>,
    );

    const button = screen.getByText('Apply');
    const genderCheckbox = screen.getByTestId(/checkbox-male/i);
    const typeCheckbox = screen.getByTestId(/checkbox-ghost/i);

    fireEvent(genderCheckbox, 'onValueChange', true);
    fireEvent(typeCheckbox, 'onValueChange', true);

    expect(genderCheckbox.children[0].props.value).toBeTruthy();
    expect(typeCheckbox.children[0].props.value).toBeTruthy();

    fireEvent.press(button);

    expect(setSelectedTypes).toHaveBeenCalledWith(['ghost']);
    expect(setSelectedGenders).toHaveBeenCalledWith(['male']);
    expect(setShowFilters).toHaveBeenCalled();
  });
});
