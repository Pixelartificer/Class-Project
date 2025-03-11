import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import LoginImage from "../../Image/Login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
// import Logo from "../../Image/Login.jpg"; // Assuming you have a logo image

function Login() {
  const auth = getAuth();
  const navigate = useNavigate(); // Using navigate for redirection
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
      navigate("/home"); // Redirect to /home page
    } catch (err) {
      console.error("Login Error:", err.code);
      toast.error(`⚠️ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success(`🎉 Google Login Successful!`, {
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
      navigate("/home"); // Redirect to /home page
    } catch (err) {
      console.error("Google Login Error:", err.code);
      toast.error(`⚠️ ${err.message}`);
    }
  };

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success(`🎉 Facebook Login Successful!`, {
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
      navigate("/home"); // Redirect to /home page
    } catch (err) {
      console.error("Facebook Login Error:", err.code);
      toast.error(`⚠️ ${err.message}`);
    }
  };

  return (
    <div className="bg-purple-100">
      <div className="flex items-center justify-between w-[90%] m-auto">
        <div className="w-[50%] h-screen flex items-center justify-center">
          <div>
            {/* <img src={Logo} alt="Logo" className="w-20 mb-4" /> */}
            <h1 className="text-[36px] font-bold text-purple-600">Welcome Back!</h1>
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
                  className="border border-bg-purple-600 py-1 px-2 rounded-[6px] w-full"
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
                    className="border border-bg-purple-600 py-1 px-2 rounded-[6px] w-full"
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

              <Link
                to={"/home"}
                onClick={handleLogin}
                className="px-[32px] py-[8px]  rounded-[8px] border border-purple-600 hover:bg-purple-600 hover:text-white cursor-pointer"
                disabled={loading}
              >
                {loading ? "Loading..." : "Log In"}
              </Link>
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

            {/* Google and Facebook Login Buttons */}
            <div className="mt-[24px] flex gap-x-4">
              <button
                onClick={handleGoogleLogin}
                className="flex items-center px-6 py-2 border border-purple-600 rounded-[8px] hover:bg-purple-600 hover:text-white"
              >
                <FcGoogle className="mr-2" />
                Google
              </button>
              <button
                onClick={handleFacebookLogin}
                className="flex items-center px-4 py-2 border border-purple-600 rounded-[8px] hover:bg-purple-600 hover:text-white"
              >
                <FaFacebookF className="mr-2" />
                Facebook
              </button>
            </div>
          </div>
        </div>

        <div className="w-[50%]">
          <img src={LoginImage} alt="Login" />
        </div>
      </div>
    </div>
  );
}

export default Login;