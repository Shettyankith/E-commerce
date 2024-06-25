import React, { useState } from 'react'
import Logo from "./Logo"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {toast} from 'react-toastify';
import summaryAPI from "../common/index"
import { setUserDetails } from '../../store/userSlice';
import ROLE from '../common/role';

function header() {
  const [admin,setadmin]=useState(false);
  const user=useSelector(state=> state.user.user)
  const dispatch=useDispatch();

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
  }
  return (
    <header className='h-16 shadow-md bg-white'>
      <div className='container max-auto h-full flex px-6 items-center justify-between'>
        {/* <div className=' '>
         <Link to={"/"}> <Logo w={100} h={60}/></Link>
        </div> */}

        <div className='text-2xl font-semibold'>
         <Link to={"/"} >UrbanUtopia</Link>
        </div>

        <div className='hidden lg:flex rounded-full item-center w-full justify-between max-w-sm focus-within:shadow-sm'>
          <input className='border w-full outline-none rounded-l-full pl-2' type="text" placeholder='Search product here...'/>
          <div className='text-lg bg-red-600 min-w-[50px] flex items-center justify-center h-8 rounded-r-full text-white  '>
          <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
          
        <div className='flex justify-center items-center gap-10'>
          <div className='relative  flex justify-center' onClick={()=>{setadmin(!admin)}}>
              {
                user?._id && <div className='text-3xl cursor-pointer'>
                {
                  user?<img src={user.profilePic} alt={user.name} className='w-10 h-10 rounded-full border-black border-2'/>:<i className="fa-solid fa-circle-user"></i>
                }
            
              </div>
              }
              {
                admin && user?.role === ROLE.ADMIN && 
                  <div  className='absolute bg-white h-fit p-4 bottom-0 top-11 shadow-lg rounde w-fit hidden md:block '>
                <nav>
                  <Link to={"/admin-panel"} className='whitespace-nowrap hover:bg-slate-100 hover:p-1'>Admin panel</Link>
                </nav>
              </div>
                
              }
          </div>
          <div className='text-3xl cursor-pointer relative'>
            <span><i className="fa-solid fa-cart-shopping"></i></span>
            <div className='bg-red-600 text-white h-7 w-full flex justify-center items-center text-lg rounded-full p-1 absolute -top-2 -right-6'>
              <p>0</p>
            </div>
          </div>
          <div className='bg-red-600 px-6 font-medium py-2  text-white hover:bg-red-700 transition text-lg' >
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