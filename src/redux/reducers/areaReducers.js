import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  areas: [],
  meals: [],
  areaMealThumbs: {},
  loading: true,
  error: null,
};

const areaSlice = createSlice({
  name: 'area',
  initialState,
  reducers: {
    setAreas: (state, action) => {
      state.areas = action.payload;
      state.loading = false;
    },
    setMeals: (state, action) => {
      state.meals = action.payload;
    },
    setAreaMealThumbs: (state, action) => {
      state.areaMealThumbs = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setAreas, setMeals, setAreaMealThumbs, setLoading, setError } = areaSlice.actions;

export default areaSlice.reducer;
