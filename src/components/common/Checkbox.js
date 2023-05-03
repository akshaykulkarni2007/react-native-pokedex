import React, {useState} from 'react';
import {Text, View} from 'react-native';

import {checkboxStyles} from './styles';

export const CustomCheckBox = ({label, name}) => {
  const [isSelected, setSelection] = useState(false);

  return (
    <View style={checkboxStyles.container}>
      {/* <View style={checkboxStyles.checkboxContainer}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={checkboxStyles.checkbox}
        />
        <Text style={checkboxStyles.label}>{label}</Text>
      </View> */}
      <Text>Is CheckBox selected: {isSelected ? '👍' : '👎'}</Text>
    </View>
  );
};
