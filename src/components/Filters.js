import {Text, View, Modal, Pressable, ScrollView} from 'react-native';

import {Button, CustomCheckBox} from './common';

import {filtersStyles} from './styles';

export const Filters = props => {
  const {selectedFilters, showFilters, setShowFilters} = props;

  return (
    <View style={filtersStyles.filterContainer}>
      <Modal animationType="slide" transparent={true} visible={showFilters}>
        <View style={filtersStyles.modalContent}>
          <View style={filtersStyles.modalHeader}>
            <Text style={filtersStyles.modalTitle}>Filters</Text>
            <Pressable
              style={filtersStyles.closeButton}
              onPress={() => setShowFilters(!showFilters)}>
              <Text style={filtersStyles.closeButtonText}>X</Text>
            </Pressable>
          </View>

          <ScrollView style={filtersStyles.modalBody}>
            <CustomCheckBox label={'test'} />
          </ScrollView>

          <View style={filtersStyles.modalFooter}>
            <Button
              type="primary"
              handlePrss={() => {}}
              style={filtersStyles.actionButton}>
              Reset
            </Button>
            <Button
              type="dark"
              handlePrss={() => {}}
              style={filtersStyles.actionButton}>
              Apply
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};
