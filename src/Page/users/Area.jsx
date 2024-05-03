/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAreasAndMeals,
  fetchMealsByArea,
} from "../../redux/actions/areaActions";

function Area() {
  const [selectedArea, setSelectedArea] = useState(null); 
  const dispatch = useDispatch();
  const { areas, meals, areaMealThumbs, loading } = useSelector(
    (state) => state.area
  );

  console.log("selectedArea (area yang di klik) :>> ", selectedArea);
  console.log("list areas :>> ", areas);
  console.log("list meal from area :>> ", meals);

  useEffect(() => {
    dispatch(fetchAreasAndMeals());
  }, [dispatch]);

  const handleAreaClick = (area) => {
    setSelectedArea(area);
    dispatch(fetchMealsByArea(area));
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#ffffff" loading={loading} size={100} />
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white mx-auto px-4 py-10">
        <h1 className="text-black font-bold text-3xl text-center mb-4">
          Search By Area
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {areas.map((area) => (
            <div
              key={area.strArea}
              onClick={() => handleAreaClick(area.strArea)}
              className="relative overflow-hidden rounded-md cursor-pointer"
              style={{
                backgroundImage: `url(${areaMealThumbs[area.strArea]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "100px",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-60 hover:bg-opacity-0 text-white hover:text-black flex items-center justify-center">
                <p className=" font-bold text-lg">{area.strArea}</p>
              </div>
            </div>
          ))}
        </div>
        <p>area hasil</p>
        {selectedArea && (
          <div className="pt-5">
            <h2
              className="font-bold text-4xl text-center mb-8 text-gray-200"
              style={{ textShadow: "0 0 5px black" }}
            >
              Meals from {selectedArea}
            </h2>
            <div
              className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              style={{ border: "2px dashed black" }}
            >
              {meals.map((meal) => (
                <div
                  key={meal.idMeal}
                  className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
                >
                  <div className="bg-gray-900 text-white py-1 px-4 rounded-t-lg">
                    <p className="text-center text-sm font-semibold">
                      {selectedArea}
                    </p>
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
        )}
      </div>
    </div>
  );
}

export default Area;
