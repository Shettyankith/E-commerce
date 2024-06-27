import React, { useEffect, useState } from 'react'
import CategoryProduct from '../components/CategoryProduct'
import {toast} from 'react-toastify';
import summaryAPI from "../common/index"
import Banner from "../components/Banner"
import HomeProductCards from "../components/HomeProductCards"
import VerticalCard from '../components/verticalCard';

function home() {
  
  return (
    <div>
      <CategoryProduct/>
      <Banner/>
      
      <HomeProductCards category={"watches"} heading={"Time Elevated: Trending SmartWatches"}/>
      <VerticalCard category={"mobiles"} heading={"Mobile Mastery: Best Seller Mobiles"}/>
      <VerticalCard category={"mouse"} heading={"Precision in Hand: Top-Rated Mice"}/>
      <HomeProductCards category={"airpodes"} heading={"Wireless Freedom: Top Brand Airpods"}/>
      <VerticalCard category={"speakers"} heading={"Sound Unleashed: Best in Class Speakers"}/>
      <VerticalCard category={"televisions"} heading={"Visual Excellence: Top Picks in Televisions"}/>
      <HomeProductCards category={"earphones"} heading={"Audio Bliss: Best Seller Earphones"}/>
      <VerticalCard category={"refrigerator"} heading={"Cool Innovations: Top Refrigerators"}/>
      <VerticalCard category={"camera"} heading={"Capture the Moment: Top Cameras"}/>
      <VerticalCard category={"trimmers"} heading={"Grooming Essentials: Best Trimmers"}/>
    </div>
  )
}

export default home