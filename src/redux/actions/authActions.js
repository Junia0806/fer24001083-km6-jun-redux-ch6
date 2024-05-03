import { setIsLoggedIn, setToken, setUser } from "../reducers/authReducers";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

//WITH GOOGLE
export const registerLoginWithGoogle =
  (accessToken, navigate) => async (dispatch) => {
    try {
      let data = JSON.stringify({
        access_token: accessToken,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API}/v1/auth/google`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      const { token } = response.data.data;

      dispatch(setToken(token));
      dispatch(setIsLoggedIn(true));
      dispatch(getMe(null, null, null));
      toast.success("You have successfully logged in with google");
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data.message);
        return;
      }
      toast.error(error.message);
    }
  };

// LOGOUT
export const logout = (navigate) => (dispatch) => {
  // Menampilkan dialog konfirmasi menggunakan SweetAlert sebelum logout
  Swal.fire({
    title: "Are you sure?",
    text: "You will be logged out",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, logout",
  }).then((result) => {
    if (result.isConfirmed) {
      // Jika pengguna mengonfirmasi logout
      Swal.fire({
        title: "Logged Out",
        text: "You have been logged out",
        icon: "success",
      }).then(() => {
        try {
          // Set token, isLoggedIn, dan user menjadi null
          dispatch(setToken(null));
          dispatch(setIsLoggedIn(false));
          dispatch(setUser(null));

          // Redirect ke halaman utama jika navigate tersedia
          window.location.reload(); // Reload the page
          if (navigate) navigate("/");
        } catch (error) {
          // Tampilkan pesan error jika terjadi kesalahan
          toast.error(error?.message);
        }
      });
    }
  });
};

// GETME --> Mendapatkan data user
export const getMe =
  (navigate, navigatePath, navigatePathError) => async (dispatch, getState) => {
    //Parameter yang diterima berupa string, Jika false/null/undefined maka tidak dieksekusi
    //Navigate --> untuk melakukan navigasi dalam aplikasi
    //NavigatePath --> Path/rute yang akan dituju setelah data pengguna berhasil diambil
    //NavigatePathError --> Path/rute yang akan dituju jika terjadi kesalahan saat mengambil data pengguna

    try {
      // Mendapatkan token dari state Redux menggunakan getState()
      const { token } = getState().auth;

      // Memeriksa apakah token tersedia
      if (!token) return; // Jika tidak ada token, langsung keluar dari fungsi

      // Mengirim permintaan untuk mendapatkan data pengguna yang sedang masuk
      const response = await axios.get(
        `${import.meta.env.VITE_API}/v1/auth/me`, // URL API untuk mendapatkan data pengguna
        {
          headers: {
            Authorization: `Bearer ${token}`, // Menyertakan token dalam header permintaan
          },
        }
      );

      // Mendapatkan data pengguna dari respons API
      const data = response.data.data;

      // Menyimpan data pengguna dalam state Redux menggunakan aksi setUser
      dispatch(setUser(data));

      // Jika navigatePath diberikan, arahkan pengguna ke rute yang ditentukan
      if (navigatePath) navigate(navigatePath);
    } catch (error) {
      // Menangani kesalahan yang mungkin terjadi selama proses pengambilan data pengguna

      // Jika kesalahan berasal dari Axios (seperti kesalahan jaringan atau status tidak berhasil)
      if (axios.isAxiosError(error)) {
        // Jika status respons adalah 401 (Unauthorized), lakukan logout
        if (error.response.status === 401) {
          dispatch(logout(null)); // Lakukan logout dengan menghapus token dari state
          // Jika navigatePathError diberikan, arahkan pengguna ke rute yang ditentukan
          if (navigatePathError) navigate(navigatePathError);
          return;
        }
        // Jika kesalahan bukan 401, tampilkan pesan kesalahan dari respons API
        toast.error(error.response.data.message);
        return;
      }
      // Jika kesalahan bukan dari Axios, tampilkan pesan kesalahan umum
      toast.error(error.message);
    }
  };

// LOGIN
export const login = (data, navigate) => async (dispatch) => {
  //Data -> informasi yang diperlukan untuk login (email dan password)
  //Navigate --> mengalihkan user ke halaman dashboard setelah proses login berhasil
  try {
    // Konfigurasi untuk permintaan HTTP menggunakan axios
    let config = {
      method: "post",
      url: `${import.meta.env.VITE_API}/v1/auth/login`, // URL API untuk login
      headers: {
        "Content-Type": "application/json", // Tipe konten permintaan JSON
      },
      data: data, // Data yang akan dikirim dalam permintaan
    };
    const response = await axios.request(config); // Kirim permintaan login menggunakan axios
    const { token } = response.data.data; // Mengambil token dari data respons

    // Memperbarui state Redux
    dispatch(setToken(token));
    dispatch(setIsLoggedIn(true));
    dispatch(getMe(null, null, null));

    // Tampilkan pesan sukses menggunakan toast
    toast.success("Succeed. Redirecting to your account...");
    setTimeout(() => { // Redirect ke halaman utama setelah 2 detik
      navigate("/");
    }, 2000);
  } catch (error) {
    // Tangani kesalahan yang mungkin terjadi saat melakukan login
    if (axios.isAxiosError(error)) {
      // Jika kesalahan berasal dari axios, tampilkan pesan kesalahan dari respons server
      toast.error(error.response.data.message);
      return;
    }
    // Jika kesalahan bukan dari axios, tampilkan pesan kesalahan umum
    toast.error(error.message);
  }
};

//REGISTER
export const register = (data, navigate) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      url: `${import.meta.env.VITE_API}/v1/auth/register`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    const { token } = response.data.data;

    dispatch(setToken(token));
    dispatch(setIsLoggedIn(true));
    dispatch(getMe(null, null, null));

    toast.success("Succeed. Redirecting to your account...");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response.data.message);
      return;
    }
    toast.error(error.message);
  }
};
