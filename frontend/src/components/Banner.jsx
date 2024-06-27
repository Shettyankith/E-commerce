import React, { useEffect, useState } from "react";
import img1 from "../assest/banner/img1.webp";
import img2 from "../assest/banner/img2.webp";
import img3 from "../assest/banner/img3.jpg";
import img4 from "../assest/banner/img4.jpg";
import img5 from "../assest/banner/img5.webp";
import img1Mobile from "../assest/banner/img1_mobile.jpg";
import img2Mobile from "../assest/banner/img2_mobile.webp";
import img3Mobile from "../assest/banner/img3_mobile.jpg";
import img4Mobile from "../assest/banner/img4_mobile.jpg";
import img5Mobile from "../assest/banner/img5_mobile.png";

function Banner() {
  const [currentImage, setcurrentImage] = useState(0);

  const desktopImages = [img1, img2, img3, img4, img5];

  const mobileImages = [
    img1Mobile,
    img2Mobile,
    img3Mobile,
    img4Mobile,
    img5Mobile,
  ];

  const next = () => {
    if (currentImage < desktopImages.length-1) {
      setcurrentImage((prev) => prev + 1);
    }
  };

  const back = () => {
    if (currentImage != 0) {
      setcurrentImage((prev) => prev - 1);
    }
  };

  useEffect(()=>{
    const interval=setInterval(()=>{
      if (currentImage < desktopImages.length-1) {
        next();
      }else{
        setcurrentImage(0);
      }
    },4000)
    return ()=>clearInterval(interval);
  },[currentImage]);
  return (
    <div className="container m-auto">
      <div className="h-60 md:h-72 w-full  bg-slate-200 rounded relative ">
        <div className="absolute z-10 h-full w-full md:flex items-center hidden ">
          <div className=" flex justify-between w-full text-3xl">
            <button onClick={back}>
              <i className="fa-solid fa-circle-chevron-left text-white mx-2"></i>
            </button>
            <button onClick={next}>
              <i className="fa-solid fa-circle-chevron-right text-white mx-2"></i>
            </button>
          </div>
        </div>

        {/* Desktop version */}
        <div className="hidden md:flex w-full h-full overflow-hidden">
          {desktopImages.map((image, index) => {
            return (
              <div className="w-full h-full min-w-full min-h-full transition-all" style={{transform : `translateX(-${currentImage * 100}%)`}} key={index}>
                <img src={image} alt="" className="w-full h-full  " />
              </div>
            );
          })}
        </div>

         {/* Mobile version */}
         <div className="flex w-full h-full overflow-hidden ">
          {mobileImages.map((image, index) => {
            return (
              <div className="w-full h-full min-w-full min-h-full transition-all md:hidden " style={{transform : `translateX(-${currentImage * 100}%)`}} key={index}>
                <img src={image} alt="" className="w-full h-full  object-cover" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Banner;
