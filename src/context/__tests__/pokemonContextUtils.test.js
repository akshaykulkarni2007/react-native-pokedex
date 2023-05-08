import {pokemonListItem, getPokemonsByFilter} from '../contextUtils';
import {fetchPokemonDetails, fetchPokemonsByFilter} from '../pokemonRepository';
import {
  mockPokemonItem,
  pokemonResponse,
  typeFilters,
  mockTypeReponse,
  mockPokemonResponse,
} from './fakes';
jest.mock('../pokemonRepository', () => ({
  fetchPokemonsByFilter: jest.fn(() => ({data: mockTypeReponse})),
  fetchPokemonDetails: jest.fn(() => ({data: mockPokemonResponse})),
}));

describe('Pokemon Context Utils Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('pokemonListItem converts pokemon to list item', () => {
    const actual = pokemonListItem(pokemonResponse);

    expect(actual).toEqual(mockPokemonItem);
  });

  test('getPokemonsByFilter returns empty when no filters', async () => {
    const filteredPokemons = await getPokemonsByFilter([]);
    expect(filteredPokemons.length).toBe(0);
  });

  test('getPokemonsByFilter returns items when valid filters are added', async () => {
    const filteredPokemons = await getPokemonsByFilter(
      typeFilters,
      'filterPath',
      'pokemon',
      'pokemon',
    );

    expect(fetchPokemonsByFilter).toBeCalledTimes(typeFilters.length);
    expect(fetchPokemonDetails).toBeCalledTimes(filteredPokemons.length);
    expect(filteredPokemons.length).toBe(mockTypeReponse.pokemon.length);
  });
});
