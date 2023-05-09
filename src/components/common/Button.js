import {Pressable, Text} from 'react-native';

import {buttonStyles} from './styles';

export const Button = props => {
  const {type = primary, children, handlePress, style} = props;

  return (
    <Pressable
      style={[buttonStyles.button, buttonStyles[type], style]}
      onPress={handlePress}>
      <Text style={[buttonStyles.label, buttonStyles[`${type}Label`]]}>
        {children}
      </Text>
    </Pressable>
  );
};
