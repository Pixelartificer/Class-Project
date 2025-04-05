import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import LoginImage from "../../Image/Login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

function Login() {
  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const saveUserData = async (user) => {
    try {
      await set(ref(db, `users/${user.uid}`), {
        username: user.displayName || "Anonymous",
        email: user.email,
        profile_picture: user.photoURL || "https://via.placeholder.com/150",
        userUid: user.uid,
      });
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const handleLogin = async () => {
    if (!email) return setEmailError("Please enter your email!");
    if (!password) return setPasswordError("Please enter your password!");

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await saveUserData(userCredential.user);
      toast.success("🎉 Login Successful!", { position: "top-right", autoClose: 5000, transition: Bounce });
      navigate("/");
    } catch (err) {
      toast.error(`⚠️ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    try {
      const provider = new GoogleAuthProvider();
  
      signInWithPopup(auth, provider)
        .then((result) => {
          return saveUserData(result.user);
        })
        .then(() => {
          toast.success("🎉 Google Login Successful!", {
            position: "top-right",
            autoClose: 5000,
            transition: Bounce,
          });
          navigate("/");
        })
        .catch((err) => {
          toast.error(`⚠️ ${err.message}`);
        });
  
    } catch (err) {
      // This will catch any synchronous errors (very unlikely here)
      toast.error(`⚠️ ${err.message}`);
    }
  };

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await saveUserData(result.user);
      toast.success("🎉 Facebook Login Successful!", { position: "top-right", autoClose: 5000, transition: Bounce });
      navigate("/");
    } catch (err) {
      toast.error(`⚠️ ${err.message}`);
    }
  };

  return (
    <div className="flex h-screen bg-purple-100">
      <div className="flex flex-col justify-center items-center w-1/2 p-8">
        <h1 className="text-3xl font-bold text-purple-600">Welcome Back!</h1>
        <p className="text-lg font-bold">Log in to continue</p>
        <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-sm mt-4">
          <label className="block">Email</label>
          <input type="email" name="Email" value={email} onChange={handleChange} className="w-full p-2 border rounded" />
          {emailError && <span className="text-red-700">{emailError}</span>}
          <label className="block mt-4">Password</label>
          <div className="relative">
            <input type={showPassword ? "text" : "password"} name="Password" value={password} onChange={handleChange} className="w-full p-2 border rounded" />
            <span className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          {passwordError && <span className="text-red-700">{passwordError}</span>}
          <button onClick={handleLogin} className="w-full mt-4 p-2 bg-purple-600 text-white rounded">{loading ? "Loading..." : "Log In"}</button>
        </form>
        <p className="mt-4">Don't have an account? <Link to="/signup" className="text-blue-700 hover:underline">Sign Up</Link></p>
        <div className="mt-4 flex gap-4">
          <button onClick={handleGoogleLogin} className="flex items-center p-2 border rounded"><FcGoogle className="mr-2" /> Google</button>
          <button onClick={handleFacebookLogin} className="flex items-center p-2 border rounded"><FaFacebookF className="mr-2" /> Facebook</button>
        </div>
      </div>
      <div className="w-1/2 h-full">
        <img src={LoginImage} alt="Login" className="h-full w-full object-cover" />
      </div>
    </div>
  );
}

export default Login;
