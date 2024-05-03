/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMe } from "../../redux/actions/authActions";
import { DataCategories } from "../../redux/actions/categoriActions";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";


function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const categories = useSelector((state)=>state.categori.setCategories);
  console.log('categories :>> ', categories);
  const loading = useSelector((state) => state.categori.loading);

  useEffect(() => {
    dispatch(getMe(null, null, null));
    dispatch(DataCategories());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#ffffff" loading={loading} size={100} />
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-landing">
        <div className="mb-8">
          <h1 className="text-black font-bold text-5xl text-center judul">
            Special for you, {user?.name}
          </h1>
        </div>
        <div className="flex">
          <Link
            to="/random"
            className="bg-gray-900 py-2 px-4 rounded text-white font-semibold hover:bg-gray-400 hover:text-black mr-3 mb-3 sm:mb-0"
          >
            Get It Now
          </Link>
        </div>
      </div>
      <div className="bg-white mx-auto px-4 py-20">
        <h1 className="text-black font-bold text-3xl text-center mb-4">
          Meal Categories
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="relative">
              <Link to={`/category/${category.strCategory}`}>
                <div
                  className="bg-cover bg-center rounded-full shadow-lg overflow-hidden"
                  style={{
                    backgroundImage: `url(${category.strCategoryThumb})`,
                    height: "150px", // Change height as needed
                    width: "150px", // Change width as needed
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 hover:bg-opacity-0 text-white hover:text-black">
                    <p className="font-bold text-lg">{category.strCategory}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
