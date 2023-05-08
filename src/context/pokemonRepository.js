import {API_BASE_URL} from '../constants';
import axios from 'axios';

export const fetchPokemonsByFilter = async (filterPath, filter) => {
  return await axios.get(`${API_BASE_URL}${filterPath}/${filter}`);
};

export const fetchPokemonDetails = async name => {
  return await axios.get(`${API_BASE_URL}pokemon/${name}`).catch(() => null);
};
