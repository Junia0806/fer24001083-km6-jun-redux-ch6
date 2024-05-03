import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  setCategories: [],
  loading:true,
  meals: [],
};

export const categoriSlice = createSlice({
  name: 'categori',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.setCategories = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setMeals: (state, action) => {
      state.meals = action.payload;
      state.loading = false;
    },
 
  },
});

export const { setMeals, setCategories, setLoading} = categoriSlice.actions;

export default categoriSlice.reducer;
