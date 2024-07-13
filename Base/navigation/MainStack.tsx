import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SurveyScreen from '../../src/screens/survey/SurveyScreen';
import ResultScreen from '../../src/screens/result/ResultScreen';
import SplashScreen from '../../src/screens/splash/Splash';

// Define the type for the params passed to the component
type AppNavigatorProps = {};

const MainStack = createStackNavigator();

const Navigator: FC<AppNavigatorProps> = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Splash" component={SplashScreen} />
      <MainStack.Screen name="SurveyScreen" component={SurveyScreen} />
      <MainStack.Screen name="ResultScreen" component={ResultScreen} />
    </MainStack.Navigator>
  );
};

export default Navigator;
