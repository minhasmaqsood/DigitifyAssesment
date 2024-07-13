import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {QUIZ} from '../../helpers/Constants';
import Strings from '../../../res/strings/Strings';
import {resetActions} from '../../../Base/navigation/NavigationHelpers';
import {useDispatch} from 'react-redux';
import {resetSelectedAnswers} from '../../redux/reducers/SurveyReducer';
import colors from '../../../res/typography/colors';

interface ResultScreenProps {
  route: {
    params: number;
  };
}

const ResultScreen: React.FC<ResultScreenProps> = ({route}) => {
  const dispatch = useDispatch();
  const totalScore = route?.params;

  const determineRiskProfile = (score: number): string => {
    // Calculate the minimum and maximum possible scores
    const minScore = QUIZ.reduce(
      (sum, question) => sum + Math.min(...question.scores),
      0,
    );
    const maxScore = QUIZ.reduce(
      (sum, question) => sum + Math.max(...question.scores),
      0,
    );

    // Define the ranges dynamically
    const rangeStep = (maxScore - minScore) / 3;
    const ranges = [
      {upperLimit: minScore + rangeStep, riskProfile: 'Conservative'},
      {upperLimit: minScore + 2 * rangeStep, riskProfile: 'Balanced'},
      {upperLimit: maxScore, riskProfile: 'Aggressive'},
    ];

    // Find the appropriate risk profile based on the score
    for (let i = 0; i < ranges.length; i++) {
      if (score <= ranges[i].upperLimit) {
        return ranges[i].riskProfile;
      }
    }

    // Default return (should never reach here if ranges are set correctly)
    return 'Unknown';
  };

  return (
    <ImageBackground
      source={require('../../../res/images/background.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.spacing}>
        <Text style={styles.yourScore}>{totalScore}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.feedbackTitle}>
            {determineRiskProfile(totalScore)}
          </Text>
          <Text style={{}}>{Strings.DESCRIPTION}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
              resetActions('SurveyScreen');
              dispatch(resetSelectedAnswers());
            }}>
            <Text style={styles.nextButtonText}>{Strings.RESTART}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  spacing: {
    flex: 1,
    justifyContent: 'center',
  },
  yourScore: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'orange',
  },
  textContainer: {
    flexShrink: 1,
    marginHorizontal: 10,
    marginBottom: 20,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  feedbackTitle: {
    color: colors.grayColor,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
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
    fontWeight: '500',
    color: colors.white,
  },
  buttonContainer: {position: 'absolute', bottom: 10, right: 10},
});

export default ResultScreen;
