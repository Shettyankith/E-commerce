import React, { useEffect, useState } from 'react'
import AddProduct from '../components/AddProduct'
import {toast} from 'react-toastify';
import summaryAPI from "../common/index"
import AdminProductCard from '../components/AdminProductCard';

function AllProducts() {
  const [addProduct,setaddProduct]=useState(false);
  const [allProduct,setallProduct]=useState([]);

  const fetchAllProduct=async ()=>{
      const response=await fetch(summaryAPI.allProduct.url,{
        method:summaryAPI.allProduct.method
      });

      const allProduct=await response.json();
      if(allProduct.success){
        setallProduct(allProduct.data || []);
      }

      if(allProduct.error){
        toast.error(allProduct.message);
      }
  }

  useEffect(()=>{
    fetchAllProduct()
  },[])

  
  return (
    <>
    <div className='bg-white p-3 flex justify-between items-center'>
      <h2 className='text-xl font-medium'>AllProducts</h2>
      <button className='bg-red-600 text-white font-medium p-2 hover:bg-red-700 transition' onClick={()=>{setaddProduct(!addProduct)}}>Add Product</button>
    </div>

    <div className='flex gap-2 flex-wrap h-[calc(100vh-200px)] overflow-y-scroll'>
      {
        allProduct.map((product,index)=>{
            return (
              <AdminProductCard data={product} key={index+"all product"} fetchAllProduct={fetchAllProduct}/>
            )
        })
      }
    </div>



   {addProduct &&  <AddProduct onClose={()=>{setaddProduct(!addProduct)}} fetchAllProduct={fetchAllProduct}/>}
    </>
  )
}

export default AllProducts
