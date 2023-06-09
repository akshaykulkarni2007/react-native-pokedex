import {useState, useEffect, useContext} from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';

import {
  Card,
  PokemonListHeader,
  PokemonEmptyList,
  Filters,
  Spinner,
  ErrorComponent,
} from '../../components';

import {PokemonContext} from '../../context/pokemonContext';
import {API_BASE_URL, SCREEN_NAMES, POKEMON_COLORS} from '../../constants';

import styles from './styles';

export const PokemonListingScreen = ({navigation}) => {
  const {pokemons, fetchPokemons, nextURL, loading, error, getAlltyps} =
    useContext(PokemonContext);

  const [hasScrolled, setHasScrolled] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchInitalData();
    getAlltyps();
  }, []);

  const fetchInitalData = async () => {
    fetchPokemons(`${API_BASE_URL}pokemon`);
  };

  const handleLoadMore = async () => {
    if (!hasScrolled) {
      return null;
    }

    if (nextURL) {
      fetchPokemons(nextURL);
    }
  };

  if (error) {
    return <ErrorComponent message={error} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={pokemons}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            const gradient = item?.types?.map(type => POKEMON_COLORS[type]);

            if (gradient?.length === 1) {
              gradient.push(gradient[0]);
            }

            return (
              <Pressable
                onPress={() =>
                  navigation.navigate(SCREEN_NAMES.POKEMON_DETAILS, {
                    id: item.id,
                    name: item.name,
                  })
                }
                style={styles.navButton}
                testID={`card-${item.id}`}>
                <Card
                  title={item.name}
                  image={item.imageUrl}
                  description={`${item.id}`.padStart(3, '0')}
                  bgcolor={gradient}
                />
              </Pressable>
            );
          }}
          ListEmptyComponent={!loading && <PokemonEmptyList />}
          ListHeaderComponent={
            !pokemons.length && loading ? (
              <Spinner />
            ) : (
              <PokemonListHeader setShowFilters={setShowFilters} />
            )
          }
          numColumns={2}
          columnWrapperStyle={styles.cardColumnWrapperStyle}
          onEndReached={handleLoadMore}
          onScroll={() => setHasScrolled(true)}
          testID="pokemonlist"
        />
      </View>

      <Filters showFilters={showFilters} setShowFilters={setShowFilters} />
    </View>
  );
};
