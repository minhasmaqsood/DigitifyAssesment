import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Field from '../../components/Field';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedAnswers } from '../../redux/reducers/QuestionnaireReducer';
import { QUIZ } from '../../helpers/Constants';
import * as NavigationHelpers from '../../../Base/navigation/NavigationHelpers';
import Strings from '../../../res/strings/Strings';
import * as Progress from 'react-native-progress';
import colors from '../../../res/typography/colors';

const SurveyScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedAnswers } = useSelector((state: any) => state?.QuestionnaireReducer);
  const [ index, setIndex ] = useState<number>(0);
  const { width } = useWindowDimensions();
  const carouselReference = useRef<any>(null);

  const renderField = ({ item }: any) => (
    <View style={{ minHeight: 550 }}>
      <Field
        key={item?.name}
        options={item?.options}
        question={item?.question}
        onChange={(value: any) => handleValues(value)}
        selectedValues={[]}
      />
    </View>
  );

  const handleValues = (value: string[]) => {
    let newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers.push(value[0]);
    dispatch(setSelectedAnswers(newSelectedAnswers));
  };

  const createResult = () => {
    let totalScore = 0;
    selectedAnswers.forEach((choice: string, index: number) => {
      const question = QUIZ[index];
      const choiceIndex = question?.options?.indexOf(choice);
      if (choiceIndex !== -1) {
        totalScore += question?.scores[choiceIndex];
      }
    });
    NavigationHelpers.navigate('ResultScreen', totalScore);
  };

  const onPressNext = () => {
    if (index === QUIZ.length - 1) {
      createResult();
    } else {
      carouselReference?.current?.snapToNext();
    }
  }

  return (
    <View style={styles.container} testID="survey-screen">
      <StatusBar barStyle="dark-content" />
      <View style={styles.header} />
      <View style={styles.progress} testID="progress-bar">
        <Progress.Bar
          progress={index / (QUIZ.length - 1)}
          width={width - 40}
          height={4}
          borderRadius={0}
          color={colors.orange}
          borderColor={'transparent'}
          unfilledColor={'lightgray'}
        />
      </View>
      <Carousel
        ref={carouselReference}
        layout={'default'}
        data={QUIZ}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderField}
        lockScrollWhileSnapping={true}
        scrollEnabled={false}
        useScrollView={true}
        onSnapToItem={index => setIndex(index)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={onPressNext}
        >
          <Text style={styles.nextButtonText}>
            {index === QUIZ.length - 1 ? Strings.FINISH : Strings.NEXT}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerText: {
    color: colors.headerText,
    fontSize: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.white,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: colors.black,
  },
  nextButton: {
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  nextButtonText: {
    fontSize: 18,
    color: colors.white,
  },
  header: {
    backgroundColor: colors.orange,
    height: 100,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  progress: {
    marginTop: 35,
    marginHorizontal: 20,
    alignSelf: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  }
});

export default SurveyScreen;
