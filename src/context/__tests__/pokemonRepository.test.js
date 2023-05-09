import axios from 'axios';

import {
  fetchByPokemonsWithOptions,
  fetchByURL,
  fetchPokemonDetails,
  fetchPokemonsByFilter,
} from '../pokemonRepository';

import {successRespose, errorRespose} from './fakes';

jest.mock('axios', () => ({get: jest.fn()}));

describe('PokemonContext Repository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetchByURL', async () => {
    axios.get.mockResolvedValue(successRespose);
    const response = await fetchByURL('test');

    expect(response).toEqual(successRespose);
  });

  test('fetchByPokemonsWithOptions', async () => {
    axios.get.mockResolvedValue(successRespose);
    const response = await fetchByPokemonsWithOptions('test', 1);

    expect(response).toEqual(successRespose);
  });

  test('fetchPokemonDetails', async () => {
    axios.get.mockResolvedValue(successRespose);
    const response = await fetchPokemonDetails('test');

    expect(response).toEqual(successRespose);
  });

  test('fetchPokemonDetails catch', async () => {
    axios.get.mockReturnValue(Promise.reject(errorRespose));
    expect(await fetchPokemonDetails('test')).toBe(null);
  });

  test('fetchPokemonsByFilter', async () => {
    axios.get.mockResolvedValue(successRespose);
    const response = await fetchPokemonsByFilter('test', 'test');

    expect(response).toEqual(successRespose);
  });
});
