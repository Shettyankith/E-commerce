import {toast} from 'react-toastify';
import summaryAPI from "../common/index"


const addToCart=async(e,id)=>{
   
    e?.preventDefault();
    e?.stopPropagation();
    
    const response=await fetch(summaryAPI.addToCart.url,{
        method:summaryAPI.addProduct.method,
        credentials:'include',
        headers:{
            "content-type":"application/json",
        },
        body : JSON.stringify(
            {productId:id},
        )
    });

    const data=await response.json();

    if(data.success){
        toast.success(data.message);
    }

    if(data.error){
        toast.error(data.message);
    }

    return data;
}

export default addToCart;