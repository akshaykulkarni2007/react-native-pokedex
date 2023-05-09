import axios from 'axios';

import {API_BASE_URL} from '../constants';

export const fetchByURL = async url => {
  return axios.get(url);
};

export const fetchByPokemonsWithOptions = async (url, limit) => {
  return axios.get(url, {params: {limit}});
};

export const fetchPokemonDetails = async name => {
  return await axios.get(`${API_BASE_URL}pokemon/${name}`).catch(() => null);
};

export const fetchPokemonsByFilter = async (filterPath, filter) => {
  return await axios.get(`${API_BASE_URL}${filterPath}/${filter}`);
};
