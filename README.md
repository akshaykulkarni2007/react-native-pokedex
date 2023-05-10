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

For better readability and clarity, context has been divided in 3 files:

- `pokemonContext.js`: main file exporting logic and context provider
- `pokemonUtils.js`: small, reusable util functions
- `pokemonRepository.js`: reusable functions for HTTP calls with `axios`

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
- React Native testing library: `@testing-library/react-native`
- Test runner: `jest`

## Testing

---

All components are tested with snapshot testing for UI stability and reliability.
Context and other functions have been tested with unit testing with jest, ract-native-testing-library.

**Overall Coverage**: 85.65%

### Coverage report

| File                             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s          |
| -------------------------------- | ------- | -------- | ------- | ------- | -------------------------- |
| All files                        | 85.65   | 62.06    | 88.88   | 85.13   |
| src                              | 100     | 100      | 100     | 100     |
| constants.js                     | 100     | 100      | 100     | 100     |
| src/assets/images                | 100     | 100      | 100     | 100     |
| filter.png                       | 100     | 100      | 100     | 100     |
| search.png                       | 100     | 100      | 100     | 100     |
| src/components                   | 100     | 100      | 100     | 100     |
| Card.js                          | 100     | 100      | 100     | 100     |
| Filters.js                       | 100     | 100      | 100     | 100     |
| PokemonEmptyList.js              | 100     | 100      | 100     | 100     |
| PokemonListHeader.js             | 100     | 100      | 100     | 100     |
| index.js                         | 0       | 0        | 0       | 0       |
| styles.js                        | 100     | 100      | 100     | 100     |
| src/components/common            | 100     | 66.66    | 100     | 100     |
| Button.js                        | 100     | 0        | 100     | 100     | 6                          |
| Checkbox.js                      | 100     | 100      | 100     | 100     |
| ErrorComponent.js                | 100     | 100      | 100     | 100     |
| Spinner.js                       | 100     | 100      | 100     | 100     |
| index.js                         | 0       | 0        | 0       | 0       |
| styles.js                        | 100     | 100      | 100     | 100     |
| src/context                      | 75.78   | 48.14    | 74.19   | 75.2    |
| contextUtils.js                  | 100     | 75       | 100     | 100     | 34                         |
| pokemonContext.js                | 70.47   | 43.47    | 60      | 69.9    | 43,105-107,129-165,184-200 |
| pokemonRepository.js             | 100     | 100      | 100     | 100     |
| src/screens/PokemonDetailsScreen | 100     | 85.71    | 100     | 100     |
| index.js                         | 100     | 85.71    | 100     | 100     | 46-61                      |
| styles.js                        | 100     | 100      | 100     | 100     |
| src/screens/PokemonListingScreen | 92      | 64.28    | 100     | 91.66   |
| index.js                         | 92      | 64.28    | 100     | 91.66   | 39-40                      |
| styles.js                        | 0       | 0        | 0       | 0       |

## TODO and Improvements

---

- More intuitive UI
- Move parts of components into more concise components
