/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { ListMeal } from "../../redux/actions/categoriActions";

function MealList() {
  const { category } = useParams();
  console.log('categori :>> ', category);

  const dispatch = useDispatch();
  const meals = useSelector((state) => state.categori.meals);
  console.log('meals :>> ', meals);
  
  const loading = useSelector((state) => state.categori.loading);

  useEffect(() => {
    dispatch(ListMeal(category));
  }, [dispatch, category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#ffffff" loading={loading} size={100} />
      </div>
    );
  }

  return (
    <div>
      <div className="mx-auto px-4 py-10 bg-white">
        <h1 className="font-bold text-3xl text-center">
          {category} Meal Recipes
        </h1>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {meals.map((meal, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
            >
              <div className="bg-gray-900 text-white py-1 px-4 rounded-t-lg">
                <p className="text-center text-sm font-semibold">{category}</p>
              </div>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <p className="font-bold text-center text-xl mb-2 text-black">
                  {meal.strMeal}
                </p>
                <Link
                  to={`/detail/${meal.idMeal}`}
                  className="block text-center bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-400 hover:text-black focus:outline-none"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MealList;
