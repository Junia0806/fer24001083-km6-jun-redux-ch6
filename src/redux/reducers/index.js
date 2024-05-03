import { combineReducers } from "@reduxjs/toolkit";
import authReducers from "./authReducers";
import detailReducers from "./detailReducers";
import categoriReducers from "./categoriReducers";
import alphabetReducers from "./alphabetReducers";
import areaReducers from "./areaReducers";
import searchReducers from "./searchReducers";

// reducernya disini
export default combineReducers({
  auth: authReducers,
  alphabet: alphabetReducers,
  mealDetail : detailReducers,
  categori : categoriReducers,
  area : areaReducers,
  search: searchReducers,
});