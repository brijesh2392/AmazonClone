import React, { useState } from "react";
import { AmazonDarkLogo, logo } from "../assets/index";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { AiFillCaretRight } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { RotatingLines } from "react-loader-spinner";

const Registration = () => {
  const navigate = useNavigate(); // to redirect to login page after registration
  const auth = getAuth();
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  // Error message
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errCPassword, setErrCPassword] = useState("");
  const [firebaseErr, setFirebaseErr] = useState("");

  //Loading spinners
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // handle function start

  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName(""); // to remove the error text below input when typed
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleCPassword = (e) => {
    setCPassword(e.target.value);
    setErrCPassword("");
  };
  // email validation starts here
  const emailValidation = (email) => {
    return email
      .toLowerCase()
      .match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
  };

  //   submit button starts here
  const handleRegistration = (e) => {
    e.preventDefault();
    if (!clientName) {
      setErrClientName("Enter your name");
    }
    if (!email) {
      setErrEmail("Enter your email");
      setFirebaseErr("");
    } else {
      if (!emailValidation(email)) {
        setErrEmail("Enter a valid email");
      }
    }
    if (!password) {
      setErrPassword("Enter your password");
    } else {
      if (password.length < 6) {
        setErrPassword("Password must be 6 character");
      }
    }
    if (!cPassword) {
      setErrCPassword("Confirm your password ");
    } else {
      if (cPassword !== password) {
        setErrCPassword("Password not matched");
      }
    }
    if (
      clientName &&
      email &&
      emailValidation(email) &&
      password &&
      password.length >= 6 &&
      cPassword &&
      cPassword === password
    ) {
      console.log(clientName, email, password, cPassword);

      // firebase Authentication
      //  *********** once the firebase is fired loading will start ***********
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: clientName,
            photoURL: "https://picsum.photos/200",
          });

          // Signed in
          const user = userCredential.user;

          //*****************/ once firebase completes **********
          setLoading(false);
          setSuccessMsg("Account created successfully"); // show msg to user
          setTimeout(() => {
            // to redirect to sign-in page after 3 sec
            navigate("/signin");
          }, 3000);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          // const errorMessage = error.message;
          if (errorCode.includes("auth/email-already-in-use")) {
            setFirebaseErr("Email already in use, try another one");
          }
          console.log(errorCode, errorMessage);
          // ..
        });

      setClientName("");
      setEmail("");
      setPassword("");
      setCPassword("");
    }
  };

  return (
    <div className=" w-full">
      <div className="w-full bg-gray-100 pb-10">
        <form className=" w-[370px] mx-auto flex flex-col items-center">
          <img
            className=" w-32 pt-10"
            src={AmazonDarkLogo}
            alt="AmazonDarkLogo"
          />

          <div className=" w-full border border-zinc-200 p-6">
            <h2 className=" font-titleFont text-3xl font-medium mb-4">
              Create Account
            </h2>
            <div className=" flex flex-col gap-3">
              <div className=" flex flex-col gap-2">
                <p className=" text-sm font-medium ">Your Name</p>
                <input
                  onChange={handleName}
                  value={clientName}
                  className="w-full py-1 border border-zinc-600 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="text"
                />
                {errClientName && (
                  <p className=" text-red-600 text-xs font-bold">
                    <span className=" text-red-600 text-xs font-bold">!</span>{" "}
                    {errClientName}
                  </p>
                )}
                {firebaseErr && (
                  <p className=" text-red-600 text-xs font-bold">
                    <span className=" text-red-600 text-xs font-bold">!</span>{" "}
                    {firebaseErr}
                  </p>
                )}
              </div>
              <div className=" flex flex-col gap-2">
                <p className=" text-sm font-medium ">
                  Email or mobile phone number
                </p>
                <input
                  onChange={handleEmail}
                  value={email}
                  className="w-full lowercase py-1 border border-zinc-600 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="email"
                />
                {errEmail && (
                  <p className=" text-red-600 text-xs font-bold">
                    <span className=" text-red-600 text-xs font-bold">!</span>{" "}
                    {errEmail}
                  </p>
                )}
              </div>
              <div className=" flex flex-col gap-2">
                <p className=" text-sm font-medium ">Password</p>
                <input
                  onChange={handlePassword}
                  value={password}
                  className="w-full  py-1 border border-zinc-600 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="Password"
                />
                {errPassword && (
                  <p className=" text-red-600 text-xs font-bold">
                    <span className=" text-red-600 text-xs font-bold">!</span>{" "}
                    {errPassword}
                  </p>
                )}
              </div>
              <div className=" flex flex-col gap-2">
                <p className=" text-sm font-medium ">Re-enter Password</p>
                <input
                  onChange={handleCPassword}
                  value={cPassword}
                  className="w-full  py-1 border border-zinc-600 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="Password"
                />
                {errCPassword && (
                  <p className=" text-red-600 text-xs font-bold">
                    <span className=" text-red-600 text-xs font-bold">!</span>{" "}
                    {errCPassword}
                  </p>
                )}
              </div>
              <p className=" text-ms text-gray-600">
                Passwords must be at least 6 characters.
              </p>
            </div>
            <button
              onClick={handleRegistration}
              className=" w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-600 active:border-yellow-800 active:shadow-amazonInput "
            >
              Continue
            </button>
            {/* ****** for creating spinning effect when loading state starts ****** */}
            {loading && (
              <div className=" flex justify-center">
                <RotatingLines
                  strokeColor="#febd69"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="50"
                  visible={true}
                />
              </div>
            )}
            {/* ******* After loading success msg ******** */}
            {successMsg && (
              <div>
                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className=" text-base font-titleFont text-green-500 border-[1px] border-green-500 px-2 text-center"
                >
                  {successMsg}
                </motion.p>
              </div>
            )}
            <p className=" text-sm text-black leading-4 mt-4 ">
              By Creating an account, you agree to Amazon's{" "}
              <span className=" text-blue-800 ">Conditions of use</span> and{" "}
              <span className=" text-blue-800 ">Private Notice.</span>
            </p>
            <div>
              <p className=" text-ms text-black py-1">
                Already have an account?{" "}
                <Link to="/signin">
                  <span className=" text-ms text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100 inline-flex">
                    Sign in
                    <span>
                      <AiFillCaretRight size={20} />
                    </span>
                  </span>
                </Link>
              </p>
              <p className=" text-ms text-black -mt-2 ">
                Buying for work?{" "}
                <span className="text-ms text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
                  Create a business account
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
      <div className=" w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-2 justify-center items-center py-5">
        <div className=" flex items-center gap-6">
          <p className=" text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Condition of Use
          </p>
          <p className=" text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Privacy Notice
          </p>
          <p className=" text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Help
          </p>
        </div>
        <p className=" text-xs text-gray-600">
          © 1996-2023, Amazon.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
};

export default Registration;
