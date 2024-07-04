import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import summaryAPI from "../common/index";
import { toast } from "react-toastify";
import context from "../context";
import formatPrice from "../helper/currencyConverter";

function Cart() {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const Context = useContext(context);
  //initializeloading state with cartCOunt value
  const loadingCart = new Array(Context.cartCount).fill(null);

  const fetchCartProducts = async () => {
    setloading(true)
    const response = await fetch(summaryAPI.dsiplayCart.url, {
      method: summaryAPI.dsiplayCart.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await response.json();

    if (data.success) {
      setdata(data.data);
    }
    setloading(false)
  };

  //Increase product quantity
  const incQuantity = async (id, quantity) => {
    const response = await fetch(summaryAPI.updateQuantity.url, {
      method: summaryAPI.updateQuantity.method, 
      credentials: "include",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
        _id: id,
        newQuantity: quantity + 1,
      }),
    });
  
    const data = await response.json();
  
    if (data.success) {
      fetchCartProducts();
    }
  };
  
  const decQuantity = async (id, quantity) => {
    if (quantity >= 2) {
      const response = await fetch(summaryAPI.updateQuantity.url, {
        method: summaryAPI.updateQuantity.method, 
        credentials: "include",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({
          _id: id,
          newQuantity: quantity - 1, 
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        fetchCartProducts();
      }
    }
  };
  
  const deleteCartProduct=async(id)=>{
    const response = await fetch(summaryAPI.deleteCartProduct.url, {
        method: summaryAPI.deleteCartProduct.method, 
        credentials: "include",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({
          _id: id,
        }),
      });
    
      const data = await response.json();
    
      if (data.success) {
        Context.fetchCartCount();
        fetchCartProducts();
      }
  }


  useEffect(() => {
    fetchCartProducts();
  }, []);

  // Calculating the total price
  const totalQuantity=data.reduce((prev,curr)=>prev+curr.quantity,0)
  const totalPrice=data.reduce((prev,curr)=>prev+(curr.quantity*curr.productId?.sellingPrice),0)

  return (
    <div className="container mx-auto lg:my-4 p-4">
      <div className="text-center text-lg ">
        {data.length === 0 && !loading && (
          <div className="bg-white p-5 gap-2">
            <p className="font-medium mb-3">No products in the cart</p>
            <Link
              className="bg-red-500 text-white font-medium p-2 cursor-pointer rounded"
              to={"/"}
            >
              Add Products
            </Link>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between">
        {/* cart product max-w-3xl*/}
        <div className="w-full  max-w-5xl">
          {loading
            ? loadingCart.map((el, ind) => {
                return (
                  <div
                    key={ind}
                    className="w-full bg-white h-32 my-2 rounded flex"
                  >
                    <div className="w-32 h-32 bg-slate-200 animate-pulse">
                     
                    </div>
                    <div className="px-2 py-1 w-full relative gap-2">
                        {/* Delete product */}
                        <div className="absolute bottom-0 md:bottom-20 bo right-0 m-2 bg-slate-100  cursor-pointer tetx-lg p-4 transition-all rounded-full "
                        >
                            
                        </div>
                        {/* Product details */}
                      <h2 className="text-ellipsis line-clamp-1 text-lg lg:text-xl p-3 bg-slate-100 animate-pulse max-w-3xl w-30 m-2">
                       
                      </h2>
                      <p className="text-slate-500 font-medium capitalize p-3 bg-slate-100 animate-pulse max-w-3xl m-2">
                       
                      </p>
                      <div className="w-full flex justify-between m-2 max-w-40 md:max-w-3xl">
                          <p className="text-red-500 font-medium p-3 bg-slate-100 animate-pulse  w-full ">
                            
                          </p>
                          <p className="text-slate-500 font-medium  px-2 py-1  p-3 bg-slate-100 animate-pulse  w-full">
                            
                          </p>
                      </div>
                      
                    </div>
                  </div>
                );
              })
            : data.map((item, ind) => {
                return (
                  <div
                    key={ind}
                    className="w-full bg-white h-32 my-2 rounded flex"
                  >
                    <div className="w-32 h-32 bg-slate-200">
                      <img
                        src={item?.productId?.productImage[0]}
                        alt="Product Image"
                        className="mix-blend-multiply object-scale-down w-full h-full"
                      />
                    </div>
                    <div className="px-2 py-1 w-full relative">
                        {/* Delete product */}
                        <div className="absolute bottom-0 md:bottom-20 bo right-0 m-2 text-red-500 cursor-pointer tetx-lg hover:bg-red-500 hover:text-white px-2 py-1 transition-all rounded-full "
                         onClick={() => {
                            deleteCartProduct(item?._id);
                          }}>
                            <i className="fa-solid fa-trash-can"></i>  
                        </div>
                        {/* Product details */}
                      <h2 className="text-ellipsis line-clamp-1 text-lg lg:text-xl ">
                        {item?.productId?.productName}
                      </h2>
                      <p className="text-slate-500 font-medium capitalize">
                        {item?.productId?.category}
                      </p>
                      <div className="w-full flex justify-between">
                          <p className="text-red-500 font-medium">
                            {formatPrice(item?.productId?.sellingPrice)}
                          </p>
                          <p className="text-slate-500 font-medium bg-slate-200 px-2 py-1 rounded-full">
                            {formatPrice(item?.productId?.sellingPrice * item?.quantity)}
                          </p>
                      </div>
                      <div>
                        <button className="border-2 border-red-500 px-2 rounded m-1 hover:bg-red-500 hover:text-white font-medium text-lg"
                        onClick={() => {
                            decQuantity(item?._id, item?.quantity);
                          }}>
                          -
                        </button>
                        <span>{item?.quantity}</span>
                        <button
                          className="border-2 border-red-500 px-2 rounded m-1 hover:bg-red-500 hover:text-white font-medium text-lg"
                          onClick={() => {
                            incQuantity(item?._id, item?.quantity);
                          }}
                        >      
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
        {/* Total cart cost */}
        <div className="mb-7 lg:mt-2 w-full lg:max-w-sm">
          {loading ? (
            <div className="h-36 bg-white ">
            <p className="bg-red-500 text-white p-3 font-medium text-xl">Summary</p>
            <div className="flex items-center justify-between text-lg font-medium px-2 py-1">
              <p>Quantity</p>
              <p className="p-3 bg-slate-200 w-20 animate-pulse"></p>
            </div>
            <div className="flex items-center justify-between text-lg font-medium px-2 py-1">
              <p>Total Price</p>
              <p className="p-3 bg-slate-200 w-20 animate-pulse"></p>
            </div>
            <button className="w-full bg-slate-200 p-6 text-white font-medium text-lg animate-pulse"></button>
          </div>
          ) : (
            <div className="h-36 bg-white ">
              <p className="bg-red-500 text-white p-3 font-medium text-xl">Summary</p>
              <div className="flex items-center justify-between text-lg font-medium px-2 py-1">
                <p>Quantity</p>
                <p>{totalQuantity}</p>
              </div>
              <div className="flex items-center justify-between text-lg font-medium px-2 py-1">
                <p>Total Price</p>
                <p>{formatPrice(totalPrice)}</p>
              </div>
              <button className="w-full bg-blue-600 p-2 text-white font-medium text-lg">Place Order</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
