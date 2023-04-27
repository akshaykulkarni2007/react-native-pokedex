import {ActivityIndicator, View} from 'react-native';

import {COLORS} from '../../constants';

export const Spinner = () => (
  <ActivityIndicator size={'large'} color={COLORS.GRAY} />
);
