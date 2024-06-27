import summaryAPI from '../common/index';


const fetchCategoryProducts=async(category)=>{
    const response=await fetch(summaryAPI.categoryWiseProduct.url,{
        method:summaryAPI.categoryWiseProduct.method,
        headers:{
            "content-type":"application/json",
        },
        body:JSON.stringify({
            category:category,
        })
    })
    const data=await response.json();
    return data;
}

export default fetchCategoryProducts;