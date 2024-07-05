import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { toast } from "react-toastify";
import summaryAPI from "../common/index";

function CategoryProduct() {
  const [categotyProduct, setcategotyProduct] = useState([]);
  const [loading, setloading] = useState(false);

  const categoryLoading = new Array(13).fill(null)

  const fetchCategoryProudct = async () => {
    setloading(true);
    const reponse = await fetch(summaryAPI.categoryProduct.url);
    const products = await reponse.json();
    setcategotyProduct(products.data);
    setloading(false);
    
  };

  useEffect(() => {
    fetchCategoryProudct();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-4 justify-between overflow-scroll scroller">
        {
          loading ? (
            categoryLoading.map((el,index)=>{
                    return(
                        <div  className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse p-8' key={"categoryLoading"+index}>
                        </div>
                    )
            })  
        ):
        (categotyProduct?.map((product, index) => {
          return (
            <Link to={"/category-item?category="+product?.category} className="cursor-pointe " key={index}>
              <div className="w-16 h-16 md:w-20 md:h-20 r rounded-full overflow-hidden p-4  bg-white flex items-center justify-center ">
                <img
                  src={product?.productImage[0]}
                  alt={product?.category}
                  className="h-full object-scale-down hover:scale-125 transition-all"
                />
              </div>
              <p className="capitalize font-medium text-center text-sm md:text-base">{product?.category}</p>
            </Link>
          );
        }))}
      </div>
    </div>
  );
}

export default CategoryProduct;
