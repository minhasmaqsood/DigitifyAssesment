import { createSlice } from '@reduxjs/toolkit';

interface initialState {
  selectedAnswers:[]
}

const initialState: initialState = {
  selectedAnswers:[]
};


export const QuestionnaireReducer = createSlice({
  name: 'QuestionnaireReducer',
  initialState,
  reducers: {
    setSelectedAnswers:(state, action) => {
      state.selectedAnswers = action.payload;
    },
    resetSelectedAnswers: (state) => {
      state.selectedAnswers = [];
    },
  },
});

export const { setSelectedAnswers ,resetSelectedAnswers} = QuestionnaireReducer.actions;

export default QuestionnaireReducer.reducer;
