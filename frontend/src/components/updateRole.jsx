import React, { useState } from 'react'
import Role from "../common/role"
import summaryAPI from '../common/index';
import {toast} from 'react-toastify';

function updateRole({closePopBox,user,fetchAllUsers}) {
    const [userRole,setuserRole]=useState(user.role);
    

    const updateUser=async ()=>{
        //api fetching
        const updatedUser=await fetch(summaryAPI.updateUser.url,{
            method:summaryAPI.updateUser.method,
            //pass the token
            credentials:'include',
            headers:{
                "content-type":"application/json",
            },
            //Send the user id and role to backend
            body:JSON.stringify({role:userRole,id:user._id}),
        });

        //convert the data
        const response=await updatedUser.json();
        //Error handling
        if(response.success){
            //re-fetch the data to reflect the changes
            fetchAllUsers();
            toast.success(response.message);
            closePopBox();            
        }
    }

  return (
    <div className='fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-slate-200 bg-opacity-35'>
        <div className='text-left bg-white p-10 pt-4 shadow-md max-w-sm' style={{width:"450px"}}>
            <button className='block ml-auto text-2xl' onClick={closePopBox}><i className="fa-regular fa-rectangle-xmark"></i></button>
            <h2 className='text text-xl font-medium mb-3  '>Edit user deatils</h2>
            <p className='p-2 pl-0 text'>Name:{user.name}</p>
            <p className='p-2 pl-0'>Email:{user.email}</p>
            <p className='p-2 pl-0 inline'>Role:</p>
            <select className='p-2 border-2' name="role" id="role" value={userRole} onChange={(e)=>{setuserRole(e.target.value)}}>
                {
                    Object.values(Role).map(el=>{
                        return (
                            <option className='p-1' value={el} key={el}>{el}</option>
                        )
                    })
                }
            </select>
            <button onClick={updateUser} className='align-center block bg-green-200 mt-4 p-2 font-medium capitalize text-md hover:bg-green-300'>Change Role</button>
        </div>
    </div>
  )
}

export default updateRole