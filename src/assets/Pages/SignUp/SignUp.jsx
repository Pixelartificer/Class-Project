import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { ToastContainer, toast, Bounce } from "react-toastify";
import lable from "../../Library/Library";
import Registratio from "../../Image/Registration.jpg";


function Signup() {
  const auth = getAuth();
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
    } else {
      setPassword(value);
      setPasswordError("");
    }
  };

  // Email & Password Registration
  const handleSignUp = async () => {
    if (!email) return setEmailError("Please enter your email!");
    if (!fullName) return setFullNameError("Please enter your name!");
    if (!password) return setPasswordError("Please enter your password!");

    try {
      setLoading(true);
      const userInfo = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: fullName,
        photoURL: "https://example.com/jane-q-user/profile.jpg",
      });

      await sendEmailVerification(auth.currentUser);

      toast.success(`🎉 ${fullName}, Registration Successful!`, {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });

      setEmail("");
      setFullName("");
      setPassword("");
      navigate("/home"); // Redirect to home page after signup
    } catch (err) {
      console.error("Error:", err.code);
      toast.error(`⚠️ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Google Signup
  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("🎉 Google Sign Up Successful!", { position: "top-right", autoClose: 3000 });
      navigate("/home");
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
      await signInWithPopup(auth, provider);
      toast.success("🎉 Facebook Sign Up Successful!", { position: "top-right", autoClose: 3000 });
      navigate("/home");
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
              <h1 className="text-[36px] font-bold">Get started with easy registration</h1>
              <p className="text-[20px] font-bold">Free register and enjoy our services</p>

              <form onSubmit={(e) => e.preventDefault()} className="mt-[24px]">
                {data?.map(({ name, id, requird }) => (
                  <div key={id} className="flex flex-col gap-y-1 items-start mb-[20px] relative">
                    <label htmlFor={name}>
                      {`Enter a valid ${name}`}
                      {requird && <span className="text-red-600">*</span>}
                    </label>
                    <div className="relative w-full">
                      <input
                        type={name === "Password" ? (showPassword ? "text" : "password") : name === "Email" ? "email" : "text"}
                        placeholder={name}
                        name={name.toLowerCase().replace(" ", "")} // Fix for name attributes
                        value={name === "Email" ? email : name === "Full Name" ? fullName : password}
                        onChange={handleChange}
                        className="border border-gray-500 py-1 px-2 rounded-[6px] w-full"
                      />
                      {name === "Password" && (
                        <span
                          className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                      )}
                    </div>
                    {name === "Email" && emailError && <span className="text-red-700">{emailError}</span>}
                    {name === "Full Name" && fullNameError && <span className="text-red-700">{fullNameError}</span>}
                    {name === "Password" && passwordError && <span className="text-red-700">{passwordError}</span>}
                  </div>
                ))}

                {/* Sign Up Button */}
                <button onClick={handleSignUp} className="px-[32px] py-[8px] bg-mainColor text-white rounded-[8px] cursor-pointer w-full" disabled={loading}>
                  {loading ? "Loading..." : "Sign Up"}
                </button>

                {/* Google Signup */}
                <button onClick={handleGoogleSignup} className="flex items-center justify-center px-[32px] py-[8px] border border-gray-500 text-gray-700 rounded-[8px] cursor-pointer w-full mt-4" disabled={loading}>
                  <FcGoogle className="mr-2" size={20} />
                  {loading ? "Loading..." : "Sign up with Google"}
                </button>

                {/* Facebook Signup */}
                <button onClick={handleFacebookSignup} className="flex items-center justify-center px-[32px] py-[8px] border border-gray-500 text-gray-700 rounded-[8px] cursor-pointer w-full mt-4" disabled={loading}>
                  <FaFacebook className="mr-2 text-blue-700" size={20} />
                  {loading ? "Loading..." : "Sign up with Facebook"}
                </button>
              </form>

              <p className="mt-[24px]">
                Already have an account? <Link to="/signin" className="text-blue-700 hover:underline">Sign In</Link>
              </p>
            </div>
          </div>

          {/* Registration Image */}
          <div className="w-[50%] overflow-hidden h-screen">
            <img src={Registratio} alt="Register" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
