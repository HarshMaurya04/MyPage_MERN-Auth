import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContent } from "../context/AppContext";
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true; // send cookies with request
  const { backendUrl } = useContext(AppContent);

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState("");
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

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

  const onSubmitEmail = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        backendUrl + "/api/v1/auth/send-reset-otp",
        { email }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    setOtp(otpArray.join(""));
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/v1/auth/reset-password",
        { email, otp, newPassword }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

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

      {/* Email input form*/}

      {!isEmailSent && (
        <form
          onSubmit={onSubmitEmail}
          className="bg-slate-900 p-8 rounded-tl-3xl rounded-br-3xl shadow-lg w-96 sm:w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-3">
            Reset Password
          </h1>
          <p className="text-center text-blue-300 mb-6">
            Enter your registered email address
          </p>

          <div className="flex items-center mb-6 gap-3 w-full px-5 py-2 rounded-t-xl bg-[#333A5C] text-white">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full bg-transparent outline-none"
              type="email"
              placeholder="Email"
              required
            />
          </div>

          <button className="w-full px-4 py-2.5 mb-4 rounded-b-xl bg-gradient-to-r from-blue-500 to-blue-900 text-white font-medium">
            Submit
          </button>
        </form>
      )}

      {/* OTP input Form */}
      {isEmailSent && !isOtpSubmitted && (
        <form
          onSubmit={onSubmitOtp}
          className="bg-slate-900 p-8 rounded-tl-3xl rounded-br-3xl shadow-lg w-96 sm:w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-3">
            Reset Password OTP
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

          <button className="w-full px-4 py-3 mb-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-900 text-white font-medium">
            Submit
          </button>
        </form>
      )}

      {/* New password input form*/}
      {isEmailSent && isOtpSubmitted && (
        <form
          onSubmit={onSubmitNewPassword}
          className="bg-slate-900 p-8 rounded-tl-3xl rounded-br-3xl shadow-lg w-96 sm:w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-3">
            New Password
          </h1>
          <p className="text-center text-blue-300 mb-6">
            Enter the new password below
          </p>

          <div className="flex items-center mb-6 gap-3 w-full px-5 py-2 rounded-t-xl bg-[#333A5C] text-white">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              className="w-full bg-transparent outline-none"
              type="password"
              placeholder="New Password"
              required
            />
          </div>

          <button className="w-full px-4 py-2.5 mb-4 rounded-b-xl bg-gradient-to-r from-blue-500 to-blue-900 text-white font-medium">
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
