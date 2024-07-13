import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import ResultScreen from '../src/screens/result/ResultScreen';
import {resetSelectedAnswers} from '../src/redux/reducers/SurveyReducer';
import {resetActions} from '../Base/navigation/NavigationHelpers';
import Strings from '../res/strings/Strings';

jest.mock('../Base/navigation/NavigationHelpers', () => ({
  navigate: jest.fn(),
  resetActions: jest.fn(),
}));

const mockStore = configureStore([]);
const initialState = {};

describe('ResultScreen', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('renders correctly with the given score', () => {
    const {getByText} = render(
      <Provider store={store}>
        <ResultScreen route={{params: 15}} />
      </Provider>,
    );

    expect(getByText('15')).toBeTruthy();
    expect(getByText('Conservative')).toBeTruthy();
  });

  it('handles the "Restart" button correctly', () => {
    const {getByText} = render(
      <Provider store={store}>
        <ResultScreen route={{params: 15}} />
      </Provider>,
    );

    fireEvent.press(getByText(Strings.RESTART));

    expect(resetActions).toHaveBeenCalledWith('SurveyScreen');
    expect(store.getActions()).toContainEqual(resetSelectedAnswers());
  });

  it('determines the correct risk profile based on score', () => {
    const {getByText, rerender, debug} = render(
      <Provider store={store}>
        <ResultScreen route={{params: 15}} />
      </Provider>,
    );

    expect(getByText('Conservative')).toBeTruthy();
  });
});
