import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  meals: [],
  errorMessage: '',
  selectedLetter: '',
};

export const alphabetSlice = createSlice({
  name: 'alphabet',
  initialState,
  reducers: {
    setMeals: (state, action) => {
      state.meals = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setSelectedLetter: (state, action) => {
      state.selectedLetter = action.payload;
    },
  },
});

export const { setMeals, setErrorMessage, setSelectedLetter} = alphabetSlice.actions;

export default alphabetSlice.reducer;
