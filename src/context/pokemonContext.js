import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

import {API_BASE_URL} from '../constants';

export const PokemonContext = createContext();

const pokemonListItem = ({id, name, sprites, types}) => {
  return {
    id,
    name,
    imageUrl: sprites.front_default,
    types: types.map(type => type.type.name.toUpperCase()),
  };
};

export const PokemonProvider = ({children}) => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState({
    id: '',
    name: '',
    description: '',
    imageUrl: '',
    attributes: {},
    stats: [],
    evolutionChain: [],
  });
  const [types, setTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [nextURL, setNextURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchPokemons = async (url, limit = 12) => {
    try {
      setLoading(true);
      const {data: pokemonList} = await axios.get(url, {
        params: {limit},
      });

      setNextURL(pokemonList.next);
      setTotalCount(pokemonList.count);

      pokemonList.results.forEach(async item => {
        const {data: details} = await axios.get(item.url);

        const listItem = pokemonListItem(details);

        setPokemons(prev => [...prev, listItem]);
      });
    } catch (error) {
      console.log(error);
      setPokemons([]);
      setError('Something went wrong...');
    } finally {
      setLoading(false);
    }
  };

  const fetchPokemonDetails = async url => {
    try {
      setLoading(true);

      const {data: pokemonDetails} = await axios.get(url);

      const {data: speciesData} = await axios.get(
        `${API_BASE_URL}pokemon-species/${pokemonDetails.id}`,
      );

      const {data: genders} = await axios.get(`${API_BASE_URL}gender`);

      const {data: evolutionChain} = await axios.get(
        speciesData.evolution_chain.url,
      );

      const {data: weaknesses} = await axios.get(
        `${API_BASE_URL}type/${pokemonDetails.id}`,
      );

      let evoData = evolutionChain.chain;
      var evoChain = [];
      do {
        evoChain.push(evoData.species.name);
        evoData = evoData['evolves_to'][0];
      } while (!!evoData && evoData.hasOwnProperty('evolves_to'));

      setPokemonDetails({
        id: pokemonDetails.id,
        name: pokemonDetails.name,
        imageUrl: pokemonDetails.sprites.front_default,
        description: speciesData.flavor_text_entries
          .filter(f => f.language.name === 'en')[0]
          .flavor_text.replace(/\n/g, ' '),
        attributes: {
          height: pokemonDetails.height,
          weight: pokemonDetails.weight,
          gender: genders.results.map(gender => gender.name),
          eggGroup: speciesData.egg_groups.map(group => group.name),
          abilities: pokemonDetails.abilities.map(
            ability => ability.ability.name,
          ),
          types: pokemonDetails.types.map(type => type.type.name),
          'weak against': weaknesses.damage_relations.double_damage_from.map(
            type => type.name,
          ),
        },
        stats: pokemonDetails.stats.map(stat => ({
          name: stat.stat.name.replace('-', ' '),
          value: stat.base_stat,
        })),
        evolutionChain: evoChain,
      });
    } catch (error) {
      console.log(error);
      setError('Something went wrong...');
    } finally {
      setLoading(false);
    }
  };

  const filterPokemons = async (url, query) => {
    if (query.trim().length === 0) {
      fetchPokemons(`${API_BASE_URL}pokemon`);
    } else {
      try {
        setLoading(true);
        const {data: result} = await axios.get(`${url}/${query}`);

        const listItem = pokemonListItem(result);

        setPokemons([listItem]);
      } catch (error) {
        error.response.status === 404
          ? setPokemons([])
          : setError('Something went wrong...');
      } finally {
        setLoading(false);
      }
    }
  };

  const getAlltyps = async () => {
    try {
      const {data} = await axios.get(`${API_BASE_URL}type`);

      const types = data.results.map(type => type.name);
      setTypes(types);
    } catch (error) {
      setError('Something went wrong...');
      console.log(error.message);
    }
  };

  return (
    <PokemonContext.Provider
      value={{
        pokemons,
        pokemonDetails,
        selectedTypes,
        selectedGenders,
        totalCount,
        types,
        nextURL,
        loading,
        error,
        getAlltyps,
        setSelectedTypes,
        setSelectedGenders,
        fetchPokemons,
        fetchPokemonDetails,
        filterPokemons,
      }}>
      {children}
    </PokemonContext.Provider>
  );
};
