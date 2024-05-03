// alphabetActions.js
import { setErrorMessage, setMeals} from '../reducers/alphabetReducers';
import axios from 'axios';

export const searchByLetter = (letter) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    );
    dispatch(setMeals(response.data.meals || []));
    dispatch(setErrorMessage(response.data.meals ? "" : "Meals data is not available"));
  } catch (error) {
    dispatch(setErrorMessage("Terjadi kesalahan dalam mengambil data makanan"));
  }
};
