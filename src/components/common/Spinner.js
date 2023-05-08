import {ActivityIndicator, View} from 'react-native';

import {COLORS} from '../../constants';

import {spinnerStyles} from './styles';

export const Spinner = () => (
  <View style={spinnerStyles.container}>
    <ActivityIndicator size={'large'} color={COLORS.GRAY} />
  </View>
);
