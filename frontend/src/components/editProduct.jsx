import React, { useState } from "react";
import ProductCategory from "../helper/ProductCategory";
import ProductImage from "../helper/ProductImage";
import ZoomImage from "./ZoomImage";
import summaryAPI from '../common/index';
import {toast} from 'react-toastify';

function editProduct({ productData,onClose,fetchAllProduct }) {
  const [productDetails, setproductDetails] = useState({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice,
    productImage:productData?.productImage|| [],
    description: productData?.description,
  });

  const [zoomImageUrl, setzoomImageUrl] = useState("");
  const [openZoomImage, setopenZoomImage] = useState(false);

  const updateField = (e) => {
    const {name,value}=e.target;
    setproductDetails((prev)=>{
      return {
        ...prev,
        [name]:value,
      }
    })
  };

  const [imageInput, setimageInput] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    //get the image data form cloudinary api
    const cloudinary = await ProductImage(file);
    //add the image links to state variable
    setproductDetails((prev) => ({
      ...prev,
      productImage: [...prev.productImage, cloudinary.url],
    }));
  };

  const deleteImage=async (index)=>{
    const newArray=[...productDetails.productImage];
    //remove the image index
    newArray.splice(index,1);
    //reset the state variable
    setproductDetails((prev)=>{
        return{
            ...prev,
            productImage:[...newArray]
        }
    })
  }

  const handleSubmit=async (e)=>{
      e.preventDefault();
      //add the data to db
      const response=await fetch(summaryAPI.editProduct.url,{
        method:summaryAPI.editProduct.method,
        headers:{
          "content-type":"application/json",
        },
        credentials:'include',
        body:JSON.stringify(productDetails),
      })
      //parse the data
      const data=await response.json();

      if(data.success){
        toast.success(data.message);
        onClose();
        fetchAllProduct();
      }

      if(data.error){
        toast.error(data.message);
      }
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex w-full h-full justify-center items-center bg-slate-200 bg-opacity-40">
      <div className="bg-white p-4   max-w-2xl w-full h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between ">
          <h2 className="text-xl font-medium">Edit Product</h2>
          <button
            className="block ml-auto text-2xl cursor-pointer "
            onClick={onClose}
          >
            <i className="fa-regular fa-rectangle-xmark"></i>
          </button>
        </div>

        <form className="grid gap-2 p-4 overflow-y-scroll h-full mb-10" onSubmit={handleSubmit}>
          <label htmlFor="productName" className="text-md font-semibold">
            Product Name
          </label>
          <input
            type="text"
            name="productName"
            id="productName"
            placeholder="Enter product name"
            value={productDetails.productName}
            onChange={updateField}
            className="bg-slate-100 p-2 rounded border-2"
            required
          />

          <label htmlFor="brandName" className="text-md font-semibold">
            Brand Name
          </label>
          <input
            type="text"
            name="brandName"
            id="brandName"
            placeholder="Enter brand name"
            value={productDetails.brandName}
            onChange={updateField}
            className="bg-slate-100 p-2 rounded border-2"
            required
          />

          <label htmlFor="category" className="text-md font-semibold">
            Category
          </label>
          <select
            name="category"
            value={productDetails.category}
            onChange={updateField}
            className="bg-slate-100 p-2 rounded border-2"
            required
          >
           <option value={""}>Select Category</option>
            {ProductCategory.map((el, idx) => {
              return (
                <option value={el.value} key={el.value + idx}>
                  {el.label}
                </option>
              );
            })}
          </select>

          <label htmlFor="productImage" className="text-md font-semibold">
            Product Image
          </label>
          <label htmlFor="uploadProductImage">
            <div className="bg-slate-100 border-2 rounded w-full h-32 flex justify-center ">
              <div className="flex justify-center items-center flex-col cursor-pointer">
                <i className="text-xl fa-solid fa-file-arrow-up"></i>
                <p className="text-sm font-semibold">Upload images</p>
                <input
                  type="file"
                  name=""
                  id="uploadProductImage"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
          </label>
          <div className="flex cursor-pointer">
            {productDetails?.productImage.length > 0
              ? productDetails.productImage.map((el, index) => (
                  <div className="relative group">
                    <img
                      key={index}
                      src={el}
                      width={80}
                      height={60}
                      className="bg-slate-100 border m-1 object-cover"
                      alt={`Product Image ${index + 1}`}
                      onClick={() => {
                        setopenZoomImage(true);
                        setzoomImageUrl(el);
                      }}
                    />
                    <div onClick={()=>{deleteImage(index)}} className="absolute bottom-0 right-0 p-2 m-2 hidden hover:text-red-600 hover:bg-white hover:rounded-full group-hover:block">
                        <i className="fa-solid fa-trash"></i>
                    </div>
                  </div>
                ))
              : null}
          </div>

          <label htmlFor="price" className="text-md font-semibold">
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Enter product price"
            value={productDetails.price}
            onChange={updateField}
            className="bg-slate-100 p-2 rounded border-2"
            required
          />

          <label htmlFor="sellingPrice" className="text-md font-semibold">
            Selling Price
          </label>
          <input
            type="number"
            name="sellingPrice"
            id="sellingPrice"
            placeholder="Enter selling price"
            value={productDetails.sellingPrice}
            onChange={updateField}
            className="bg-slate-100 p-2 rounded border-2"
            required
          />

          <label htmlFor="description" className="text-md font-semibold">
            Description
          </label>
          <textarea name="description" required className="bg-slate-100 p-2 rounded border-2 h-28"  onChange={updateField} id="description" placeholder="Enter product decription" value={productDetails.description}></textarea>
          


          <button className="bg-red-600 mb-10 p-2 mt-4 text-white font-medium">Update Product</button>


        </form>
      </div>

      {openZoomImage && (
        <ZoomImage
          image={zoomImageUrl}
          onclose={() => {
            setopenZoomImage(!ZoomImage);
          }}
        />
      )}
    </div>
  );
}

export default editProduct;
