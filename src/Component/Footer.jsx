/* eslint-disable no-unused-vars */
import React from "react";
import logo from "../image/logo.png";
function Footer() {
  return (
    <footer className="footer p-10 text-neutral-content bg-gray-800">
      <aside className="flex items-center">
        <img src={logo} className="w-20 mr-4" alt="Logo" />
        <p className="text-sm font-semibold">
          <strong>MyRecipe.</strong>
          <br /> Explore thousands of recipes and uncover your favorite dishes
          here.
        </p>
      </aside>
     
      <div className="flex space-x-4 mt-2">
      <p className="text-l">Follow Junia:</p>
        <a href="#" className="text-white hover:text-gray-300 text-xl ">
          <i className="fa-brands fa-instagram y-300"></i>
        </a>
        <a href="#" className="text-white hover:text-gray-300 text-xl">
          <i className="fa-brands fa-linkedin"></i>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
