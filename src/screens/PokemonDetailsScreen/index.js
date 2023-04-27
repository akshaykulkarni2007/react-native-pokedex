import {View, Text} from 'react-native';

export const PokemonDetailsScreen = ({route, navigation}) => {
  const {id} = route.params;
  return (
    <View>
      <Text>Details for {id}</Text>
    </View>
  );
};
