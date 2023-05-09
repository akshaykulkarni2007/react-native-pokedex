import React from 'react';
import {NativeModules} from 'react-native';
import renderer from 'react-test-renderer';
import {render, screen, fireEvent} from '@testing-library/react-native';

import {Spinner, Button, CustomCheckBox, ErrorComponent} from '..';

describe('renders common components correctly', () => {
  test('renders Spinner correctly', () => {
    const tree = renderer.create(<Spinner />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders Button correctly', () => {
    const tree = renderer
      .create(
        <Button type="primary" handlePress={() => {}}>
          Text
        </Button>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders Checkbox correctly', () => {
    const tree = renderer
      .create(
        <CustomCheckBox label="label" checked={[]} setChecked={() => {}} />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders ErrorComponent correctly', () => {
    const tree = renderer.create(<ErrorComponent message="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('toggles checkbox correctly', () => {
    let checked = ['label'];
    const setChecked = () => {
      checked = checked.includes('label') ? [] : ['label'];
    };

    render(
      <CustomCheckBox
        label="label"
        checked={checked}
        setChecked={setChecked}
      />,
    );

    const checkbox = screen.getByTestId('checkbox-label');

    fireEvent(checkbox, 'onValueChange', {nativeEvent: {}});
    expect(checked.length).toBe(0);

    fireEvent(checkbox, 'onValueChange', {nativeEvent: {}});
    expect(checked.length).toBe(1);
  });

  test('calls reload function correctly on ErrorComponent', async () => {
    jest.mock('react-native', () => {
      const RN = jest.requireActual('react-native');

      RN.NativeModules.DevSettings = {
        reload: jest.fn(),
      };

      return RN;
    });

    render(<ErrorComponent message="test" />);

    const button = await screen.findByText('Go to Home');

    fireEvent(button, 'handlePress');
    expect(NativeModules.DevSettings.reload).toBeCalled();
  });
});
