import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true; // send cookies with request

      if (state === "Sign Up") {
        const { data } = await axios.post(
          backendUrl + "/api/v1/auth/register",
          {
            name,
            email,
            password,
          }
        );

        if (data.success) {
          toast.success(data.message);
          setIsLoggedin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/v1/auth/login", {
          email,
          password,
        });

        if (data.success) {
          toast.success(data.message);
          setIsLoggedin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
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

      <div className="bg-slate-900 p-10 rounded-tl-3xl rounded-br-3xl shadow-lg w-full sm:w-96 text-blue-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>

        <p className="text-center text-sm mb-6">
          {state === "Sign Up"
            ? "Create your account"
            : "Login to your account"}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" ? (
            <>
              <div className="flex items-center mb-5 gap-3 w-full px-5 py-2 rounded-t-xl text-white bg-[#333A5C]">
                <img src={assets.person_icon} alt="" />
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="w-full bg-transparent outline-none"
                  type="text"
                  placeholder="Full Name"
                  required
                />
              </div>
            </>
          ) : (
            <></>
          )}

          <div
            className={`flex items-center mb-5 gap-3 w-full px-5 py-2 text-white bg-[#333A5C] ${
              state === "Login" ? "rounded-t-xl" : ""
            }`}
          >
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
          <div className="flex items-center mb-5 gap-3 w-full px-5 py-2 text-white bg-[#333A5C]">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full bg-transparent outline-none"
              type="password"
              placeholder="Password"
              required
            />
          </div>

          {state === "Sign Up" ? (
            <></>
          ) : (
            <>
              <p
                onClick={() => navigate("/reset-password")}
                className="text-blue-500 text-center mb-5 cursor-pointer"
              >
                Forgot Password?
              </p>
            </>
          )}

          <button className="w-full px-4 py-2.5 rounded-b-xl bg-gradient-to-r from-blue-500 to-blue-900 text-white font-medium">
            {state}
          </button>
        </form>

        {state === "Sign Up" ? (
          <>
            <p className="flex gap-2 justify-center text-gray-400 mt-5">
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-blue-300 cursor-pointer underline"
              >
                Login here
              </span>
            </p>
          </>
        ) : (
          <>
            <p className="flex gap-2 justify-center text-gray-400 mt-5">
              Don't have an account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-blue-300 cursor-pointer underline"
              >
                Sign Up
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
