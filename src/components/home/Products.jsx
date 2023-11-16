import React from "react";
import { useLoaderData } from "react-router-dom";
import { BsFillStarFill, BsCartFill, BsFillHeartFill } from "react-icons/bs";
import { BiSolidRightArrowCircle } from "react-icons/bi";
import { MdOutlineApi } from "react-icons/md";
import { addToCart } from "../../redux/amazonSlice";
import { useDispatch } from "react-redux";

const Products = () => {
  const data = useLoaderData();
  const productData = data.data;
  const dispatch = useDispatch();

  return (
    <div className=" max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  gap-6 xl:gap-10 px-4">
      {productData.map((item) => (
        <div
          key={item.id}
          className="bg-white h-auto border-[1px] border-gray-200 py-8 z-30 hover:border-transparent shadow-none hover:shadow-testShadow duration-200 relative flex flex-col gap-4"
        >
          <span className="text-xs capitalize italic absolute top-2 right-2 text-gray-600">
            {item.category}
          </span>
          <div className="w-full h-auto flex item-center justify-center relative group ">
            <img
              className="w-52 h-64 object-contain"
              src={item.image}
              alt="product image"
            />
            <ul className=" w-full h-36 bg-gray-100 absolute -bottom-[180px] group-hover:bottom-0 duration-500 flex flex-col justify-center gap-2 font-titleFont px-2 border-1 border-r">
              <li className="productLi">
                compare{" "}
                <span>
                  <MdOutlineApi />
                </span>
              </li>
              <li className="productLi">
                Add to Cart{" "}
                <span>
                  <BsCartFill />
                </span>
              </li>
              <li className="productLi">
                View Details{" "}
                <span>
                  <BiSolidRightArrowCircle />
                </span>
              </li>
              <li className="productLi">
                Add to Wish List{" "}
                <span>
                  <BsFillHeartFill />
                </span>
              </li>
            </ul>
          </div>

          <div className=" p-4 z-10 bg-white ">
            <div className="flex items-center justify-between ">
              <h2 className="font-titleFont tracking-wide text-lg text-amazon_blue font-medium">
                {item.title.substring(0, 20)}
              </h2>
              <p className="text-sm text-gray-600 font-semibold">
                ${item.price}
              </p>
            </div>
            <div>
              <p className="text-sm mb-2">
                {item.description.substring(0, 80)}
              </p>
              <div className="flex text-yellow-500 gap-1">
                <BsFillStarFill />
                <BsFillStarFill />
                <BsFillStarFill />
                <BsFillStarFill />
              </div>
            </div>
            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    price: item.price,
                    category: item.category,
                    image: item.image,
                    quantity: 1,
                  })
                )
              }
              className=" w-full font-titleFont  flex justify-center items-center font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-500 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 py1.5 rounded-md mt-3 "
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
