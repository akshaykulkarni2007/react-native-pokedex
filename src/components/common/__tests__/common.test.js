import React from 'react';
import renderer from 'react-test-renderer';

import {Spinner, Button, CustomCheckBox} from '..';

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
});
