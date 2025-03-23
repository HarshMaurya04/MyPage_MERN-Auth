import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const EmailVerify = () => {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true; // send cookies with request
  const { backendUrl, isLoggedin, userData, getUserData } =
    useContext(AppContent);
  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");

    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");

      const { data } = await axios.post(
        backendUrl + "/api/v1/auth/verify-account",
        { otp }
      );

      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isLoggedin && userData && userData.isAccVerified) {
      navigate("/");
    }
  }, [isLoggedin, userData]);

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:p-0 bg-gradient-to-tl from-gray-900 via-blue-700 to-gray-950">
      <div className="flex items-center gap-4 absolute left-5 sm:left-20 top-5 cursor-pointer">
        <img
          src={assets.logo}
          alt=""
          onClick={() => navigate("/")}
          className="w-16 sm:w-18"
        />
        <h1
          className="text-4xl font-semibold text-blue-200"
          onClick={() => navigate("/")}
        >
          MyPage
        </h1>
      </div>

      <form
        onSubmit={onSubmitHandler}
        className="bg-slate-900 p-8 rounded-tl-3xl rounded-br-3xl shadow-lg w-96 sm:w-96 text-sm"
      >
        <h1 className="text-white text-2xl font-semibold text-center mb-3">
          Email Verify OTP
        </h1>
        <p className="text-center text-blue-300 mb-6">
          Enter the 6-digit code sent to your email
        </p>

        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength="1"
                key={index}
                required
                className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                ref={(e) => (inputRefs.current[index] = e)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>

        <button className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-900 text-white font-medium">
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
