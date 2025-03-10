import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import LoginImage from "../../Image/Login.jpg";
import { Link } from "react-router-dom";

function Login() {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Error States
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "Email") {
      setEmail(value);
      setEmailError("");
    } else {
      setPassword(value);
      setPasswordError("");
    }
  };

  const handleLogin = async () => {
    if (!email) return setEmailError("Please enter your email!");
    if (!password) return setPasswordError("Please enter your password!");

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);

      toast.success(`🎉 Login Successful!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Login Error:", err.code);
      toast.error(`⚠️ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between w-[90%] m-auto">
      <div className="w-[50%] h-screen flex items-center justify-center">
        <div>
          <h1 className="text-[36px] font-bold">Welcome Back!</h1>
          <p className="text-[20px] font-bold">Log in to continue</p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-[24px]">
            <div className="flex flex-col gap-y-1 items-start mb-[20px] relative">
              <label htmlFor="Email">Enter your Email</label>
              <input
                type="email"
                placeholder="Email"
                name="Email"
                value={email}
                onChange={handleChange}
                className="border border-gray-500 py-1 px-2 rounded-[6px] w-full"
              />
              {emailError && <span className="text-red-700">{emailError}</span>}
            </div>

            <div className="flex flex-col gap-y-1 items-start mb-[20px] relative">
              <label htmlFor="Password">Enter your Password</label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="Password"
                  value={password}
                  onChange={handleChange}
                  className="border border-gray-500 py-1 px-2 rounded-[6px] w-full"
                />
                <span
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              {passwordError && (
                <span className="text-red-700">{passwordError}</span>
              )}
            </div>

            <button
              onClick={handleLogin}
              className="px-[32px] py-[8px] bg-mainColor text-white rounded-[8px] cursor-pointer"
              disabled={loading}
            >
              {loading ? "Loading..." : "Log In"}
            </button>
          </form>

          <p className="mt-[24px]">
            Don't have an account? {""}
            <Link
              to={"/signup"}
              className="text-blue-700 hover:underline cursor-pointer"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      <div className="w-[50%]">
        <img src={LoginImage} alt="Login" />
      </div>
    </div>
  );
}

export default Login;
