/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import google from "../image/google.png";
import { registerLoginWithGoogle } from "../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function GoogleLogin({ buttonText }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) =>
    //memanggil aksi Redux registerLoginWithGoogle dengan token akses yang diperoleh dari respons Google
      dispatch(registerLoginWithGoogle(responseGoogle.access_token, navigate)),
  });


  return (
    <button
      onClick={loginWithGoogle}
      className="flex items-center justify-center shadow-lg bg-white hover:bg-slate-300 border-2 border-inherit w-48 h-12 cursor-pointer"
    >
      <img className="w-5 h-5" src={google} alt="Google" />
      <span className="text-black ml-[6px]">{buttonText}</span>
    </button>
  );
}

export default GoogleLogin;
