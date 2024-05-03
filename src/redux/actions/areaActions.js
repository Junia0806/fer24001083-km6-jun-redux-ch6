import {
  setAreas,
  setMeals,
  setAreaMealThumbs,
  setLoading,
  setError,
} from "../reducers/areaReducers";
import axios from "axios";

export const fetchAreasAndMeals = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const areasResponse = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );

    const areas = areasResponse.data.meals;
    dispatch(setAreas(areas));

    const areaMealThumbs = {};
    for (const area of areas) {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area.strArea}`
      );
      const data = response.data;
      if (data.meals && data.meals.length > 0) {
        const mealThumb = data.meals[0].strMealThumb;
        areaMealThumbs[area.strArea] = mealThumb;
      }
    }
    dispatch(setAreaMealThumbs(areaMealThumbs));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchMealsByArea = (area) => async (dispatch) => {
  try {
    const responseR = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );
    const meals = responseR.data.meals || [];
    dispatch(setMeals(meals));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
