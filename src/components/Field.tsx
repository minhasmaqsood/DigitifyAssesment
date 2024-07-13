import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import colors from '../../res/typography/colors';
import CheckBox from 'react-native-check-box';


export type selectedOptionType = {
  [index: string]: boolean;
};
export type FieldProps = {
  question?: string;
  options: string[];
  selectedValues: string[];
  onChange: (value: null | string[]) => void;
};

const Field = ({
  question,
  options,
  selectedValues,
  onChange,
}: FieldProps) => {
  const [selectedOption, setSelectedOption] = useState<selectedOptionType>({});

  useEffect(() => {
    // Initialize temporary object to hold selection state
    let valueSelectorTmp: selectedOptionType = {};

    // Initialize all options to false initially
    options.forEach((choice: string) => {
      valueSelectorTmp[choice] = false;
    });

    // Mark selected values as true
    selectedValues.forEach((choice: string) => {
      valueSelectorTmp[choice] = true;
    });

    // Update state with the temporary object
    setSelectedOption(valueSelectorTmp);
  }, []);

  const onOptionPress = (option: string) => {
    // Initialize temporary object to hold selection state
    let valueSelectorTmp: selectedOptionType = {};

    // Initialize all options to false initially
    options.forEach((choice: string) => {
      valueSelectorTmp[choice] = false;
    });

    // If the current option is already selected
    if (selectedOption[option]) {
      // Clear selection
      onChange([]);
      setSelectedOption(valueSelectorTmp); // Reset all options to false
    } else {
      // Select the current option
      onChange([option]);
      setSelectedOption({
        ...valueSelectorTmp,
        [option]: true, // Set only the current option to true
      });
    }
  }

  return (
    <View>
      {question && (
        <Text style={styles.question}>
          {question}
        </Text>
      )}
      {
        options?.map((option: string, idx: number) => {
          return (
            <View key={idx}>

              <View
                style={{
                  ...styles.chip
                }}
              >
                <CheckBox
                  style={styles.checkbox}
                  onClick={() => onOptionPress(option)}
                  isChecked={selectedOption[option]}
                  checkBoxColor={selectedOption[option] ? colors.orange : colors.grayColor}
                  testID="checkbox"

                />
                <View style={styles.questionContainer}>
                  <Text style={[styles.questionText, { color: selectedOption[option] ? colors.orange : colors.grayColor }]}>
                    {option}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
    </View>
  );
};
const styles = StyleSheet.create({
  question: {
    fontWeight: 'bold',
    marginBottom: 24,
    marginTop: 25,
    marginHorizontal: 20,
    fontSize: 17

  },
  chip: {
    // backgroundColor: 'white',
    // justifyContent: 'center',
    alignItems: 'center',
    // shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // elevation: 5,
    // borderWidth: 1,
    // marginBottom: 16,
    marginHorizontal: 15,
    minHeight: 50,
    borderRadius: 6,
    flexDirection: 'row'

  },
  questionContainer: {
    flexShrink: 1,
    marginHorizontal: 5,
  },
  questionText: {
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'center',
    fontSize: 15
  },
  checkbox:
  {
    marginRight: 20
  }
});

export default Field;