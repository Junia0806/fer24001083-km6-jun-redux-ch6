/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchRecipes } from "../../redux/actions/searchActions";
import { setSearchTerm } from "../../redux/reducers/searchReducers";
import { Link } from "react-router-dom";
import NoImage from "../users/404.png";
import { FaSearch } from "react-icons/fa";
import { RingLoader } from "react-spinners";

function RecipeSearch() {
  const dispatch = useDispatch();
  const { searchResults, loading, searchTerm } = useSelector((state) => state.search);
  // const { searchResults, loading } = useSelector((state) => state.search);
  // const [searchTerm, setSearchTerm] = useState("beef");

  console.log("searchResults :>> ", searchResults);
  console.log("searchTerm :>> ", searchTerm);

  useEffect(() => {
    dispatch(searchRecipes(searchTerm)); // Memanggil aksi Redux saat komponen dimuat
  }, [dispatch]); 

  const handleSearchClick = () => {
    dispatch(searchRecipes(searchTerm)); // Memanggil aksi Redux saat tombol pencarian diklik
  };

  // function RecipeSearch() {
  //   const [searchTerm, setSearchTerm] = useState("Chicken");
  //   const [searchResults, setSearchResults] = useState([]);
  //   const [searchPerformed, setSearchPerformed] = useState(false);
  //   const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     searchByKeyword();
  //   }, []);

  //   async function searchByKeyword() {
  //     try {
  //       setLoading(true); // Set loading to true when fetching data
  //       const encodedSearchTerm = encodeURIComponent(searchTerm.trim());
  //       const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodedSearchTerm}`;
  //       const response = await axios.get(url);

  //       if (response.data.meals === null) {
  //         setSearchResults([]);
  //       } else {
  //         setSearchResults(response.data.meals);
  //       }
  //     } catch (error) {
  //       console.error("Error searching recipes by keyword:", error);
  //     } finally {
  //       setSearchPerformed(true);
  //       setLoading(false); // Set loading to false after data fetching is completed
  //     }
  //   }

  //   const handleSearchClick = () => {
  //     setSearchPerformed(false);
  //     searchByKeyword();
  //   };

  return (
    <div>
      <div className="bg-white min-h-screen">
        {" "}
        <div className="mx-auto px-4 py-8">
          <div className="max-w-md mx-auto flex items-center border border-gray-300 rounded-md overflow-hidden">
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              placeholder="Search by meal name"
              className="border-none focus:outline-none flex-1 px-4 py-2 leading-tight bg-white text-gray-700" // Ubah warna teks dan placeholder
            />
            <button
              onClick={handleSearchClick}
              className="bg-gray-900 hover:hover:bg-gray-700 text-white hover:text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <FaSearch /> {/* icon search */}
            </button>
          </div>

          {loading && (
            <div className="flex justify-center items-center mt-8">
              <RingLoader color="#000000" loading={loading} size={100} />
            </div>
          )}

          {searchResults.length === 0 && !loading && (
            <div className="bg-white p-4 text-center mt-8">
              <div className="text-center">
                <h1 className="text-gray-500 text-3xl font-bold mb-4">
                  Oops! Sorry Bestie
                </h1>
                <img
                  className="h-72 w-auto mx-auto rounded-lg"
                  src={NoImage}
                  alt="Image 404"
                />
                <p className="text-2xl text-gray-500 pb-12">
                  The meal you are looking for was not found
                </p>
              </div>
            </div>
          )}

          {!loading && (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {searchResults.map((recipe) => (
                <div
                  key={recipe.idMeal}
                  className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
                >
                  <div className="bg-gray-900 text-white py-1 px-4 rounded-t-lg">
                    <p className="text-center text-sm font-semibold">
                      {recipe.strCategory}
                    </p>
                  </div>
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <p className="font-bold text-center text-xl mb-2 text-black">
                      {recipe.strMeal}
                    </p>
                    <Link
                      to={`/detail/${recipe.idMeal}`}
                      className="block text-center bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-400 hover:text-black focus:outline-none"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeSearch;
