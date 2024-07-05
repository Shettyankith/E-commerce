import React, { useContext, useState } from 'react'
import Logo from "./Logo"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {toast} from 'react-toastify';
import summaryAPI from "../common/index"
import { setUserDetails } from '../../store/userSlice';
import ROLE from '../common/role';
import context from '../context';


function header() {
  const [admin,setadmin]=useState(false);
  const user=useSelector(state=> state.user.user)
  const dispatch=useDispatch();
  const Context=useContext(context)
  const navigate=useNavigate();
  const searchInput=useLocation();
  const URLSearch=new URLSearchParams(searchInput?.search);
  const searchQuery=URLSearch.getAll('q');
  const [search,setsearch]=useState(searchQuery);



  const handleLogout=async()=>{
    const response=await fetch(summaryAPI.logout.url,{
      method:summaryAPI.logout.method,
      credentials:'include',
    });

    const data=await response.json();

    if(data.success){
      toast.success(data.message);
      //remove data from state which was set in redux 
      dispatch(setUserDetails(null));
    }
    if(data.error){
      toast.error(data.message);
    }
    navigate("/")
  }

  const handleSearch=(e)=>{
    const {value}=e.target;
    setsearch(value);
    if(value){
      navigate(`/search?q=${value}`);
    }else{
      navigate(`/search`);
    }
  }
 
  return (
    <header className='h-16 shadow-md  fixed w-full z-50 bg-white '>
      <div className='container max-auto h-full flex px-6 items-center justify-between mx-auto  w-full'>
        {/* <div className=' '>
         <Link to={"/"}> <Logo w={100} h={60}/></Link>
        </div> */}

        <div className='text-xl md:text-3xl font-semibold italic'>
         <Link to={"/"}><i className="fa-brands fa-deviantart mr-1"></i>DigiMart</Link>
        </div>

        <div className='hidden lg:flex rounded-full item-center w-full justify-between max-w-sm focus-within:shadow-sm'>
          <input className='border w-full outline-none rounded-l-full pl-2 p-2' type="text" placeholder='Search product here...' onChange={handleSearch} value={search}/>
          <div className='text-lg bg-red-600 min-w-[50px] flex items-center justify-center h-10 rounded-r-full text-white  cursor-pointer'>
          <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
          
        <div className='flex justify-center items-center gap-10'>
          <div className='relative  flex justify-center hidden md:block' onClick={()=>{setadmin(!admin)}}>
              {
                user?._id && <div className='text-3xl cursor-pointer'>
                {
                  user.profilePic?<img src={user.profilePic} alt={user.name} className='w-10 h-10 rounded-full border-black border-2'/>:<i className="fa-solid fa-circle-user"></i>
                }
            
              </div>
              }
              {
                admin && user?.role === ROLE.ADMIN && 
                  <div  className='absolute bg-white h-fit p-4 bottom-0 top-11 shadow-lg rounde w-fit hidden md:block '>
                <nav>
                  <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hover:bg-slate-100 hover:p-1'>Admin panel</Link>
                </nav>
              </div>
                
              }
          </div>
          
            {
              user?._id && (
                <Link to={"cart"} className='text-3xl cursor-pointer relative'>
                     <span><i className="fa-solid fa-cart-shopping"></i></span> 
                     <div className='bg-red-600 text-white h-7 w-full flex justify-center items-center text-lg rounded-full p-1 absolute -top-2 -right-6'>
                        <p>{Context?.cartCount}</p>
                      </div>
                </Link>)
            }
           
        
          <div className='bg-red-600 md:px-6  p-2 font-medium md:py-2  text-white hover:bg-red-700 transition text-lg rounded' >
            {
              user?._id? <button  onClick={handleLogout}>Logout</button>:<Link to={"/login"}><i className="fa-solid fa-arrow-right-to-bracket"></i> Login</Link>

            }
              
            </div>
        </div>
      </div>
    </header>
  )
}

export default header