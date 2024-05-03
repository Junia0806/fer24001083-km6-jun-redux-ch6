import { setMeals, setCategories, setLoading} from '../reducers/categoriReducers';
import axios from 'axios';

export const DataCategories = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    dispatch( setCategories(response.data.categories));
  } catch (error) {
    console.error("Error:", error);
  }
};

export const ListMeal = (category) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    dispatch(setMeals(response.data.meals));
    dispatch(setLoading(false));
  } catch (error) {
    console.error("Error feching list meals:", error);
  }
};
