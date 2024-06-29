import React, { useEffect, useRef, useState } from "react";
import fetchCategoryProducts from "../helper/fetchCategoryProducts";
import formatPrice from "../helper/currencyConverter";
import { Link } from "react-router-dom";
import addToCart from "../helper/addToCart";


function RecommendedProducts({ category, heading }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);
  const scrollRef = useRef();

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

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto  my-6 relative ">
      <h2 className="text-2xl font-semibold py-2">{heading}</h2>

      
      {/* Scrollable Content */}
      <div
        className="flex justify-evenly gap-4 md:gap-6 flex-wrap"
        ref={scrollRef}
      >
        {loading
          ?  loadingList.map((product, ind) => (
            <div
              className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white shadow-sm "
              key={ind}
            >
              <div className="bg-slate-200 p-2 h-48 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse">
                
              </div>
              <div className="p-4 grid gap-3 animate-pulse">
                <h2 className="font-medium text-ellipsis line-clamp-1 text-xl bg-slate-100 p-2">
                  {product?.productName}
                </h2>
                <p className="capitalize text-slate-500 font-semibold bg-slate-100 p-2">
                  {product?.category}
                </p>
                <div className="flex gap-3 text-lg font-semibold w-full">
                  <p className="text-red-500 font-medium bg-slate-100 p-2 w-full">
                   
                  </p>
                  <p className="text-slate-500 line-through bg-slate-100 p-2 w-full">
                    
                  </p>
                </div>
                <button className="bg-slate-100 p-3 transition-all text-sm rounded text-white font-medium">
                 
                </button>
              </div>
            </div>
          ))
          : data.map((product, ind) => (
              <Link to={"product/"+product?._id}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white shadow-sm "
                key={ind}
              >
                <div className="bg-slate-200 p-2 h-48 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                  <img
                    src={product.productImage[0]}
                    alt=""
                    className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                  />
                </div>
                <div className="p-4 grid gap-3">
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
                  <button className="bg-red-500 hover:bg-red-600 transition-all p-1 text-sm rounded text-white font-medium"  onClick={(e)=>addToCart(e,product?._id)}>
                    Add to cart
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}

export default RecommendedProducts;
