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
import { getDatabase, ref, push, set } from "firebase/database";
import { FaEyeSlash, FaEye, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Registratio from "../../Image/Registration.jpg";

function Signup() {
  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value), setEmailError("");
    else if (name === "fullName") setFullName(value), setFullNameError("");
    else if (name === "password") setPassword(value), setPasswordError("");
  };

  const handleSignUp = () => {
    if (!email) return setEmailError("Please enter your email!");
    if (!fullName) return setFullNameError("Please enter your name!");
    if (!password) return setPasswordError("Please enter your password!");
  
    setLoading(true);
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
  
        // Update profile
        return updateProfile(user, {
          displayName: fullName,
          photoURL: "https://cdn.pixabay.com/photo/2024/12/26/17/31/newborn-photography-9292505_1280.jpg",
        }).then(() => user); // pass user forward
      })
      .then((user) => {
        // Save to database
        const userRef = push(ref(db, "users/"));
        return set(userRef, {
          username: fullName,
          email: email,
          profile_picture: "https://cdn.pixabay.com/photo/2024/12/26/17/31/newborn-photography-9292505_1280.jpg",
          userUid: user.uid,
        }).then(() => user); // pass user forward
      })
      .then((user) => {
        // Now send email verification
        return sendEmailVerification(user);
      })
      .then(() => {
        toast.success(`🎉 ${fullName}, registration successful! Please verify your email.`, {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });
  
        setEmail("");
        setFullName("");
        setPassword("");
        navigate("/signin");
      })
      .catch((err) => {
        console.error("Signup Error:", err);
        toast.error(`⚠️ ${err.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSocialSignup = async (provider) => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        toast.success("🎉 Social Sign Up Successful!", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/signin");
      }
    } catch (err) {
      toast.error(`⚠️ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-purple-100 min-h-screen flex items-center justify-center w-full overflow-hidden">
      <div className="w-[90%] m-auto flex flex-col items-center">
        <div className="flex items-center justify-between w-full">
          <div className="w-[50%] h-screen flex items-center justify-center">
            <div>
              <h1 className="text-[36px] font-bold">Get started with easy registration</h1>
              <p className="text-[20px] font-bold">Free register and enjoy our services</p>

              <form onSubmit={(e) => e.preventDefault()} className="mt-[24px]">
                <div className="mb-[20px]">
                  <label>Email <span className="text-red-600">*</span></label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleChange}
                    className="border py-1 px-2 rounded w-full"
                  />
                  {emailError && <span className="text-red-700">{emailError}</span>}
                </div>

                <div className="mb-[20px]">
                  <label>Full Name <span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={handleChange}
                    className="border py-1 px-2 rounded w-full"
                  />
                  {fullNameError && <span className="text-red-700">{fullNameError}</span>}
                </div>

                <div className="mb-[20px] relative">
                  <label>Password <span className="text-red-600">*</span></label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChange}
                    className="border py-1 px-2 rounded w-full"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[35px] cursor-pointer"
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                  {passwordError && <span className="text-red-700">{passwordError}</span>}
                </div>

                <button
                  onClick={handleSignUp}
                  className="w-full py-2 bg-mainColor text-white rounded"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Sign Up"}
                </button>

                <button
                  onClick={() => handleSocialSignup(new GoogleAuthProvider())}
                  className="mt-4 w-full py-2 flex items-center justify-center border rounded"
                >
                  <FcGoogle className="mr-2" /> Sign up with Google
                </button>

                <button
                  onClick={() => handleSocialSignup(new FacebookAuthProvider())}
                  className="mt-4 w-full py-2 flex items-center justify-center border rounded text-blue-700"
                >
                  <FaFacebook className="mr-2" /> Sign up with Facebook
                </button>
              </form>

              <p className="mt-5">
                Already have an account? <Link to="/signin" className="text-blue-600">Sign In</Link>
              </p>
            </div>
          </div>

          <div className="w-[50%] h-screen overflow-hidden">
            <img src={Registratio} alt="Register" className="object-cover w-full h-full" />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;