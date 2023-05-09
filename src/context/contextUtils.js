import {get, unionBy} from 'lodash';

import {fetchPokemonsByFilter, fetchPokemonDetails} from './pokemonRepository';

const pokemonListItem = ({id, name, sprites, types}) => {
  return {
    id,
    name,
    imageUrl: sprites.front_default,
    types: types.map(type => type.type.name.toUpperCase()),
  };
};

const getPokemonsByFilter = async (
  filters,
  filterPath,
  baseExtractor,
  extractor,
) => {
  if (filters.length) {
    const pokemonByFilter = await Promise.all(
      filters.map(async filter => {
        const {data} = await fetchPokemonsByFilter(filterPath, filter);
        return get(data, baseExtractor);
      }),
    );

    const unique = unionBy(...pokemonByFilter, `${extractor}.name`);

    return (
      await Promise.all(
        unique.map(async p => {
          const result = await fetchPokemonDetails(get(p, `${extractor}.name`));
          return result == null ? null : pokemonListItem(result.data);
        }),
      )
    ).filter(x => x !== null);
  } else {
    return [];
  }
};

export {getPokemonsByFilter, pokemonListItem};
