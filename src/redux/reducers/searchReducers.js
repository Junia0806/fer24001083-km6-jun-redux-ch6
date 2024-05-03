import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResults: [],
  loading: true,
  // searchTerm: "beef"
  searchTerm: ""
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
      state.loading = false;
      
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSearchTerm: (state,action) => {
      state.searchTerm = action.payload;
    },
  }
});

export const {setSearchResults, setSearchPerformed, setSearchTerm} = searchSlice.actions;
export default searchSlice.reducer;
