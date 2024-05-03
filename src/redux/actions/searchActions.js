import {
  setSearchResults,
} from "../reducers/searchReducers";
import axios from "axios";

export const searchRecipes = (searchTerm) => async (dispatch) => {
  const encodedSearchTerm = encodeURIComponent(searchTerm.trim());
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodedSearchTerm}`;
  try {
    const response = await axios.get(url);
    if (response.data.meals === null) {
      setSearchResults([]);
      dispatch(setSearchResults([]));
    } else {
      dispatch(setSearchResults(response.data.meals));
    }
  } catch (error) {
    console.error("Error searching recipes by keyword:", error);
  } 
};
