import { logo } from "../../Assets/index.js";
import { MdLocationOn } from "react-icons/md";
import { RiArrowDropDownFill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { LiaCartPlusSolid } from "react-icons/lia";
import { useEffect, useRef, useState } from "react";
import { allItems } from "../../constants/index.js";
import HeaderBottom from "./HeaderBottom.jsx";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo, userSignOut } from "../../redux/amazonSlice.js";
import { getAuth, signOut } from "firebase/auth";
import { RiLogoutBoxRLine } from "react-icons/ri";

const Header = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.amazonReducer.products);
  const userInfo = useSelector((state) => state.amazonReducer.userInfo);
  const ref = useRef();
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.target.contains(ref.current)) {
        showAll && setShowAll(false);
      }
    });
  }, [ref, showAll]);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Sign out successfully");
        dispatch(userSignOut());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full sticky top-0 z-50">
      <div className="w-full mx-auto bg-amazon_blue text-white px-4 py-3 flex items-center gap-4">
        {/* ========================= Amazon-logo ======================= */}
        <div className=" headerHover p-1 ">
          <img className="w-24 mt-2 " src={logo} alt="logo" />
        </div>
        {/* ========================= Delivery-country-btn ====================== */}
        <div className="headerHover p-2 hidden mdl:inline-flex">
          <MdLocationOn />
          <p className=" text-sm text-lightText font-light flex flex-col">
            Deliver to
            <span className="text-sm font-semibold -mt-1 text-whiteText">
              India
            </span>
          </p>
        </div>

        {/* ======================== Search-bar ========================== */}

        <div className="h-10 rounded-md hidden lgl:flex flex-grow relative">
          <span className="flex items-center justify-center w-full bg-gray-200 hover:bg-gray-300 border-2 cursor-pointer duration-300 text-sm text-amazon_blue font-titleFont rounded-tl-md rounded-bl-md pl-1 ">
            All
            <span onClick={() => setShowAll(!showAll)}>
              {/* create a boolean on 'All' tag */}
              <RiArrowDropDownFill size={35} />
            </span>
            {showAll && (
              <div>
                <ul className=" absolute w-56 h-80 top-10 left-0 overflow-y-scroll overflow-hidden bg-white border-[1px] border-amazon_blue text-black p-2 flex-col gap-1 z-50">
                  {/* <li>All Department</li> */}
                  {allItems.map((item) => (
                    <li
                      className="text-sm tracking-wide font-titleFont border-b-[1px] border-b-transparent hover:border-b-amazon_blue cursor-pointer duration-200"
                      key={item._id}
                    >
                      {item.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <input
              className="h-full flex flex-grow text-base text-amazon_blue outline-none border-none px-2"
              type="text"
            />
          </span>

          <div className="w-12 h-full flex items-center justify-center bg-amazon_yellow hover:bg-[#f3a847] duration-300 text-amazon_blue cursor-pointer rounded-tr-md rounded-br-md">
            <FaSearch />
          </div>
        </div>

        {/* ======================== Sign-in  ============================= */}
        <Link to="/SignIn">
          <div className="flex flex-col items-start justify-center headerHover p-2">
            {userInfo ? (
              <p className=" text-sm text-gray-100 font-medium">
                {userInfo.userName}
              </p>
            ) : (
              <p className="text-sm mdl:text-xs text-white  mdl:text-lightText font-light">
                Hello, sign in
              </p>
            )}

            <p className="text-sm font-semibold -mt-1 text-whiteText hidden mdl:inline-flex">
              Accounts & lists{" "}
              <span>
                <RiArrowDropDownFill size={20} />
              </span>{" "}
            </p>
          </div>
        </Link>

        {/* ======================== Return & Orders  ============================= */}

        <div className=" flex-col items-start justify-center hidden headerHover p-2 mdl:inline-flex">
          <p className="text-xs text-lightText font-light">Returns</p>
          <p className="text-sm font-semibold -mt-1 text-whiteText">& Orders</p>
        </div>

        {/* ======================== Cart  ============================= */}
        <Link to="/cart">
          <div className="flex  items-start justify-center headerHover p-2 relative">
            <LiaCartPlusSolid size={30} />
            <p className=" hidden mdl:inline-flex text-xs font-semibold mt-3 text-whiteText">
              Cart
            </p>
            <span className=" absolute text-xs top-2 right-10 font-semibold p-1 h-4 bg-[#f3a847] text-amazon_blue rounded-full flex justify-center items-center ">
              {products.length > 0 ? products.length : 0}
            </span>
          </div>
        </Link>
        {/* ======================== logout  ============================= */}
        {userInfo && (
          <div
            onClick={handleLogout}
            className=" flex flex-col justify-center items-center headerHover relative"
          >
            <RiLogoutBoxRLine />
            <p className=" hidden mdl:inline-flex text-xs font-semibold text-whiteText">
              Log out
            </p>
          </div>
        )}
      </div>

      {/* ========================== Header Bottom ================== */}

      <HeaderBottom />
    </div>
  );
};

export default Header;
