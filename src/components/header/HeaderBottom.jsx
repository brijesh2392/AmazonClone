import React, { useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdAccountCircle } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import SideNavContent from "./SideNavContent.jsx";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";


const HeaderBottom = () => {
  const userInfo = useSelector((state) => state.amazonReducer.userInfo);
  const ref = useRef();
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.target.contains(ref.current)) {
        setSidebar(false);
      }
    });
  }, [ref, sidebar]); //optional dependency but required for fullwebsite
  return (
    <div className="w-full px-4 h-[36px] bg-amazon_light text-white flex items-center">
      {/* ====== list-item ======  */}
      <ul className=" flex items-center gap-2 text-sm tracking-wide">
        <li
          onClick={() => setSidebar(true)}
          className="headerHover flex justify-center items-center gap-1"
        >
          <GiHamburgerMenu />
          All
        </li>
        <li className="headerHover hidden md:inline-flex">Customer Service</li>
        <li className="headerHover hidden md:inline-flex">Today's Deals</li>
        <li className="headerHover hidden md:inline-flex">Gift Cards</li>
        <li className="headerHover hidden md:inline-flex">Registry</li>
        <li className="headerHover hidden md:inline-flex">Sell</li>
      </ul>
      {/* ====== side-Nav ======  */}
      {sidebar && (
        <div className="w-full h-screen text-black fixed top-0 left-0 bg-amazon_blue bg-opacity-50 z-20">
          {" "}
          {/*for creating sideNav transparent block behind*/}
          <div className=" w-full h-full relative">
            <motion.div
              ref={ref}
              initial={{ x: -500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className=" w-[80%] md:w-[350px] h-full bg-white border-black"
            >
              {/*for creating sidenav bar in side */}
              <div className="w-full bg-amazon_light text-white py-1 px-6 flex items-center gap-4">
                {userInfo ? (
                  <img
                    className=" w-10 h-10 rounded-full"
                    src={userInfo.image}
                    alt="userImg"
                  />
                ) : (
                  <MdAccountCircle size={20} />
                )}

                {userInfo ? (
                  <h4 className=" font-bodyFont font-bold text-lg tracking-wide">
                    {userInfo.userName}
                  </h4>
                ) : (
                  <h4 className=" font-bodyFont font-bold text-lg tracking-wide">
                    Hello, Sign In
                  </h4>
                )}
              </div>
              <SideNavContent
                title="Digital Content & Devices"
                one="Amazon Music"
                two="Kindle E-readers & Books"
                three="Amazon Appstore"
              />
              <SideNavContent
                title="Shop by Department"
                one="Electronics"
                two="Computers"
                three="Smart Home"
              />
              <SideNavContent
                title="Programs and Features"
                one="Gift cards"
                two="Amazon live"
                three="International Shopping"
              />
              <SideNavContent
                title="Help & Settings"
                one="Your Account"
                two="Customer service"
                three="Smart Home"
              />
              {/* close-btn setSidebar false switch off the sidebar */}
              <span
                onClick={() => setSidebar(false)}
                className=" cursor-pointer absolute top-0 left-[82%] md:left-[360px] w-10 h-10 text-black flex items-center justify-center border bg-gray-200 hover:bg-red-500 hover:text-white duration-300"
              >
                <AiOutlineClose />
              </span>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderBottom;
