import {useState, useEffect, useContext} from 'react';
import {View, Text, FlatList, Pressable, TextInput, Image} from 'react-native';

import {Card, Filters} from '../../components';

import {PokemonContext} from '../../context/pokemonContext';
import {API_BASE_URL, SCREEN_NAMES} from '../../constants';

import styles from './styles';

export const PokemonListingScreen = ({navigation}) => {
  const {pokemons, fetchPokemons, nextURL, error, getAlltyps} =
    useContext(PokemonContext);

  const [hasScrolled, setHasScrolled] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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

  const ListHeader = () => (
    <>
      <Text style={styles.title}>Pokedex</Text>
      <Text style={styles.subtitle}>
        Search for any pokemon that exists on the planet
      </Text>

      <View style={styles.filterContainer}>
        <TextInput
          placeholder="Name or Number"
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={val => setSearchTerm(val)}
        />

        <Pressable
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}>
          <Image
            source={require('../../assets/images/filter.png')}
            style={styles.filterIcon}
          />
        </Pressable>
      </View>
    </>
  );

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={pokemons}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Pressable
              onPress={() =>
                navigation.navigate(SCREEN_NAMES.POKEMON_DETAILS, {
                  id: item.id,
                  name: item.name,
                })
              }
              style={styles.navButton}>
              <Card
                title={item.name}
                image={item.imageUrl}
                description={`${item.id}`.padStart(3, '0')}
                // bgcolor={{backgroundColor: 'red'}}
              />
            </Pressable>
          )}
          ListHeaderComponent={ListHeader}
          numColumns={2}
          columnWrapperStyle={styles.cardColumnWrapperStyle}
          onEndReached={handleLoadMore}
          onScroll={() => setHasScrolled(true)}
          onEndThreshold={50}
        />
      </View>

      <Filters showFilters={showFilters} setShowFilters={setShowFilters} />
    </View>
  );
};
