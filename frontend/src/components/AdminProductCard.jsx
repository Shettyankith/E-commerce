import React, { useState } from "react";
import EditProduct from "./editProduct";
import formatPrice from "../helper/currencyConverter";

function AdminProductCard({ data, fetchAllProduct }) {
  const [editProduct, seteditProduct] = useState(false);
  return (
    <div className="bg-white p-4 rounded my-2 h-fit">
      <div className="w-40 " style={{height:"250px"}}>
        <div className="w-32 h-32 flex justify-center items-center">
          <img
            src={data?.productImage[0]}
            alt="Product image"
            className="object-cover max-auto h-full"
            style={{ minHeight: "50%" }}
            width={120}
            height={120}
          />
        </div>
        <h3 className="text-ellipsis line-clamp-2">{data.productName}</h3>
        <div>
          <p className="font-semibold">{formatPrice(data.price)}</p>
          <div
            className="w-fit py-1 px-2 cursor-pointer mb-auto rounded-full ml-auto bg-red-200 hover:bg-red-400 transition-all"
            onClick={() => seteditProduct(true)}
          >
            <i className="fa-solid fa-pen"></i>
          </div>
        </div>
      </div>

      {editProduct && (
        <EditProduct
          productData={data}
          onClose={() => seteditProduct(!editProduct)}
          fetchAllProduct={fetchAllProduct}
        />
      )}
    </div>
  );
}

export default AdminProductCard;
