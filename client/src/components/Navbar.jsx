import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContent);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true; // send cookies with request
      const { data } = await axios.post(
        backendUrl + "/api/v1/auth/send-verify-otp"
      );

      if (data.success) {
        navigate("/email-verification");
        toast.success(data.message);
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true; // send cookies with request
      const { data } = await axios.post(backendUrl + "/api/v1/auth/logout");

      if (data.success) {
        setIsLoggedin(false);
        setUserData(false);
        navigate("/");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px24 absolute top-0">
      <div className="flex items-center gap-4">
        <img src={assets.logo} alt="" className="w-16 sm:w-18 rounded-full" />
        <h1 className="text-4xl font-semibold text-blue-100">MyPage</h1>
      </div>

      {userData ? (
        <>
          <div className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-950 text-white relative group">
            {userData.name[0].toUpperCase()}

            <div className="w-32 absolute hidden group-hover:block top-0 right-0 z-10 text-gray-950 pt-12">
              <ul className="list-none m-0 p-2 bg-blue-100 text-sm">
                {userData.isAccVerified ? (
                  <></>
                ) : (
                  <>
                    <li
                      onClick={sendVerificationOtp}
                      className="py-1 px-2 hover:bg-blue-300 cursor-pointer"
                    >
                      Verify Email
                    </li>
                  </>
                )}

                <li
                  onClick={logout}
                  className="py-1 px-2 hover:bg-blue-300 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          <button
            onClick={() => navigate("/login")}
            className="flex item-center gap-2 bg-blue-300 rounded-full px-6 py-2 text-gray-950 hover:bg-blue-100 transition-all"
          >
            Login
            <img src={assets.arrow_icon} alt="" />
          </button>
        </>
      )}
    </div>
  );
};

export default Navbar;
