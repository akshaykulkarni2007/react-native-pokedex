# React Native Capstone Project: Pokemon API (Pokedex)

## Summary

---

This project created with React Native consists of 2 screens:

- Pokemon listing
- Pokemon details

## About

---

This project utilizes [Pokemon API](https://pokeapi.co/docs) to display pokemon information (Pokedex).

The listing page, which is the homepage of the app, lists all the Pokemons. It allows users to search and filter through the list.

### Search

- Search by name: enter full name of Pokemon
- Search by pokedex ID: enter valid ID

### Filter

- Filter by type: filter Pokemons by their types. Multiple types are selectable and result will consist of all the Pokemons belonging to any of the selected type
- Filter by gender: select gender to see Pokemons of that gender. Multiple options are selectable and result will constst of all the Pokemons of selected genders

Search can be triggerred by pressing search on the virtual keyboard or tapping the search icon in the search input.

Filters are applied when "Apply" button at the bottom is tapped.

All the "types" and "genders" filters are reset when "Reset" button at the bottom is tapped. Resetting filters will display complete list of Pokemons in order again.

### The list

List displays each Pokemon in a card. Card has gradient background color based on one or more types the Pokemon belongs to. Each card shows image, name and Pokedex ID of the Pokemon.

Clicking on this card will take to details screen, where more details are displayed.

### The details

When user taps on any Pokemon on home/listing screen, they are redirected to details screen. This screen displays following information:

- Image
- Name
- Description
- Physical attributes:

  - Height
  - Weight
  - Gender
  - Egg group
  - Abilities
  - Yypes
  - Weakness

- Stats:

  - HP
  - Attack
  - Defence
  - Speed
  - Special attack
  - special defense

- Evolution chain

This page also has two buttons at the bottom to navigate to previous and next Pokemon in the Pokedex. Buttons are labeled as name of respective Pokemon.

## Architecture Overview

---

### Folder structure

All the code is contained in `src` folder at root level.

- Images: `src/assets/images/`
- Reusable components: `src/components/`
- UI and common components: `src/components/common`
- Screens: `src/screens/`
- Routes: `src/routes/`
- context: `src/context/pokemonContext.js`
- Constants: `src/constants.js`

The `App.js` renders the app with `pokemonContext` wrapped around it. The routes come from `/routes/index.js`, which is wrapoed by `NavigationContainer` and contains the stack navigator.

App is bootstrapped in `index.js` at root.

An `index.js` is created at each level to export all the modules from the enclosing folder as named exports. This makes it possible to import modules situated deeper in the strucutre from top level directory.

## State Management

---

React Context API is utilized for state management.

The context provides following properties:

### Properties

- `pokemons`: All the pokemons to be rendered on home/listing screen
- `pokemonDetails`: Details to be rendred on details screen
- `selectedTypes`: Pokemon types selected for filters
- `selectedGenders`: Pokemon genders selected for filters
- `isFilteredResult`: Mark if list is of filtered items
- `searchTerm`: Search query for Pokemon
- `totalCount`: Total number of Pokemons recieved from the API
- `types`: List of all types of Pokemons
- `nextURL`: next URL to use to get next items in the list
- `loading`: loading status to display spinner
- `error`: error status

### Methods

- `getAlltyps`: get all types of Pokemons to display in filter component. Sets the `types` state.

```ts
getAlltyps: () => void
```

- `setSelectedTypes`: Set the selected types from the filter

```ts
setSelectedTypes: (types: string[]) => void
```

- `setSelectedGenders`: Set the selected genders from the filter

```ts
setSelectedGenders: (genders: string[]) => void
```

- `fetchPokemons`: fetch list of Pokemons from API and set the `pokemons` state

```ts
fetchPokemons: (url: string, limit: number) => void
```

- `fetchPokemonDetails`: fetch details of selected Pokemon from API and set the `pokemonDetails` state

```ts
fetchPokemonDetails: (url: string) => void
```

- `searchPokemons`: get Pokemon from search criteria, name or ID of Pokemon and set `pokemons` state

```ts
searchPokemons: (url: string, query: string) => void
```

- `getPokemonsByFilter`: Trigger Pokemon filtering with selected gender and/or type

```ts
getPokemonsByFilter: (filters: string ,filterPath: string, baseExtractor: string, extractor: string) => void
```

- `setSearchTerm`: Set the search query

```ts
setSearchTerm: (query: string) => void
```

In addition, context also has a method `getPokemonsByTypes` which is called when `selectedTypes` is changed. It fetches Pokemons of selected types and sets the `pokemons` state.

```ts
getPokemonsByTypes: () => void
```

## Libraties Used

---

- Navigation: `@react-navigation/native` and `@react-navigation/stack`
- HTTP: `axios`
- Checkbox: `@react-native-community/checkbox`
- Gradient background: `react-native-linear-gradient`
- Test Renderer: `react-test-renderer`
- Test runner: `jest`

## TODO and Improvements

---

- More functional testing
- More intuitive UI
- Move parts of components into more concise components
