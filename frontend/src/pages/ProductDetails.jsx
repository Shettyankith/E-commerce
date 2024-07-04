import React, { useState, useEffect, useCallback,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import summaryAPI from "../common/index";
import currencyCoverter from "../helper/currencyConverter";
import RecommendedProducts from "../components/RecommendedProducts";
import context from "../context";
import addToCart from "../helper/addToCart";

function ProductDetails() {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    price: "",
    sellingPrice: "",
    productImage: [],
    description: "",
  });

  const params = useParams();
  const [loading, setloading] = useState(false);
  const loadingImageList = new Array(4).fill(null);
  const [activeImage, setactiveImage] = useState("");
  const Context=useContext(context);
  const navigate=useNavigate();
  const [coordinate, setcoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoom, setzoom] = useState(false);

  //Fetching the product details
  const fetchProductDetails = async () => {
    setloading(true);
    const response = await fetch(summaryAPI.productDetails.url, {
      method: summaryAPI.productDetails.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //embed the id to req body
        id: params.id,
      }),
    });

    const data = await response.json();
    //Off the loading state
    setloading(false);
    setData(data?.data);
    //Setting the first image as default active image
    setactiveImage(data?.data?.productImage[0]);
  };

  //To set the active image
  const handleActiveImage = (imageURL) => {
    setactiveImage(imageURL);
  };

  //Soom image coordinate fetching
  const handleZoomIn = useCallback(
    (e) => {
      setzoom(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setcoordinate({ x, y });
    },
    [coordinate]
  );

  const closeZoomImage=()=>{
    setzoom(false);
  }

  useEffect(() => {
    fetchProductDetails();
  }, [params.id]);

  const handleAddToCart=async(e,id)=>{
    await addToCart(e,id);
    Context.fetchCartCount();
  }

  const handleBuyButton=async(e,id)=>{
    await addToCart(e,id);
    Context.fetchCartCount();
    navigate("/cart")
  }

  return (
    <div className="container mx-auto p-4 mt-8">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* Product image */}
        <div className="h-96 flex flex-col md:flex-row-reverse gap-4 justify-center">
          {/* To display the images */}
          <div
            className="h-[300px] w-[300px] lg:h-full lg:w-96 bg-slate-200 relative"
            onMouseMove={handleZoomIn} onMouseLeave={closeZoomImage}
          >
            <img
              src={activeImage}
              alt="Product Image"
              className="h-full w-full object-scale-down mix-blend-multiply"
            />
            {/* Zoom image */}
            {zoom && (
              <div className="hidden lg:block absolute h-[400px] w-[400px] overflow-hidden bg-slate-200 p-1 top-0 -right-[410px]">
                <div
                  className="w-full h-full mix-blend-multiply scale-125 "
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundPosition: `${coordinate.x * 100}% ${
                      coordinate.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>

          <div className="h-full">
            {/* Displaying loading image skeletons */}
            {loading ? (
              <div className="flex gap-2 md:flex-col overflow-scroll scroller h-full">
                {loadingImageList.map((el, index) => (
                  <div
                    className="h-20 w-20 bg-slate-200 animate-pulse"
                    key={`loadingImage${index}`}
                  ></div>
                ))}
              </div>
            ) : (
              <div className="flex gap-2 md:flex-col overflow-scroll scroller h-full">
                {/* Displaying actual images */}
                {data?.productImage?.map((image, index) => (
                  <div
                    className="h-20 w-20 bg-slate-200 rounded p-1 cursor-pointer"
                    key={index}
                    onMouseEnter={() => handleActiveImage(image)}
                    onClick={() => handleActiveImage(image)}
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-scale-down mix-blend-multiply"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Product Details */}
        {loading ? (
          <div className="flex flex-col gap-4 w-full">
            <p className="bg-slate-200 w-full p-4 animate-pulse font-medium"></p>
            <p className="text-2xl lg:text-4xl font-medium bg-slate-200 w-full p-4 animate-pulse"></p>
            <p className="text-slate-500 capitalize font-semibold bg-slate-200 w-full p-4 animate-pulse"></p>
            {/* Rating stars */}
            <div className="flex gap-1 text-yellow-400 bg-slate-200 w-full p-4 animate-pulse"></div>

            <div className="flex text-2xl lg:text-3xl gap-4">
              <p className=" font-medium bg-slate-200 w-full p-4 animate-pulse"></p>
              <p className=" font-light line-through bg-slate-200 w-full p-4 animate-pulse"></p>
            </div>

            <div className="gap-4 flex ">
              <button className="bg-slate-200 w-full p-4 animate-pulse"></button>
              <button className="bg-slate-200 w-full p-4 animate-pulse"></button>
            </div>

            <div className="bg-slate-200 w-full p-12 animate-pulse"></div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="bg-red-100 rounded-full w-fit text-red-500 px-2 py-1 font-medium">
              {data?.brandName}
            </p>
            <p className="text-2xl lg:text-4xl font-medium">
              {data?.productName}
            </p>
            <p className="text-slate-500 capitalize font-semibold">
              {data?.category}
            </p>
            {/* Rating stars */}
            <div className="flex gap-1 text-yellow-400">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star-half"></i>
            </div>

            <div className="flex text-2xl lg:text-3xl gap-4">
              <p className="text-red-500 font-medium">
                {currencyCoverter(data?.sellingPrice)}
              </p>
              <p className="text-slate-500 font-light line-through">
                {currencyCoverter(data?.price)}
              </p>
            </div>

            <div className="gap-4">
              <button className="text-red-500 p-2 rounded border-red-500 font-medium border-2 border mx-3 transition-all hover:bg-red-500 hover:text-white"
              onClick={(e)=>{handleBuyButton(e,data?._id)}}
              >
                Buy Now
              </button>
              <button className="bg-red-500 text-white rounded  p-2  font-medium mx-3 transition-all hover:bg-slate-100 hover:text-red-500 hover:border-2 hover:border-red-500" onClick={(e)=>{handleAddToCart(e,data?._id)}}>
                Add To Cart
              </button>
            </div>

            <div>
              <p className="text-slate-600 font-meduim my-1">Description:</p>
              <p className="text-justify">{data?.description}</p>
            </div>
          </div>
        )}
      </div>

      {
        data.category &&  <RecommendedProducts category={data?.category} heading={"Recommended Products"}/>
      }

     
    </div>
  );
}

export default ProductDetails;
