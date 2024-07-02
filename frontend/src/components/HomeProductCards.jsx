import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryProducts from "../helper/fetchCategoryProducts";
import formatPrice from "../helper/currencyConverter";
import { Link } from "react-router-dom";
import addToCart from "../helper/addToCart";
import context from "../context";

function HomeProductCards({ category, heading }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);
  const scrollRef = useRef();
  const Context=useContext(context);

  const fetchProducts = async () => {
    setLoading(true);
    const productData = await fetchCategoryProducts(category);
    setLoading(false);
    setData(productData?.data);
  };

  const scrollRight = () => {
    scrollRef.current.scrollLeft += 300;
  };

  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 300;
  };

  const handleAddToCart=async(e,id)=>{
    await addToCart(e,id);
    Context.fetchCartCount();
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto  my-6 relative ">
      <h2 className="text-2xl font-semibold py-2">{heading}</h2>

      {/* Scroll Buttons */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 bottom-10 transform mr-4 -translate-y-1/2 z-10 hidden md:block"
      >
        <i className="fa-solid fa-circle-chevron-left text-red-600 text-2xl"></i>
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-0 bottom-10 transform -translate-y-1/2 z-10"
      >
        <i className="fa-solid fa-circle-chevron-right text-red-600 text-2xl hidden md:block"></i>
      </button>

      {/* Scrollable Content */}
      <div
        className="flex justify-center gap-4 md:gap-6 overflow-scroll scroller transition-all"
        ref={scrollRef}
      >
        {loading
          ? loadingList.map((product, ind) => (
            <div
              className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white shadow-sm flex "
              key={ind}
            >
              <div className="bg-slate-200 p-2 h-full min-w-[120px] md:min-w-[145px] animate-pulse">
                
              </div>
              <div className="p-4 grid gap-2 w-full animate-pulse">
                <h2 className="font-medium text-ellipsis line-clamp-1 text-xl bg-slate-100 ">
                  {product?.productName}
                </h2>
                <p className="capitalize text-slate-500 font-semibold bg-slate-100">
                  {product?.category}
                </p>
                <div className="flex gap-3 text-lg font-semibold ">
                  <p className="text-slate-500  font-medium bg-slate-100 p-2 w-full">
                   {product?.sellingPrice}
                  </p>
                  <p className="text-slate-500 line-through bg-slate-100 p-2 w-full">
                  {product?.price}
                  </p>
                </div>
                <button className="bg-slate-100  transition-all p-2 text-sm rounded text-slate-100 font-medium">
                  
                </button>
              </div>
            </div>
          ))
          : data.map((product, ind) => (
              <Link to={"product/"+product?._id}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white shadow-sm flex"
                key={ind}
              >
                <div className="bg-slate-200 p-2 h-full min-w-[120px] md:min-w-[145px]">
                  <img
                    src={product.productImage[0]}
                    alt=""
                    className="object-scale-down h-full hover:scale-110 transition-all"
                  />
                </div>
                <div className="p-4 grid">
                  <h2 className="font-medium text-ellipsis line-clamp-1 text-xl">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-slate-500 font-semibold">
                    {product?.category}
                  </p>
                  <div className="flex gap-3 text-lg font-semibold">
                    <p className="text-red-500 font-medium">
                      {formatPrice(product?.sellingPrice)}
                    </p>
                    <p className="text-slate-500 line-through">
                      {formatPrice(product?.price)}
                    </p>
                  </div>
                  <button className="bg-red-500 hover:bg-red-600 transition-all p-1 text-sm rounded text-white font-medium" onClick={(e)=>handleAddToCart(e,product?._id)}>
                    Add to cart
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}

export default HomeProductCards;
