import React, { useState } from "react";
import lable from "../../assets/Library/Library";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import Registratio from "../Image/Registration.jpg";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";

function Index() {
  const auth = getAuth();
  const data = lable.signUpdata();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Track password visibility
  const [loading, setloading] = useState(false);

  // Error States
  const [emailError, setEmailError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "Email") {
      setEmail(value);
    } else if (name === "Full_Name") {
      setFullName(value);
    } else {
      setPassword(value);
    }
  };

  const handleSignUp = () => {
    if (!email) {
      setEmailError("Please Enter your E-Mail!");
    } else if (!fullName) {
      setFullNameError("Please Enter your Name!");
    } else if (!password) {
      setPasswordError("Please Enter your Password!");
    } else {
      setloading(true);
      setEmailError("");
      setFullNameError("");
      setPasswordError("");
      console.log(email, fullName, password);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          updateProfile(auth.currentUser, {
            displayName: fullName || "Opps!",
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          });
        })
        .then(() => {
          toast.success(
            `🦄 ${fullName} Registration Successfull`,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            }
          );
          return sendEmailVerification(auth.currentUser);
        })
        .then((mailInfo) => {
          console.log("Email sent", mailInfo);
          })
        .catch((err) => {
          console.log(`Opps! Something went wrong ${err.code}`);
          
        })
        .finally(() => {
          setloading(false);
          setEmail("");
          setPassword("");
          setFullName("");
        });
    }
  };

  console.log(auth.currentUser);

  return (
    <div className="flex items-center justify-between">
      <div className="w-[50%] h-screen flex items-center justify-center">
        <div>
          <h1 className="text-[36px] font-bold">
            Get started with easily register
          </h1>
          <p className="text-[20px] font-bold">
            Free register and you can enjoy it
          </p>
          <form
            action="#"
            className="mt-[24px]"
            onSubmit={(e) => e.preventDefault()}
          >
            {data?.map(({ name, id, requird }) => (
              <div
                className="flex flex-col gap-y-1 items-start mb-[20px] relative"
                key={id}
              >
                <label htmlFor={name}>
                  {`Enter a Valid ${name}`}
                  {requird && <span className="text-red-600">*</span>}
                </label>
                <div className="relative w-full">
                  <input
                    type={
                      name === "Password" && showPassword
                        ? "text"
                        : name === "Password"
                        ? "password"
                        : name === "Email"
                        ? "email"
                        : "text"
                    }
                    placeholder={name}
                    name={name}
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

                {name === "Email" && email === "" && (
                  <span className="text-red-700">{emailError}</span>
                )}
                {name === "Full_Name" && fullName === "" && (
                  <span className="text-red-700">{fullNameError}</span>
                )}
                {name === "Password" && password === "" && (
                  <span className="text-red-700">{passwordError}</span>
                )}
              </div>
            ))}

            {loading ? (
              <button className="px-[32px] py-[8px] bg-mainColor text-white rounded-[8px] cursor-pointer">
                {" "}
                Loading....
              </button>
            ) : (
              <button
                onClick={handleSignUp}
                className="px-[32px] py-[8px] bg-mainColor text-white rounded-[8px] cursor-pointer"
              >
                Sign Up
              </button>
            )}
          </form>

          <p className="mt-[24px]">
            Already have an account?{" "}
            <span className="decoration-red-700">Sign In</span>
          </p>
        </div>
      </div>
      <div className="w-[50%]">
        <img src={Registratio} alt={Registratio} />
      </div>
    </div>
  );
}

export default Index;
