import {createSlice} from '@reduxjs/toolkit';

interface initialState {
  selectedAnswers: [];
}

const initialState: initialState = {
  selectedAnswers: [],
};

export const SurveyReducer = createSlice({
  name: 'SurveyReducer',
  initialState,
  reducers: {
    setSelectedAnswers: (state, action) => {
      state.selectedAnswers = action.payload;
    },
    resetSelectedAnswers: state => {
      state.selectedAnswers = [];
    },
  },
});

export const {setSelectedAnswers, resetSelectedAnswers} = SurveyReducer.actions;

export default SurveyReducer.reducer;
