import React, {useEffect} from 'react';
import {View, Image, StyleSheet, StatusBar} from 'react-native';

const SplashScreen: React.FC = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation?.replace('SurveyScreen');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={'transparent'}
      />
      <Image
        source={require('../../../res/images/background.jpg')}
        style={styles.image}
        testID="splash-screen-image"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default SplashScreen;
