import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ROLE from '../common/role'

function AdminPanel() {
    const navigate=useNavigate();
    const user=useSelector(state=> state.user.user);

    //redirect to home when admin logs out
    useEffect(()=>{
        if(user?.role!== ROLE.ADMIN){
            navigate("/");
        }
    },[user]);
  return (
    <div className='min-h-[calc(100vh-120px)]  hidden md:flex'>
        <aside className='bg-white min-h-full w-full max-w-60 shadow-md'>
            <div className='flex justify-center items-center  w-full h-48 flex flex-col'>
                <div className='text-7xl cursor-pointer'>
                    {
                        user?<img src={user.profilePic} alt={user.name} className='w-20 h-20 rounded-full border-black border-2'/>:<i className="fa-solid fa-circle-user"></i>
                    }
                </div>
                <p className='font-medium capitalize text-lg'>{user?.name}</p>
                <p className='text-sm'>{user?.role}</p>
            </div>


            <div>
                <nav className='grid p-4'>
                    <Link to={"all-users"} className='px-2 py-2 hover:bg-slate-100'>All Users</Link>
                    <Link to={"all-products"} className='px-2 py-2 hover:bg-slate-100'>All product</Link>
                </nav>
            </div>
        </aside>
        <main className='h-full w-full p-4'>
            <Outlet/>
        </main>
    </div>
  )
}

export default AdminPanel