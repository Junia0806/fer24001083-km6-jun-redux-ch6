import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMe } from "../redux/actions/authActions";

function NoTokenAccess({ children }) {
  //Jika tidak ada token yang tersedia, itu tidak melakukan pengalihan navigasi.
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe(navigate, "/", null));
    //diarahkan ke navigatepath halaman "/"
    //navigatepath error null -> tidak dijalankan
  }, [navigate, dispatch]);

  return children;
}

export default NoTokenAccess;