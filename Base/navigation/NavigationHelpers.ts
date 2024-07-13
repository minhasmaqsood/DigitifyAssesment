import {createRef} from 'react';
import {CommonActions} from '@react-navigation/native';

export const navigationRef: any = createRef();

export function navigate(name: any, params = {}) {
  navigationRef.current?.navigate(name, params);
}

export function goBack() {
  if (navigationRef && navigationRef.current) {
    if (navigationRef.current?.canGoBack()) {
      navigationRef.current?.goBack();
    } else {
      navigationRef.current?.navigate('Welcome');
    }
  }
}

export function resetActions(name: any, params = {}) {
  if (navigationRef && navigationRef.current) {
    navigationRef.current?.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: name, params: params}],
      }),
    );
  }
}
