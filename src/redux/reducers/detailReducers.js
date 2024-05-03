import { createSlice } from "@reduxjs/toolkit";

const initialState ={
data: null,
loading:true,
error:null,
random:null
};

export const mealDetailSlice = createSlice({
  name: "mealDetail",
  initialState,
  reducers: {
    setMealDetail: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setRandomMeal: (state, action) => {
      state.random = action.payload;
      state.loading = false;
      state.error = null;
    }
  },
});

export const { setMealDetail, setLoading, setError, setRandomMeal } = mealDetailSlice.actions;
export default mealDetailSlice.reducer;

