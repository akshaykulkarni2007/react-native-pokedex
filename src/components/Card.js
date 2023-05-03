import {View, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {cardStyles} from './styles';

export const Card = ({image, title, description, bgcolor}) => {
  return (
    <LinearGradient colors={bgcolor} style={cardStyles.container}>
      <Image source={{uri: image}} style={cardStyles.image} />

      <View style={cardStyles.content}>
        <Text style={cardStyles.title}>{title}</Text>
        <Text style={cardStyles.description}>{description}</Text>
      </View>
    </LinearGradient>
  );
};
