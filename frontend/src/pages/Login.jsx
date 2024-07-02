import React, { useContext, useState } from "react";
import LoginImage from "../assest/signin.gif";
import LoginImage2 from "../assest/signin3.gif";
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import summaryAPI from "../common/index"
import Context from "../context";

function Login() {
  const [showPassword, setshowPassword] = useState(true);
  const [data,setdata]=useState({
    email:"",
    password:"",
  });

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
  const response=await fetch(summaryAPI.login.url,{
    method:summaryAPI.login.method,
    credentials:"include",
    headers:{
      "content-Type":"application/json",
    },
    body:JSON.stringify(data),
  });

  const loginData=await response.json();

  if(loginData.success){
    toast.success(loginData.message);
    navigate("/")
    tokenContext.fetchUserDetail();
    tokenContext.fetchCartCount();
  }

  if(loginData.error){
    toast.error(loginData.message);
  }

 }


  return (
    <section id="login">
      <div className="mx-auto container p-4 mt-10 w-full  max-w-md bg-white">
        <div className="   mx-auto p-2">
          <div className="w-20 h-20 mx-auto">
            <img src={LoginImage2} alt="image" />
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
          <Link
            to={"/forgot-password"}
            className="block w-fit font-medium ml-auto m-1 hover:underline hover:text-red-600"
          >
            Forgot Password
          </Link>

          <button className="mt-4 bg-red-600 text-white font-medium w-full p-2 text-xl hover:bg-red-700">
            Login
          </button>
        </form>
        <p className="font-medium mt-2">
          Don't have a account?{" "}
          <Link className="hover:underline hover:text-red-600" to={"/signup"}>
            SignUp
          </Link>{" "}
        </p>
      </div>
    </section>
  );
}

export default Login;
