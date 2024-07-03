import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import summaryAPI from '../common';
import SearchBarCard from '../components/SearchBarCard';

function SearchBar() {
    const query=useLocation()
    const searchQuery = query.search ; 
   
   
    const [data,setdata]=useState([]);
    const [loading,setloading]=useState(false);

    const fetchProduct=async()=>{
        setloading(true)
        const response = await fetch(summaryAPI.searchBar.url+searchQuery);
        const data=await response.json();
        setloading(false)
        setdata(data.data);
    }

    

    useEffect(()=>{
        fetchProduct();
    },[query]);


  return (
    <div className='container mx-auto p-4'>
         <p className='text-xl font-medium my-2 ml-10'>Search Results: {data.length}</p>
    {
        loading ? (
            <p className='text-center font-normal'>Loading...</p>
        ) : (
            data.length === 0 ? (
                <p>No data found...</p>
            ) : (
                // Render your data here
                <div>{
                    
                            <SearchBarCard loading={loading} data={data}/>
                        
                }</div>
            )
        )
    }
   
</div>

  )
}

export default SearchBar