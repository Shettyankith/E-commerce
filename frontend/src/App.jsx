import './App.css';
import { Outlet } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import summaryAPI from './common/index';
import Context from "./context/index";
import { useDispatch } from "react-redux";
import { setUserDetails } from '../store/userSlice';

function App() {
  const dispatch = useDispatch();
  const [cartCount,setcartCount]=useState(0);

  const fetchUserDetail = async () => {
    try {
      const response = await fetch(summaryAPI.userDetails.url, {
        method:summaryAPI.userDetails.method,
        credentials: 'include',
      });
      
      const data = await response.json();
      if (data.success) {
        dispatch(setUserDetails(data.data));
      }

      
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchCartCount=async(req,res)=>{
    const response=await fetch(summaryAPI.cartCount.url,{
      method:summaryAPI.cartCount.method,
      credentials:'include',
    });

    const count=await response.json();
    setcartCount(count?.data?.count);
  }

  useEffect(() => {
    // Fetch the user details every time the component loads
    fetchUserDetail();
    //Fetch user cart count
    fetchCartCount();
  }, []);

  return (
    <>
      <Context.Provider value={{ fetchUserDetail ,cartCount,fetchCartCount}}>
        <ToastContainer />
        <Header />
        <main className='min-h-[calc(100vh-160px)] pt-16'>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
