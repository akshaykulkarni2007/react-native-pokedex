import React, {createContext, useState, useEffect} from 'react';
import {get, unionBy, intersectionBy} from 'lodash';

import {fetchByURL, fetchByPokemonsWithOptions} from './pokemonRepository';

import {API_BASE_URL} from '../constants';
import {getPokemonsByFilter, pokemonListItem} from './contextUtils';

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
  const [types, setTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [isFilteredResult, setIsFilteredResult] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [nextURL, setNextURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const populateData = async () => {
      try {
        setLoading(true);
        setPokemons([]);

        if (
          isFilteredResult &&
          !selectedTypes.length &&
          !selectedGenders.length
        ) {
          fetchPokemons(`${API_BASE_URL}pokemon`);
        } else {
          let pokemonsByType = [];
          let pokemonByGenders = [];

          if (selectedTypes.length) {
            pokemonsByType = await getPokemonsByFilter(
              selectedTypes,
              'type',
              'pokemon',
              'pokemon',
            );
          }

          if (selectedGenders.length) {
            pokemonByGenders = await getPokemonsByFilter(
              selectedGenders,
              'gender',
              'pokemon_species_details',
              'pokemon_species',
            );
          }

          const result = intersectionBy(
            pokemonsByType.length ? pokemonsByType : pokemonByGenders,
            pokemonByGenders.length ? pokemonByGenders : pokemonsByType,
            'name',
          );

          setPokemons(result);
          setNextURL('');
        }
      } catch (error) {
        console.log(error);
        setPokemons([]);
        setError('Something went wrong...');
      } finally {
        setLoading(false);
      }
    };

    if (isFilteredResult) {
      populateData();
    }
  }, [JSON.stringify(selectedGenders), JSON.stringify(selectedTypes)]);

  const fetchPokemons = async url => {
    try {
      setLoading(true);
      const {data: pokemonList} = await fetchByPokemonsWithOptions(url, 12);

      setNextURL(pokemonList.next);
      setTotalCount(pokemonList.count);

      pokemonList.results.forEach(async item => {
        const {data: details} = await fetchByURL(item.url);
        const listItem = pokemonListItem(details);

        setPokemons(prev => [...prev, listItem]);
        setIsFilteredResult(false);
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

      const {data: pokemonDetails} = await fetchByURL(url);

      const {data: speciesData} = await fetchByURL(
        `${API_BASE_URL}pokemon-species/${pokemonDetails.id}`,
      );

      const {data: genders} = await fetchByURL(`${API_BASE_URL}gender`);

      const {data: evolutionChain} = await fetchByURL(
        speciesData.evolution_chain.url,
      );

      const allWeaknesses = await Promise.all(
        pokemonDetails.types.map(async t => {
          const typeUrl = t.type.url;
          const {data} = await fetchByURL(typeUrl);
          return get(data, 'damage_relations.double_damage_from', []).map(
            detail => detail.name,
          );
        }),
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
        description:
          speciesData?.flavor_text_entries
            .filter(f => f.language.name === 'en')[0]
            ?.flavor_text?.replace(/\n/g, ' ') || '',
        attributes: {
          height: pokemonDetails.height,
          weight: pokemonDetails.weight,
          gender: genders.results.map(gender => gender.name),
          eggGroup: speciesData.egg_groups.map(group => group.name),
          abilities: pokemonDetails.abilities.map(
            ability => ability.ability.name,
          ),
          types: pokemonDetails.types.map(type => type.type.name),
          'weak against': unionBy(...allWeaknesses).join(', '),
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

  const searchPokemons = async url => {
    if (searchTerm.trim().length === 0) {
      setPokemons([]);
      fetchPokemons(`${API_BASE_URL}pokemon`);
    } else {
      try {
        setLoading(true);
        setPokemons([]);
        setNextURL('');

        const {data: result} = await fetchByURL(`${url}/${searchTerm}`);

        const listItem = pokemonListItem(result);

        setPokemons([listItem]);
        setIsFilteredResult(true);
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
      const {data} = await fetchByURL(`${API_BASE_URL}type`);

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
        searchTerm,
        isFilteredResult,
        totalCount,
        types,
        nextURL,
        loading,
        error,
        getAlltyps,
        setSelectedTypes: types => {
          setIsFilteredResult(true);
          setSelectedTypes(types);
        },
        setSelectedGenders: genders => {
          setIsFilteredResult(true);
          setSelectedGenders(genders);
        },
        setSearchTerm,
        fetchPokemons,
        fetchPokemonDetails,
        searchPokemons,
      }}>
      {children}
    </PokemonContext.Provider>
  );
};
