import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './NavigationHelpers';
import Navigator from './MainStack';

const ApplicationNavigator = () => {

  return (
      <NavigationContainer ref={navigationRef}>
        <Navigator />
      </NavigationContainer>
  );
};

export default ApplicationNavigator;
