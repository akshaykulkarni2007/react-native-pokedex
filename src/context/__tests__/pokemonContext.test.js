import {useContext, useEffect} from 'react';
import {render} from '@testing-library/react-native';

import {fetchByPokemonsWithOptions, fetchByURL} from '../pokemonRepository';

import {PokemonContext, PokemonProvider} from '../pokemonContext';
import {getPokemonsByFilter} from '../contextUtils';

import {
  genderFilters,
  typeFilters,
  mockPokemonItem,
  pokemonResponse,
} from './fakes';

jest.mock('../contextUtils', () => ({
  getPokemonsByFilter: jest.fn(),
  pokemonListItem: jest.fn(),
}));

jest.mock('../pokemonRepository', () => ({
  fetchByPokemonsWithOptions: jest.fn(),
  fetchByURL: jest.fn(),
}));

const TestElement = ({shouldFilter, shouldFetchTypes, searchQuery}) => {
  const {
    isFilteredResult,
    setSelectedGenders,
    setSelectedTypes,
    fetchPokemons,
    fetchPokemonDetails,
    searchPokemons,
    getAlltyps,
    setSearchTerm,
    searchTerm,
  } = useContext(PokemonContext);

  useEffect(() => {
    if (!isFilteredResult) {
      if (shouldFilter) {
        setSelectedTypes(shouldFilter ? typeFilters : []);
        setSelectedGenders(shouldFilter ? genderFilters : []);
      } else {
        fetchPokemons('test');
        fetchPokemonDetails('test');
      }
    }

    if (shouldFetchTypes) {
      getAlltyps();
    }

    if (!!searchQuery && !searchTerm) {
      setSearchTerm(searchQuery);
      searchPokemons();
    }
  }, [isFilteredResult, typeFilters, genderFilters, searchTerm]);

  return <></>;
};

const renderConsumer = (shouldFilter, shouldFetchTypes, searchQuery) =>
  render(
    <PokemonProvider>
      <TestElement
        shouldFilter={shouldFilter}
        shouldFetchTypes={shouldFetchTypes}
        searchQuery={searchQuery}
      />
    </PokemonProvider>,
  );

describe('Pokemon Context Tests', () => {
  test('fetches pokemons based on filters', () => {
    getPokemonsByFilter.mockResolvedValue([mockPokemonItem]);
    renderConsumer(true, false, '');

    expect(getPokemonsByFilter).toBeCalledTimes(1);
  });

  test('fetch pokemons based on filters throws error, shows error', () => {
    try {
      getPokemonsByFilter.mockResolvedValue(null);
      renderConsumer(true, false, '');
    } catch (e) {
      expect(getPokemonsByFilter).toBeCalled();
      expect(e).toBeTruthy();
    }
  });

  test('fetches all pokemons', () => {
    fetchByPokemonsWithOptions.mockResolvedValue({
      data: {results: [pokemonResponse], count: 4, next: ''},
    });
    fetchByURL.mockResolvedValue({data: pokemonResponse});
    renderConsumer(false);

    expect(fetchByPokemonsWithOptions).toBeCalled();
  });

  test('fetches all types', () => {
    fetchByURL.mockResolvedValue({
      data: {
        results: [{name: 'normal', url: 'url'}],
      },
    });
    renderConsumer(false, true);

    expect(fetchByURL).toBeCalled();
  });

  test('throws while fetching all types', () => {
    fetchByURL.mockResolvedValue({
      data: null,
    });

    try {
      renderConsumer(false, true);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  test('searches pokemons', async () => {
    fetchByURL.mockResolvedValue({
      data: {
        results: [{name: 'normal', url: 'url'}],
      },
    });
    renderConsumer(false, false, 'test');

    expect(fetchByURL).toBeCalled();
  });

  test('searches pokemons with blank query', async () => {
    fetchByURL.mockResolvedValue({
      data: {
        results: [{name: 'normal', url: 'url'}],
      },
    });
    renderConsumer(false, false, '');

    expect(fetchByURL).toBeCalled();
  });
});
