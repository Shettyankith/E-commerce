import React, { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import summaryAPI from "../common/index"
import LoginImage from "../assest/loginImage.gif"
import Context from "../context";


function ForgotPassword() {const [showPassword, setshowPassword] = useState(true);
  const [data,setdata]=useState({
    email:"",
    password:"",
    confirmPassword:"",
  });
  const [showConfirmPassword,setshowConfirmPassword]=useState(false);

  const navigate=useNavigate();
  const tokenContext=useContext(Context);

  const saveData = (e) => {
    const { name, value } = e.target;
    setdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleSubmit=async (e)=>{
  e.preventDefault();
  console.log("UseState data",data)
  if(data.password===data.confirmPassword){
    const response=await fetch(summaryAPI.forgotPassword.url,{
      method:summaryAPI.forgotPassword.method,
      headers:{
        "content-type":"application/json",
      },
      body:JSON.stringify(data),
    })
    console.log("Raw response",response);
    const userData=await response.json();
    console.log("User data from api response",userData)

    if(userData.success){
      toast.success(userData.message);
      navigate("/login");
    }
    if(userData.error){
      toast.error(userData.message)
    }
  }else{
    toast.error("Password mismatched!");
  }

 }


  return (
    <section id="login">
      <div className="mx-auto container p-4 mt-10 w-full  max-w-md bg-white">
        <div className="   mx-auto p-2">
          <div className="w-24 h-24 mx-auto bg-slate-200 rounded-full">
            <img src={LoginImage} alt="image" />
          </div>
        </div>

        <form  onSubmit={handleSubmit}>
          <div className="mt-4">
            <label htmlFor="email">Email Id</label>
            <div>
              <input
                type="text"
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
            <div className="flex bg-slate-100 justify-center items-center -p-2">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                required
                value={data.password}
                onChange={saveData}
                placeholder="Password"
                className=" bg-slate-100 m-2 ml-0 w-full outline-none px-2"
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
            <div className="flex bg-slate-100 justify-center items-center -p-2">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                required
                value={data.confirmPassword}
                onChange={saveData}
                placeholder="Re-enter password"
                className=" bg-slate-100 m-2 ml-0 w-full outline-none px-2"
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

          <button className="mt-4 bg-red-600 text-white font-medium w-full p-2 text-xl hover:bg-red-700">
            Save Password
          </button>
        </form>
        
      </div>
    </section>
  );
}

export default ForgotPassword