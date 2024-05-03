import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMe } from "../redux/actions/authActions";

function Protected({ children }) {
  //children mewakili komponen-komponen yang ingin dilindungi oleh Protected
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      alert("Anda tidak bisa mengakses halaman ini tanpa akun MyRecipe!");
      return navigate("/");
    }

    // get user information
    dispatch(getMe(navigate, null, "/"));
    //Navigatepath tidak digunakan
    //NavigatepathError diarahkan ke "/"
  }, [navigate, dispatch, token]);
  // useEffect akan dijalankan kembali setiap kali nilai navigate, dispatch, atau token berubah

  return children;
}

export default Protected;
