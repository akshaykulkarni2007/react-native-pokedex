import React, {createContext, useState} from 'react';
import axios from 'axios';

export const PokemonContext = createContext();

export const PokemonProvider = ({children}) => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState({
    id: '',
    name: '',
    // imageUrl: '',
    attributes: {},
    stats: [],
    evolutionChain: {},
  });
  const [totalCount, setTotalCount] = useState(0);
  const [nextURL, setNextURL] = useState('');
  const [error, setError] = useState(false);

  const fetchPokemons = async url => {
    try {
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
    }
  };

  const fetchPokemonDetails = async url => {
    try {
      const {data: pokemonDetails} = await axios.get(url);

      setPokemonDetails({
        id: pokemonDetails.id,
        name: pokemonDetails.name,
        imageUrl: pokemonDetails.sprites.front_default,
        attributes: {
          height: pokemonDetails.height,
          weight: pokemonDetails.weight,
          gender: '',
          eggGroup: '',
          abilities: pokemonDetails.abilities.map(
            ability => ability.ability.name,
          ),
          types: pokemonDetails.types.map(type => type.type.name),
          weakAgainst: '',
        },
        stats: pokemonDetails.stats.map(stat => ({
          name: stat.stat.name.replace('-', ' '),
          value: stat.base_stat,
        })),
        evolutionChain: {},
      });
    } catch (error) {
      console.log(error);
      setError('Something went wrong...');
    }
  };

  return (
    <PokemonContext.Provider
      value={{
        pokemons,
        pokemonDetails,
        totalCount,
        nextURL,
        error,
        fetchPokemons,
        fetchPokemonDetails,
      }}>
      {children}
    </PokemonContext.Provider>
  );
};
