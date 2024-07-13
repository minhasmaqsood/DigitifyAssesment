import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import SurveyScreen from '../src/screens/survey/SurveyScreen';
import SplashScreen from '../src/screens/splash/Splash';
import ResultScreen from '../src/screens/result/ResultScreen';
import {QUIZ} from '../src/helpers/Constants';
import * as NavigationHelpers from '../Base/navigation/NavigationHelpers';
import Strings from '../res/strings/Strings';
import {resetSelectedAnswers} from '../src/redux/reducers/SurveyReducer';

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

// Mock the useNavigation hook
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      replace: jest.fn(),
    }),
  };
});

const mockStore = configureStore([]);
const initialState = {
  SurveyReducer: {
    selectedAnswers: [],
  },
};

describe('App Component Snapshots', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('SurveyScreen renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <SurveyScreen />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('SplashScreen renders correctly', () => {
    const navigation = {replace: jest.fn()};
    const tree = renderer
      .create(<SplashScreen navigation={navigation} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('ResultScreen renders correctly', () => {
    const route = {params: 15};
    const tree = renderer
      .create(
        <Provider store={store}>
          <ResultScreen route={route} />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('SurveyScreen Functionality', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('navigates to ResultScreen after finishing the quiz', () => {
    const {getByText, debug} = render(
      <Provider store={store}>
        <SurveyScreen />
      </Provider>,
    );

    debug();

    act(() => {
      fireEvent.press(getByText(Strings.NEXT));
      for (let i = 1; i < QUIZ.length; i++) {
        fireEvent.press(getByText(Strings.NEXT));
      }
    });
  });

  it('updates the progress bar correctly', () => {
    const {getByText, queryByTestId, debug} = render(
      <Provider store={store}>
        <SurveyScreen />
      </Provider>,
    );

    debug(); // Output the rendered component tree to verify the presence of progress bar

    act(() => {
      fireEvent.press(getByText(Strings.NEXT));
    });

    expect(queryByTestId('progress-bar')).toBeTruthy();
  });
});

describe('ResultScreen Functionality', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('handles the "Restart" button correctly', () => {
    const {getByText} = render(
      <Provider store={store}>
        <ResultScreen route={{params: 15}} />
      </Provider>,
    );

    fireEvent.press(getByText(Strings.RESTART));

    expect(NavigationHelpers.resetActions).toHaveBeenCalledWith('SurveyScreen');
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
