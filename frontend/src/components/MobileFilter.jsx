import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ProductCategory from "../helper/ProductCategory"
import CategoryCard from '../components/CategoryCard.jsx'
import summaryAPI from '../common/index.js';


function MobileFilter({filterOn,setfilterOn}) {
  
  const [data,setdata]=useState([]);
  const [loading,setloading]=useState(false);
  const [filteredList,setfilteredList]=useState([]);
  const navigate=useNavigate();
  const url=useLocation();
  const [sortBy,setsortBy]=useState("");
  const urlSearch=new URLSearchParams(url.search);
  const urlCategoryList=urlSearch.getAll("category");
  const urlCategoryListObject={};
  urlCategoryList.forEach(el=>{
    urlCategoryListObject[el]=true;
  })

  
  const [selectCategory,setselectCategory]=useState(urlCategoryListObject);

  const fetchProduct=async()=>{
    setloading(true);
    const response=await fetch(summaryAPI.filterBy.url,{
      method:summaryAPI.filterBy.method,
      headers:{
        "content-type":"application/json",
      },
      body:JSON.stringify(
        {filteredList:filteredList},
      )
    });
    const data=await response.json();
    setdata(data.data);setloading(false);
  }

  const handleCategoryOnchange=(e)=>{
    const {value,checked}=e.target;
    setselectCategory((prev)=>{
      return{
        ...prev,
        [value]:checked,
      }
    })
  }

  useEffect(()=>{
    fetchProduct();
  },[filteredList])
 
  // {params?.categoryName}
  useEffect(()=>{
    const arrayOfCategory=Object.keys(selectCategory).map((category)=>{
      if(selectCategory[category]){
        return category;
      }
      return null;
    }).filter(el=>el)
    setfilteredList(arrayOfCategory);
    const urlFormat=arrayOfCategory.map((el,ind)=>{
      if((arrayOfCategory.length-1)===ind){
        return `category=${el}`;
      }
      return `category=${el}&&`;
    })
   
    navigate("/category-item?"+urlFormat.join(""));

   
    // /category-item?category=camera&&cartegory=airpodes
  },[selectCategory]);


      // Handle sort by function
      const handleSortBy=(e)=>{
        const {value}=e.target;
        setsortBy(value);
        if(value==="asc"){
          setdata((prev)=>prev.sort((a,b)=>a.sellingPrice-b.sellingPrice));
        }else{
          setdata((prev)=>prev.sort((a,b)=>b.sellingPrice-a.sellingPrice));
        }
      }


      useEffect(()=>{

      },[sortBy])

  return (
    <div className='container mx-auto p-4'>
        {/* Desktop version */}
        <div className='hidden md:grid md:grid-cols-[200px,1fr]'>
            {/* Left side */}
            <div className='hidden md:block bg-white p-2 min-h-[calc(100vh-180px)] overflow-y-scroll scroller'>
                {/* Sort By */}
                <div>
                  <p><i className="fa-solid fa-angle-right flex justify-end"></i></p>
                  <h3 className='text-base text-slate-500 uppercase font-medium border-b-2 pb-1'>sort by</h3>
                  <form action="" className='text-sm flex flex-col gap-2 py-2'>
                    <div className='flex items-center gap-2 text-lg capitalize'>
                      <input type="radio" name="sortBy" id='asc' value={"asc"} onChange={handleSortBy} checked={sortBy==="asc"}/>
                      <label htmlFor="asc">Price:Low to High</label>
                    </div>
                    <div className='flex items-center gap-2 text-lg capitalize'>
                      <input type="radio" name="sortBy" id='dsc'  value={"dsc"}  onChange={handleSortBy} checked={sortBy==="dsc"}/>
                      <label htmlFor="dsc">Price:High to Low</label>
                    </div>
                  </form>
                </div>

                {/* Filter By */}
                <div>
                  <h3 className='text-base text-slate-500 uppercase font-medium border-b-2 pb-1'>Category </h3>
                  <form action="" className='text-sm flex flex-col gap-2 py-2'>
                    {
                      ProductCategory.map((category,ind)=>{
                        return(
                          <div key={ind} className='flex items-center gap-2 text-lg capitalize'>
                            <input type="checkbox" name="category" value={category?.value} checked={selectCategory[category?.value]} id={category?.value} onChange={handleCategoryOnchange}/>
                            <label htmlFor={category?.value}>{category?.value}</label>
                          </div>
                        )
                      })
                    }
                  </form>
                </div>
            </div>
            
            
        </div>

        {/* Mobile version */}
        <div className=' md:hidden md:grid-cols-[200px,1fr] flex '>
            {/* Left side */}
            <div className='hidden md:block bg-white p-2 min-h-[calc(100vh-180px)] overflow-y-scroll scroller'>
                {/* Sort By */}
                <div>
                  <p><i className="fa-solid fa-angle-right flex justify-end"></i></p>
                  <h3 className='text-base text-slate-500 uppercase font-medium border-b-2 pb-1'>sort by</h3>
                  <form action="" className='text-sm flex flex-col gap-2 py-2'>
                    <div className='flex items-center gap-2 text-lg capitalize'>
                      <input type="radio" name="sortBy" id='asc' value={"asc"} onChange={handleSortBy} checked={sortBy==="asc"}/>
                      <label htmlFor="asc">Price:Low to High</label>
                    </div>
                    <div className='flex items-center gap-2 text-lg capitalize'>
                      <input type="radio" name="sortBy" id='dsc'  value={"dsc"}  onChange={handleSortBy} checked={sortBy==="dsc"}/>
                      <label htmlFor="dsc">Price:High to Low</label>
                    </div>
                  </form>
                </div>

                {/* Filter By */}
                <div>
                  <h3 className='text-base text-slate-500 uppercase font-medium border-b-2 pb-1'>Category </h3>
                  <form action="" className='text-sm flex flex-col gap-2 py-2'>
                    {
                      ProductCategory.map((category,ind)=>{
                        return(
                          <div key={ind} className='flex items-center gap-2 text-lg capitalize'>
                            <input type="checkbox" name="category" value={category?.value} checked={selectCategory[category?.value]} id={category?.value} onChange={handleCategoryOnchange}/>
                            <label htmlFor={category?.value}>{category?.value}</label>
                          </div>
                        )
                      })
                    }
                  </form>
                </div>
            </div>
            {/* Right side */}
            <div className='max-h-[calc(100vh-100px)]  overflow-y-scroll scroller '>
              <p className='text-xl font-medium my-2 ml-16'>Search Results:{data.length}</p>
                    { 
                      data.length!==0 && <CategoryCard data={data} loading={loading}/>
                    }
            </div>
        </div>
    </div>
  )
}

export default MobileFilter