import {View, Text, Image} from 'react-native';

import {cardStyles} from './styles';

export const Card = ({image, title, description, bgcolor}) => {
  console.log(image);
  return (
    <View style={[cardStyles.container, bgcolor]}>
      {/* <Image source={{uri: image}} style={cardStyles.image} /> */}

      <View style={cardStyles.content}>
        <Text style={cardStyles.title}>{title}</Text>
        <Text style={cardStyles.description}>{description}</Text>
      </View>
    </View>
  );
};
