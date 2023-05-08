import {pokemonListItem, getPokemonsByFilter} from '../contextUtils';
import {fetchPokemonsByFilter} from '../pokemonRepository';
import {expectedPokemonItem, pokemonResponse, typeFilters} from './fakes';
jest.mock('../pokemonRepository', () => ({
  fetchPokemonsByFilter: jest.fn(() => ({data: {}})),
}));

describe('Pokemon Context Utils Tests', () => {
  test('pokemonListItem converts pokemon to list item', () => {
    const actual = pokemonListItem(pokemonResponse);

    expect(actual).toEqual(expectedPokemonItem);
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

    expect(fetchPokemonsByFilter).toBeCalledTimes(2);
  });
});
