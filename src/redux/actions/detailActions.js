import axios from "axios";
import { setMealDetail, setLoading, setError, setRandomMeal } from "../reducers/detailReducers";

export const fetchMealDetail = (idMeal) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    );
    if (response.data.meals) {
      dispatch(setMealDetail(response.data.meals[0]));
    } else {
      // Menangani kasus ketika tidak ada data makanan yang dikembalikan
      dispatch(setError("Tidak ada data makanan ditemukan"));
    }
  } catch (error) {
    dispatch(setError(error));
  }
};

export const RandomMeal = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/random.php`);
    dispatch(setRandomMeal(response.data.meals[0]));
  } catch (error) {
    dispatch(setError(error.message));
  }
};