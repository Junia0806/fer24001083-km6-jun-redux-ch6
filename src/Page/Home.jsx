/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bg from "../image/home.gif";
import bg2 from "../image/value.jpg";
import { useSelector, useDispatch } from "react-redux";
import { getMe } from "../redux/actions/authActions";
import { searchByLetter } from "../redux/actions/alphabetActions";

function Home() {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const searchAlphabet = useSelector((state) => state.alphabet.meals);
  const errorMessage = useSelector(state => state.alphabet.errorMessage);
  console.log("errorMessage :>> ", errorMessage);

  
  useEffect(() => {
    // Memanggil action getMe sekali saat komponen dimuat
    dispatch(getMe(null, null, null));

    // Memanggil action searchByLetter dengan parameter "j" saat komponen dimuat
    dispatch(searchByLetter("j"));
  }, [dispatch]);


  const handleClick = (letter) => {
    dispatch(searchByLetter(letter));
  };
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  return (
    <div className="relative">
      <div className="relative h-[240px] w-full md:h-[400px] lg:h-[570px]">
        <div className="absolute top-0 w-full h-full flex items-center justify-center">
          <img
            src={bg}
            className="w-full h-full object-cover"
            alt="Background"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/55 flex items-center justify-center">
            <div className="text-center px-40">
              {isLoggedIn ? (
                <>
                  <p className="text-white font-bold text-5xl mb-4">
                    Welcome to MyRecipe, {user?.name}
                  </p>
                  <p className="text-white text-xl font-normal w-[720px] mb-5">
                    Congratulations! You`re officially a member of MyRecipe App.
                    Discover your favorite meal recipes effortlessly and
                    swiftly. Dive into a world of endless flavors with the
                    MyRecipe App today!
                  </p>
                </>
              ) : (
                <>
                  <p className="text-white font-bold text-5xl mb-4">MyRecipe</p>
                  <p className="text-white text-xl font-normal w-[720px] mb-5">
                    Explore thousands of recipes and uncover your favorite
                    dishes here. Come join us and start exploring endless
                    flavors with the MyRecipe App today!
                  </p>
                  <Link
                    to="/login"
                    className="bg-gray-900 py-2 px-4 rounded text-white font-semibold hover:bg-gray-400 hover:text-black"
                  >
                    Join Now
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-8">
        <div>
          <p className="text-black flex items-center justify-center font-bold text-2xl">
            Recipe Meal By Letter
          </p>
          <div className="flex justify-center">
            {alphabet.map((letter, index) => (
              <span
                key={index}
                onClick={() => handleClick(letter)}
                className={`text-black cursor-pointer flex items-center justify-center hover:font-bold focus:outline-none text-xl ${
                  alphabet === letter ? "font-bold" : ""
                }`}
                style={{ marginRight: "10px" }} // Memberikan jarak antara tombol huruf
              >
                {letter.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        {errorMessage ? (
          <p className="text-red-500 text-center mt-4 font-semibold text-xl">
            {errorMessage}
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchAlphabet.map((meals) => (
              <div
                key={meals.idMeal}
                className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
              >
                <div className="bg-gray-900 text-white py-1 px-4 rounded-t-lg">
                  <p className="text-center text-sm font-semibold">
                    {meals.strCategory}
                  </p>
                </div>
                <img
                  src={meals.strMealThumb}
                  alt={meals.strMeal}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <p className="font-bold text-center text-xl mb-2 text-black">
                    {meals.strMeal}
                  </p>
                  <Link
                    to={`/detail/${meals.idMeal}`}
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
      <div className="flex bg-gray-900  text-white">
        <div className="w-1/2">
          <img src={bg2} className="w-full h-full object-cover" alt="Gambar" />
        </div>
        <div className="w-1/2 p-8 px-8">
          <h2 className="text-3xl font-bold mb-6">
            Discover the Benefits of MyRecipe Membership
          </h2>
          {isLoggedIn ? (
            <>
              <p className="text-lg font-semibold mb-6">
                As a member of MyRecipe App, you gain complimentary access to a
                range of exclusive features.
              </p>
            </>
          ) : (
            <>
              <p className="text-lg font-semibold mb-6">
                Unlock a world of culinary delights! Join MyRecipe today, create
                your account, and gain exclusive access for free!
              </p>
            </>
          )}
          <ul className="list-disc pl-6 mb-8">
            <li className="mb-2">Access recipes from various categories</li>
            <li className="mb-2">Explore cuisines from different countries</li>
            <li className="mb-2">
              Utilize the search feature to find desired recipes
            </li>
            <li className="mb-2">Get special recipes tailored just for you</li>
            <li className="mb-2">
              Detailed recipe information including ingredients, instructions,
              and cooking video tutorials
            </li>
          </ul>

          {!isLoggedIn && (
            <Link
              to="/login"
              className="text-black px-3 py-2 rounded-md text-sm bg-white hover:bg-gray-300 font-semibold"
            >
              Join Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
