import React from 'react';

function Footer() {
  return (
    <footer className='bg-slate-200 p-6'>
      <div className='container mx-auto text-center'>
        <div className='mb-4'>
          <h2 className='text-xl md:text-2xl font-bold'> <i className="fa-brands fa-deviantart mr-1"></i> DigiMart</h2>
          <p className=' text-sm md:text-xl font-normal'>Your one-stop shop for all electronic needs.</p>
        </div>
        <div className='flex justify-center space-x-4 mb-4 text-sm md:text-xl font-medium   '>
          <a href='/' className='text-gray-600 hover:text-red-600'>Home</a>
          <a href='/login' className='text-gray-600 hover:text-gray-800'>Login</a>
          <a href='/signup' className='text-gray-600 hover:text-gray-800'>Signup</a>
          <a href='/' className='text-gray-600 hover:text-gray-800'>Shop Now</a>
        </div>
        <div className='mb-4'>
          <p className='text-sm md:text-lg font-medium'>Follow us:</p>
          <div className='flex justify-center space-x-4 tetx-lg md:text-2xl '>
            <a href='#' className='text-gray-600 hover:text-red-600 cursor-pointer'><i className='fab fa-facebook'></i></a>
            <a href='#' className='text-gray-600 hover:text-red-600 cursor-pointer'><i className='fab fa-twitter'></i></a>
            <a href='#' className='text-gray-600 hover:text-red-600 cursor-pointer'><i className='fab fa-instagram'></i></a>
            <a href='#' className='text-gray-600 hover:text-red-600 cursor-pointer'><i className='fab fa-linkedin'></i></a>
          </div>
        </div>
        <div>
          <p className='text-xs text-gray-500 font-normal md:text-lg md:font-medium'>&copy; 2024 DigiMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
