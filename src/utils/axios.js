import axios from 'axios';

import {API_BASE_URL} from '../constants';

export const pokeAPI = axios.create({
  baseURL: API_BASE_URL,
  timeout: 3000,
});
