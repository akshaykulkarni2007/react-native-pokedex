import {Text, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import {checkboxStyles} from './styles';

export const CustomCheckBox = ({label, checked, setChecked}) => {
  return (
    <View style={checkboxStyles.checkboxContainer}>
      <CheckBox
        value={checked.includes(label)}
        onValueChange={val =>
          setChecked(
            checked.includes(label)
              ? checked.filter(c => c !== label)
              : [...checked, label],
          )
        }
        style={checkboxStyles.checkbox}
      />
      <Text style={checkboxStyles.label}>{label}</Text>
    </View>
  );
};
