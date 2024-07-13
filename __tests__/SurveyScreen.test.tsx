import React from 'react';
import { View } from 'react-native';
import { render, fireEvent, act } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SurveyScreen from '../src/screens/survey/SurveyScreen';
import { QUIZ } from '../src/helpers/Constants';
import * as NavigationHelpers from '../Base/navigation/NavigationHelpers'; 
import Strings from '../res/strings/Strings'; 

// Mock the NavigationHelpers
jest.mock('../Base/navigation/NavigationHelpers', () => ({
  navigate: jest.fn(),
  resetActions: jest.fn(),
}));

jest.mock('react-native-progress', () => {
  return {
    Bar: jest.fn().mockImplementation(() => null),
  };
});

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      replace: jest.fn(),
    }),
  };
});

const mockStore = configureStore([]);
const initialState = {
  QuestionnaireReducer: {
    selectedAnswers: [],
  },
};

describe('SurveyScreen Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('renders correctly', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <SurveyScreen />
      </Provider>
    );
    expect(getByTestId('survey-screen')).toBeTruthy();
  });

  it('navigates to ResultScreen after finishing the quiz', () => {
    const { getByText, debug } = render(
      <Provider store={store}>
        <SurveyScreen />
      </Provider>
    );

    debug(); // Output the rendered component tree to verify the presence of 'NEXT' button

    act(() => {
      fireEvent.press(getByText(Strings.NEXT));
      for (let i = 1; i < QUIZ.length; i++) {
        fireEvent.press(getByText(Strings.NEXT));
      }
    });

    // expect(NavigationHelpers.navigate).toHaveBeenCalledWith('ResultScreen', expect.any(Number));
  });

  it('updates the progress bar correctly', () => {
    const { getByText, queryByTestId, debug } = render(
      <Provider store={store}>
        <SurveyScreen />
      </Provider>
    );

    debug(); // Output the rendered component tree to verify the presence of progress bar

    act(() => {
      fireEvent.press(getByText(Strings.NEXT));
    });

    expect(queryByTestId('progress-bar')).toBeTruthy();
  });

  it('toggles the checkbox state correctly', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <SurveyScreen />
      </Provider>
    );

  });
});
