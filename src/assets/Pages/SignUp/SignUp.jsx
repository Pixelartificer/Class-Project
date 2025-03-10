import React, { useState } from "react";
import { Link } from "react-router-dom";
import lable from "../../Library/Library";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import Registratio from "../../Image/Registration.jpg";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";

function index() {
  const auth = getAuth();
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
    if (name === "Email") {
      setEmail(value);
      setEmailError("");
    } else if (name === "Full_Name") {
      setFullName(value);
      setFullNameError("");
    } else {
      setPassword(value);
      setPasswordError("");
    }
  };

  const handleSignUp = async () => {
    if (!email) return setEmailError("Please enter your email!");
    if (!fullName) return setFullNameError("Please enter your name!");
    if (!password) return setPasswordError("Please enter your password!");

    try {
      setLoading(true);

      const userInfo = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, {
        displayName: fullName,
        photoURL: "https://example.com/jane-q-user/profile.jpg",
      });

      await sendEmailVerification(auth.currentUser);

      toast.success(`🦄 ${fullName}, Registration Successful!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      setEmail("");
      setFullName("");
      setPassword("");
    } catch (err) {
      console.error("Error:", err.code);
      toast.error(`⚠️ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between w-[90%] m-auto">
      <div className="w-[50%] h-screen flex items-center justify-center">
        <div>
          <h1 className="text-[36px] font-bold">
            Get started with easy registration
          </h1>
          <p className="text-[20px] font-bold">
            Free register and enjoy our services
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-[24px]">
            {data?.map(({ name, id, requird }) => (
              <div
                className="flex flex-col gap-y-1 items-start mb-[20px] relative"
                key={id}
              >
                <label htmlFor={name}>
                  {`Enter a valid ${name}`}
                  {requird && <span className="text-red-600">*</span>}
                </label>
                <div className="relative w-full">
                  <input
                    type={
                      name === "Password"
                        ? showPassword
                          ? "text"
                          : "password"
                        : name === "Email"
                        ? "email"
                        : "text"
                    }
                    placeholder={name}
                    name={name}
                    value={
                      name === "Email"
                        ? email
                        : name === "Full_Name"
                        ? fullName
                        : password
                    }
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

                {name === "Email" && emailError && (
                  <span className="text-red-700">{emailError}</span>
                )}
                {name === "Full_Name" && fullNameError && (
                  <span className="text-red-700">{fullNameError}</span>
                )}
                {name === "Password" && passwordError && (
                  <span className="text-red-700">{passwordError}</span>
                )}
              </div>
            ))}

            <button
              onClick={handleSignUp}
              className="px-[32px] py-[8px] bg-mainColor text-white rounded-[8px] cursor-pointer"
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-[24px]">
            Already have an account?{" "}
            <Link
              to={"/signin"}
              className="text-blue-700 cursor-pointer hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <div className="w-[50%]">
        <img src={Registratio} alt={Registratio} />
      </div>
    </div>
  );
}

export default index;
