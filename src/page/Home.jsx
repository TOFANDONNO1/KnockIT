import React from "react";
import Slider from "./slider";
import "../CSS/Home.css";


import ProductPage from "./ProductPage";
import Footer from "./Footer";
import Navbar from "../component/Navbar";
import ShopByCategory from "./ShopByCategory";
import BannerTwo from "./BannerTwo";
import Poster from "./Poster";
import WhatsAppChatButton from "./WhatsApp";
import DealsOfTheDay from "./DealsOfTheDay";
import Subbanner from "./Subbanner";

const Home = () => {


 
return (
<div>

  <div className="hone">
      {/* <LocationPopup/> */}
      {/* <Navbar/> */}
     {/* <WhatsAppChatButton/> */}
      {/* slider of Homepage */}
      <Slider  />
      {/* Category show in Homepage */}
    <ShopByCategory/>
   {/* subbanner */}
   <Subbanner/>
   {/* delalsoftheday */}
   <DealsOfTheDay/>
{/* productshow */}
<ProductPage/>

    </div>
    

</div>
   
  );
};

export default Home;
