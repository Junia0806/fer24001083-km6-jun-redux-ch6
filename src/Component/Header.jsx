/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, getMe } from "../redux/actions/authActions";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe(null, null, null));
  }, [dispatch]);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <NavLink
              to="/"
              className="text-white text-2xl font-bold tracking-wide"
            >
              MyRecipe
            </NavLink>
          </div>
          <div className="flex space-x-4">
            {isLoggedIn ? (
              <>
                <NavLink
                  to="/users/dashboard"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Category
                </NavLink>
                <NavLink
                  to="/users/area"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Area
                </NavLink>
                <NavLink
                  to="/users/search"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Search
                </NavLink>
                <NavLink className="dropdown dropdown-hover bg-gray-800">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn m-0 text-black bg-white hover:bg-gray-300"
                  >
                  <i className="fa-solid fa-user"></i>{user?.name}
                  </div>
                  <ul className="dropdown-content z-[1] menu shadow text-sm font-medium">
                    <li>
                      <button
                        className="block px-4 py-2 w-full text-black bg-white hover:bg-gray-800 hover:text-white"
                        onClick={() => {
                          dispatch(logout(navigate));
                        }}
                      >
                        Logout <i className="fa-solid fa-right-from-bracket"></i>
                      </button>
                    </li>
                  </ul>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="text-white px-3 py-2 rounded-md text-sm font-medium bg-gray-800 hover:bg-white hover:text-black"
                  style={{ border: "1px solid white" }}
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="text-black px-3 py-2 rounded-md text-sm font-medium bg-white hover:bg-gray-300"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
