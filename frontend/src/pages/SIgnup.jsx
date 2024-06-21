import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginImage from "../assest/signin.gif";
import imageConverter from "../helper/imageConvert"
import summaryAPI from "../common/index"
import {toast} from 'react-toastify';

function SIgnup() {
  const [showPassword, setshowPassword] = useState(true);
  const [showConfirmPassword,setshowConfirmPassword]=useState(false);
  const [data,setdata]=useState({
    email:"",
    password:"",
    name:"",
    confirmPassword:"",
    profilePic:"",
  })
  const navigate=useNavigate();

  const handleUploadPic=async (e)=>{
    const file=e.target.files[0];
    const imageURL=await imageConverter(file)
    setdata((prev)=>{
      return{
        ...prev,
        profilePic:imageURL,
      }
    })
  }
  const saveData = (e) => {
    const { name, value } = e.target;
    setdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (data.password === data.confirmPassword) {
        try {
            // API call
            
            const response = await fetch(summaryAPI.signup.url, {
                method: summaryAPI.signup.method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            // Check if the response is OK (status 2xx)
            if (!response.ok) {
                const errorData = await response.json();
                console.log("Error:", errorData.message);
                toast.error(errorData.message);
                return;
            }

            // Convert the response to JSON
            const userData = await response.json();
            console.log(userData)

            
            if (userData.success === true) {
              toast.success(userData.message);
              navigate("/login")
            } 
            
            else if (userData.error === true) {
              toast.error(userData.message);
            } 
            
            else {
              toast.error('An unexpected error occurred');
              console.error('Unexpected response format:', userData);
            }


        } catch (error) {
            toast.error(error.message);
        }
    } else {
        toast.error('Password mismatched!');
    }
}



  return (
    <section id="signup mx-auto">
      <div className="mx-auto container p-4 mt-10 w-full  max-w-md bg-white">
        <div className="   mx-auto p-2">
          <div className="w-20 h-20 mx-auto relative  rounded-full overflow-hidden">
            <div>
              <img src={data.profilePic||LoginImage} alt="image" />
            </div>
            <form action="">
              <label htmlFor="profilePic">
                <div className='text-xs font-medium bg-opacity-80 bg-slate-200 pb-5 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                  Upload  Photo
                </div>
                <input type="file" name="profilePic" id="profilePic" className='hidden' onChange={handleUploadPic}/>
              </label>

            </form>
          </div>
        </div>

        <form action="" onSubmit={handleSubmit}>
        <div className="mt-4">
            <label htmlFor="email">Name</label>
            <div>
              <input
                type="text"
                required
                value={data.name}
                onChange={saveData}
                placeholder="Enter your name"
                name="name"
                id="name"
                className="bg-slate-100 m-2 ml-0 w-full outline-none p-2"
              />
            </div>
          </div>


          <div className="mt-4">
            <label htmlFor="email">Email Id</label>
            <div>
              <input
                type="email"
                required
                value={data.email}
                onChange={saveData}
                placeholder="Enter email"
                name="email"
                id="email"
                className="bg-slate-100 m-2 ml-0 w-full outline-none p-2"
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="password">Password</label>
            <div className="flex  justify-center items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                required
                value={data.password}
                onChange={saveData}
                placeholder="Password"
                className=" bg-slate-100 m-2 ml-0 w-full outline-none p-2"
              />
              <div className="cursor-pointer">
                <span>
                  <i
                    class={
                      showPassword
                        ? "fa-solid fa-eye pr-2"
                        : "fa-solid fa-eye-slash pr-2"
                    }
                    onClick={() => setshowPassword(!showPassword)}
                  ></i>
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="password">Confirm Password</label>
            <div className="flex  justify-center items-center">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                required
                value={data.confirmPassword}
                onChange={saveData}
                placeholder="Re-enter password"
                className=" bg-slate-100 m-2 ml-0 w-full outline-none p-2"
              />
              <div className="cursor-pointer">
                <span>
                  <i
                    class={
                      showConfirmPassword
                        ? "fa-solid fa-eye pr-2"
                        : "fa-solid fa-eye-slash pr-2"
                    }
                    onClick={() => setshowConfirmPassword(!showConfirmPassword)}
                  ></i>
                </span>
              </div>
            </div>
          </div>
          
          <button type='submit' className="mt-4 bg-red-600 text-white font-medium w-full p-2 text-xl hover:bg-red-700">
            Sign Up
          </button>
        </form>
       
      </div>
    </section>
  );
}

export default SIgnup