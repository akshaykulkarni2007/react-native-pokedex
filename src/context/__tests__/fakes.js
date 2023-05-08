export const mockPokemonItem = {
  id: 1,
  name: 'lowerPokemonName',
  imageUrl: 'image',
  types: ['LOWERNAME'],
};

export const pokemonResponse = {
  id: 1,
  name: 'lowerPokemonName',
  sprites: {
    front_default: 'image',
  },
  types: [
    {
      type: {
        name: 'lowerName',
      },
    },
  ],
};

export const mockTypeReponse = {
  pokemon: [
    {
      pokemon: {
        name: 'pidgey',
        url: 'https://pokeapi.co/api/v2/pokemon/16/',
      },
    },
    {
      pokemon: {
        name: 'pidgeotto',
        url: 'https://pokeapi.co/api/v2/pokemon/17/',
      },
    },
    {
      pokemon: {
        name: 'pidgeot',
        url: 'https://pokeapi.co/api/v2/pokemon/18/',
      },
    },
    {
      pokemon: {
        name: 'rattata',
        url: 'https://pokeapi.co/api/v2/pokemon/19/',
      },
    },
  ],
};

export const mockPokemonResponse = {
  url: 'https://pokeapi.co/api/v2/pokemon/16/',
  ...pokemonResponse,
};

export const typeFilters = ['ghost', 'rock'];
export const genderFilters = ['male'];

export const successRespose = {success: true}
export const errorRespose = {success: false}