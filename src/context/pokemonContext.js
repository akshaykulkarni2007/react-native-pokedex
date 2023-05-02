import React, {createContext, useState} from 'react';
import axios from 'axios';

import {API_BASE_URL} from '../constants';

export const PokemonContext = createContext();

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
  const [totalCount, setTotalCount] = useState(0);
  const [nextURL, setNextURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchPokemons = async url => {
    try {
      setLoading(true);
      const {data: pokemonList} = await axios.get(url);

      setNextURL(pokemonList.next);
      setTotalCount(pokemonList.count);

      pokemonList.results.forEach(async item => {
        const {data: details} = await axios.get(item.url);

        setPokemons(prev => [
          ...prev,
          {
            id: details.id,
            name: details.name,
            imageUrl: details.sprites.front_default,
            types: details.types.map(type => type.type.name),
            // detailsURL: item.url,
          },
        ]);
      });
    } catch (error) {
      console.log(error);
      setError('Something went wrong...');
    } finally {
      setLoading(false);
    }
  };

  const fetchPokemonDetails = async url => {
    try {
      setLoading(true);

      const {data: pokemonDetails} = await axios.get(url);

      const {data: eggGroup} = await axios.get(
        `${API_BASE_URL}pokemon-species/${pokemonDetails.id}`,
      );

      const {data: description} = await axios.get(
        `${API_BASE_URL}characteristic/${pokemonDetails.id}`,
      );

      const {data: genders} = await axios.get(`${API_BASE_URL}gender`);

      const {data: evolutionChain} = await axios.get(
        `${API_BASE_URL}evolution-chain/${pokemonDetails.id}`,
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
        description: description.descriptions.filter(
          d => d.language.name === 'en',
        )[0].description,
        attributes: {
          height: pokemonDetails.height,
          weight: pokemonDetails.weight,
          gender: genders.results.map(gender => gender.name),
          eggGroup: eggGroup.egg_groups.map(group => group.name),
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

  return (
    <PokemonContext.Provider
      value={{
        pokemons,
        pokemonDetails,
        totalCount,
        nextURL,
        loading,
        error,
        fetchPokemons,
        fetchPokemonDetails,
      }}>
      {children}
    </PokemonContext.Provider>
  );
};
