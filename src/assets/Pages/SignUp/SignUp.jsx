import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

import { FaEyeSlash, FaEye, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast, Bounce } from "react-toastify";
import lable from "../../Library/Library";

import Registratio from "../../Image/Registration.jpg";
import { getDatabase, ref, push, set } from "firebase/database";

function Signup() {
  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate();
  const data = lable.signUpdata();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Error States
  const [emailError, setEmailError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
      setEmailError("");
    } else if (name === "fullName") {
      setFullName(value);
      setFullNameError("");
    } else if (name === "password") {
      setPassword(value);
      setPasswordError("");
    }
  };

  // Email & Password Registration
  const handleSignUp = () => {
    try {
      if (!email) return setEmailError("Please enter your email!");
      if (!fullName) return setFullNameError("Please enter your name!");
      if (!password) return setPasswordError("Please enter your password!");

      setLoading(true);

      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // Step 1: Update profile
          return updateProfile(userInfo.user, {
            displayName: fullName,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          }).then(() => userInfo); // Pass userInfo forward
        })
        // .then((userInfo) => {
        //   // Step 2: Store user in database
        //   const userRef = ref(db, "users/" + userInfo.user.uid);
        //   return set(userRef, {
        //     username: userInfo.user.displayName || fullName,
        //     email: userInfo.user.email || email,
        //     profile_picture: "https://example.com/jane-q-user/profile.jpg",
        //     userUid: userInfo.user.uid,
        //   }).then(() => userInfo); // Pass userInfo forward
        // })
        // .then((userInfo) => {
        //   // Step 3: Send email verification
        //   return sendEmailVerification(userInfo.user);
        // })
        .then(() => {
          // Final Success Message

          let userRef = push(ref(db, "users/"));
          set(userRef, {
            username: auth.currentUser.displayName || fullName,
            email: auth.currentUser.email || email,
            profile_picture: `https://cdn.pixabay.com/photo/2024/12/26/17/31/newborn-photography-9292505_1280.jpg`,
            userUid: auth.currentUser.uid,
          });
          toast.success(`🎉 ${fullName}, Registration Successful!`, {
            position: "top-right",
            autoClose: 3000,
            theme: "light",
            transition: Bounce,
          });
        })
        .catch((err) => {
          console.error("SignUp Error:", err);
          toast.error(`⚠️ ${err.message}`);
        })
        .finally(() => {
          setLoading(false);
          setEmail("");
          setFullName("");
          setPassword("");
          navigate("/signin");
        });
    } catch (err) {
      // Catch any unexpected synchronous error
      console.error("Unexpected Error:", err);
      toast.error(`⚠️ ${err.message}`);
      setLoading(false);
    }
  };

  // Google Signup
  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        toast.success("🎉 Google Sign Up Successful!", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/signin");
      }
    } catch (err) {
      console.error("Google Signup Error:", err.message);
      toast.error(`⚠️ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Facebook Signup
  const handleFacebookSignup = async () => {
    try {
      setLoading(true);
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        toast.success("🎉 Facebook Sign Up Successful!", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/signin");
      }
    } catch (err) {
      console.error("Facebook Signup Error:", err.message);
      toast.error(`⚠️ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-purple-100 min-h-screen flex items-center justify-center w-[100vw] overflow-hidden">
      <div className="w-[90%] m-auto flex flex-col items-center">
        <div className="flex items-center justify-between w-full">
          {/* Signup Form */}
          <div className="w-[50%] h-screen flex items-center justify-center">
            <div>
              <h1 className="text-[36px] font-bold">
                Get started with easy registration
              </h1>
              <p className="text-[20px] font-bold">
                Free register and enjoy our services
              </p>

              <form onSubmit={(e) => e.preventDefault()} className="mt-[24px]">
                {/* Email Field */}
                <div className="flex flex-col gap-y-1 items-start mb-[20px] relative">
                  <label htmlFor="email">
                    Enter a valid Email<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleChange}
                    className="border border-gray-500 py-1 px-2 rounded-[6px] w-full"
                  />
                  {emailError && (
                    <span className="text-red-700">{emailError}</span>
                  )}
                </div>

                {/* Full Name Field */}
                <div className="flex flex-col gap-y-1 items-start mb-[20px] relative">
                  <label htmlFor="fullName">
                    Enter a valid Full Name
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={handleChange}
                    className="border border-gray-500 py-1 px-2 rounded-[6px] w-full"
                  />
                  {fullNameError && (
                    <span className="text-red-700">{fullNameError}</span>
                  )}
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-y-1 items-start mb-[20px] relative">
                  <label htmlFor="password">
                    Enter a valid Password
                    <span className="text-red-600">*</span>
                  </label>
                  <div className="relative w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
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

                {/* Sign Up Button */}
                <button
                  onClick={handleSignUp}
                  className="px-[32px] py-[8px] bg-mainColor text-white rounded-[8px] cursor-pointer w-full"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Sign Up"}
                </button>

                {/* Google Signup */}
                <button
                  onClick={handleGoogleSignup}
                  className="mt-4 flex items-center justify-center px-[32px] py-[8px] border border-gray-500 text-gray-700 rounded-[8px] w-full"
                >
                  <FcGoogle className="mr-2" size={20} /> Sign up with Google
                </button>

                {/* Facebook Signup */}
                <button
                  onClick={handleFacebookSignup}
                  className="mt-4 flex items-center justify-center px-[32px] py-[8px] border border-gray-500 text-gray-700 rounded-[8px] w-full"
                >
                  <FaFacebook className="mr-2 text-blue-700" size={20} /> Sign
                  up with Facebook
                </button>
              </form>

              <p className="mt-5">
                Already have an account ? <Link to={"/signin"}>Sign In</Link>
              </p>
            </div>
          </div>

          {/* Registration Image */}
          <div className="w-[50%] overflow-hidden h-screen">
            <img
              src={Registratio}
              alt="Register"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
