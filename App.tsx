import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import NavigationContainer from './Base/navigation/Navigation';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
};

export default App;
