import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AmazonDarkLogo, logo } from "../Assets/index.js";
import { AiFillCaretRight } from "react-icons/ai";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/amazonSlice.js";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth(); //firebase

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error message
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");

  // Firebase error when incorrect sign-in
  const [userEmailErr, setUserEmailErr] = useState("");
  const [userPassErr, setUserPassErr] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail(" ");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword(" ");
  };

  // email validation starts here
  const emailValidation = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}$/;
    return regex.test(email.toLowerCase());
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) {
      setErrEmail("Enter your Email");
    }

    if (!password) {
      setErrPassword("Enter your Password");
    }
    if (email && password) {
      // Sign-in authentication with firebase
      setLoading(true); // when setLoading is true then authenticate
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          //dispatch
          dispatch(
            setUserInfo({
              _id: user.id,
              userName: user.displayName,
              email: user.email,
              image: user.photoURL,
            })
          );
          // ...
          setLoading(false);
          setSuccessMsg("Logged in Successfully! Welcome back");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch((error) => {
          console.error("Firebase Error:", error.code, error.message);
          setLoading(false);
          const errorCode = error.code;
          if (errorCode === "auth/invalid-email") {
            setUserEmailErr("Invalid Email");
          } else if (errorCode === "auth/wrong-password") {
            setUserPassErr("Wrong password! try again");
          }
          console.log("Something is up, try with correct credential!");
        });
      // set email and password field as blank after continue button
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className=" w-full">
      <div className=" w-full bg-gray-200 py-10">
        {successMsg ? (
          <div className=" w-full flex justify-center items-center py-32">
            <p className=" border-[1px] border-green-600 text-green-500 font-titleFont text-lg font-semibold px-6 py-2">
              {successMsg}
            </p>
          </div>
        ) : (
          <form className=" w-[350px] mx-auto flex flex-col items-center">
            {/* AmazonLogo */}
            <img className="w-32 " src={AmazonDarkLogo} alt="AmazonDarkLogo" />
            <div className=" w-full border border-zinc-400  p-6">
              <h2 className=" font-titleFont text-3xl font-medium mb-4">
                Sign in
              </h2>
              {/* Signin inputs */}
              <div className="flex flex-col gap-3">
                <div className=" flex flex-col gap-2">
                  <p className=" text-sm font-medium">
                    {" "}
                    Email or mobile phone number
                  </p>
                  <input
                    onChange={handleEmail}
                    className="w-full lowercase py-1 border border-zinc-600 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                    type="email"
                    maxLength="30"
                    value={email}
                  />
                  {/* Email error  */}

                  {errEmail && (
                    <p className=" text-red-600 text-xs font-bold">
                      {errEmail}
                    </p>
                  )}

                  {userEmailErr && (
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center">
                      {userEmailErr}
                    </p>
                  )}
                </div>
                <div className=" flex flex-col gap-2">
                  <p className=" text-sm font-medium"> Password</p>
                  <input
                    onChange={handlePassword}
                    className="w-full py-1 border border-zinc-600 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                    type="password"
                    maxLength="30"
                    value={password}
                  />
                  {errPassword && (
                    <p className=" text-red-600 text-xs font-bold">
                      {errPassword}
                    </p>
                  )}
                  {userPassErr && (
                    <p className=" text-red-600 text-xs font-bold">
                      {userPassErr}
                    </p>
                  )}
                </div>
                {/* Continue button */}
                <button
                  onClick={handleLogin}
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

                <p className=" text-xs text-black leading-4 mt-4">
                  By Continuing you agree to Amazon's{" "}
                  <span className=" text-blue-800 ">Conditions of use</span> and{" "}
                  <span className=" text-blue-800 ">Private Notice.</span>
                </p>
                <p className=" text-xs flex text-gray-800 mt-4 cursor-pointer group ">
                  <AiFillCaretRight />{" "}
                  <span className=" text-blue-600  group-hover:text-orange-700 group-hover:underline underline-offset-1">
                    Need help?
                  </span>
                </p>
              </div>
            </div>
            {/* Need Help section */}
            <div className=" w-full text-xs text-gray-600 mt-4 flex items-center">
              <span className=" w-1/3 h-[1px] bg-zinc-400 inline-flex"></span>
              <span className=" w-1/3 px-4 ">New to Amazon?</span>
              <span className=" w-1/3 h-[1px] bg-zinc-400 inline-flex"></span>
            </div>

            <Link className="w-full" to="/registration">
              <button className=" w-full py-1.5 mt-4 text-sm font-normal rounded-sm bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput">
                Create your Amazon account
              </button>
            </Link>
          </form>
        )}
      </div>

      <div className=" w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4 justify-center items-center py-10">
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

export default SignIn;
