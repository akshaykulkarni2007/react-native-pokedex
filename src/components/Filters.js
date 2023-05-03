import {useContext, useState} from 'react';
import {Text, View, Modal, Pressable, FlatList} from 'react-native';

import {Button, CustomCheckBox} from './common';

import {PokemonContext} from '../context/pokemonContext';

import {filtersStyles} from './styles';

export const Filters = props => {
  const {types, setSelectedTypes, setSelectedGenders} =
    useContext(PokemonContext);

  const [checkedTypes, setCheckedTypes] = useState([]);
  const [checkedGenders, setCheckedGenders] = useState([]);

  const {showFilters, setShowFilters} = props;

  return (
    <Modal animationType="slide" transparent={true} visible={showFilters}>
      <View style={filtersStyles.modalContent}>
        <View style={filtersStyles.modalHeader}>
          <Text style={filtersStyles.modalTitle}>Filters</Text>
          <Pressable
            style={filtersStyles.closeButton}
            onPress={() => setShowFilters(false)}>
            <Text style={filtersStyles.closeButtonText}>X</Text>
          </Pressable>
        </View>

        <View style={filtersStyles.modalBody}>
          <Text style={filtersStyles.filterTitle}>Type</Text>

          <FlatList
            data={types}
            keyExtractor={item => item}
            renderItem={({item}) => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CustomCheckBox
                  label={item}
                  checked={checkedTypes}
                  setChecked={setCheckedTypes}
                />
              </View>
            )}
            numColumns={2}
            style={filtersStyles.typesList}
          />

          <Text style={filtersStyles.filterTitle}>Gender</Text>

          <FlatList
            data={['male', 'female', 'genderless']}
            keyExtractor={item => item}
            renderItem={({item}) => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CustomCheckBox
                  label={item}
                  checked={checkedGenders}
                  setChecked={setCheckedGenders}
                />
              </View>
            )}
            numColumns={2}
            style={filtersStyles.genderList}
          />
        </View>

        <View style={filtersStyles.modalFooter}>
          <Button
            type="primary"
            handlePress={() => {
              setSelectedTypes([]);
              setSelectedGenders([]);
              setShowFilters(false);
            }}
            style={filtersStyles.actionButton}>
            Reset
          </Button>
          <Button
            type="dark"
            handlePress={() => {
              setSelectedTypes([...checkedTypes]);
              setSelectedGenders([...checkedGenders]);
              setShowFilters(false);
            }}
            style={filtersStyles.actionButton}>
            Apply
          </Button>
        </View>
      </View>
    </Modal>
  );
};
