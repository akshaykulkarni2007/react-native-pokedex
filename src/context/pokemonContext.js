import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';
import {get, unionBy, intersectionBy} from 'lodash';

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
  const [isFilteredResult, setIsFilteredResult] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [nextURL, setNextURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const populateData = async () => {
      const filteredPokemons = [[], []];

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
          if (selectedTypes.length) {
            const pokemonsByType = await getPokemonsByFilter(
              selectedTypes,
              'type',
              'pokemon',
              'pokemon',
              'pokemon.name',
            );
            filteredPokemons[0] = pokemonsByType;
          }

          if (selectedGenders.length) {
            const pokemonByGenders = await getPokemonsByFilter(
              selectedGenders,
              'gender',
              'pokemon_species_details',
              'pokemon_species',
              'pokemon_species.namer',
            );
            filteredPokemons[1] = pokemonByGenders;
          }

          if (!selectedTypes.length) {
            setPokemons(filteredPokemons[1]);
          } else if (!selectedGenders.length) {
            setPokemons(filteredPokemons[0]);
          } else {
            const result = intersectionBy(
              filteredPokemons[0],
              filteredPokemons[1],
              'name',
            );

            setPokemons(result);
          }
        }
      } catch (error) {
        console.log(error);
        setPokemons([]);
        setError('Something went wrong...');
      } finally {
        setLoading(false);
      }
    };
    if (isFilteredResult) populateData();
  }, [JSON.stringify(selectedGenders), JSON.stringify(selectedTypes)]);

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

      const {data: pokemonDetails} = await axios.get(url);

      const {data: speciesData} = await axios.get(
        `${API_BASE_URL}pokemon-species/${pokemonDetails.id}`,
      );

      const {data: genders} = await axios.get(`${API_BASE_URL}gender`);

      const {data: evolutionChain} = await axios.get(
        speciesData.evolution_chain.url,
      );

      const {data: weaknesses} = await axios.get(
        `${pokemonDetails.types[0].type.url}`,
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

  const searchPokemons = async url => {
    if (searchTerm.trim().length === 0) {
      setPokemons([]);
      fetchPokemons(`${API_BASE_URL}pokemon`);
    } else {
      try {
        setLoading(true);
        setPokemons([]);
        setNextURL('');

        const {data: result} = await axios.get(`${url}/${searchTerm}`);

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

  const getPokemonsByFilter = async (
    filters,
    filterPath,
    baseExtractor,
    extractor,
    unionKey,
  ) => {
    if (filters.length) {
      const pokemonByFilter = await Promise.all(
        filters.map(async filter => {
          const {data} = await axios.get(
            `${API_BASE_URL}${filterPath}/${filter}`,
          );
          return get(data, baseExtractor);
        }),
      );

      const unique = unionBy(...pokemonByFilter, unionKey);

      return (
        await Promise.all(
          unique.map(async (p, i) => {
            const {name} = get(p, extractor);

            const result = await axios
              .get(`${API_BASE_URL}pokemon/${name}`)
              .catch(e => null);

            return result == null ? null : pokemonListItem(result.data);
          }),
        )
      ).filter(x => x !== null);
    } else {
      return [];
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
