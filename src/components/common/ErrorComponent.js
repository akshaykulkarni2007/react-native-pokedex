import {View, Text, NativeModules} from 'react-native';

import {Button} from './Button';


import {errorStyles} from './styles';

export const ErrorComponent = ({message}) => (
  <View style={errorStyles.container}>
    <Text style={errorStyles.message}>{message}</Text>
    <Button
      type="primary"
      handlePress={() => NativeModules.DevSettings.reload()}>
      Go to Home
    </Button>
  </View>
);
