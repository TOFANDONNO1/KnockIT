import React, { useEffect, useState } from "react";
import Data from "../services/Homedata";
// import {collection } from "firebase/firestore"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import logo from "../component/logo.jpg"
import "../CSS/slider.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; //
import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebaseauth";
import { useNavigate } from "react-router";
// import { database } from '../firebaseauth';
const Slider = () => {
  const [totalhomedata, setTotalhomedata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [subcatagoryalldata, setSubcategoryalldata] = useState([]);
const navigate=useNavigate();
  useEffect(() => {
  
    getDatas();
    fetchDataFromCollection();
    setTimeout(() => {
      // getDatas();
      setIsLoading(false);
    }, 1000);
  }, []);
  const getDatas = async () => {
    const data = await Data.getallHomeData();

    setTotalhomedata(data.docs);
  };

  const fetchDataFromCollection = async () => {
    try {
      // Reference to the Firestore collection
      const collectionRef = collection(database, "SubCategory"); // Replace with your collection name

      // Fetch data from the collection
      const querySnapshot = await getDocs(collectionRef);

      // Initialize an array to store the data
      const data = [];

      // Loop through the documents and extract data
      querySnapshot.forEach((doc) => {
        const documentData = doc.data();
        data.push(documentData);
      });

      // Return the data
      setSubcategoryalldata(data);
    } catch (error) {
      console.error("Error fetching data from Firestore", error);
    }
  };
  const handlethebannerclick = (e) => {
    if( 
      e._document.data.value.mapValue.fields.productId.stringValue!=="" ){
        navigate(`/productpage/${e._document.data.value.mapValue.fields.productId.stringValue}`)
      }else{
        localStorage.setItem("subcategoryDiscount",JSON.stringify(e._document.data.value.mapValue.fields.discount.integerValue))
          subcatagoryalldata.map((el, index) =>(
            e._document.data.value.mapValue.fields.subCategory.stringValue===el.subCategoryTitle?
            localStorage.setItem("productbycategory",JSON.stringify(el.subCategoryTitle),
            navigate("/subcategoryProducPage")
            )   
            :"")
          
                
         
           )
         
      }
   

  };
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
      showArrows: false,

    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
      showArrows: false,

    },
  };

  return (
    <div className="slidermain">
      {/* {isLoading?(<NavbarSkeleton/>): */}
      <Carousel
        responsive={responsive}
        showDots={true}
        autoPlay={true}
        infinite={true}
        autoPlaySpeed={2000}
        transitionDuration={500}
        // showArrows={false}
        arrows ={false} 
      >
        {totalhomedata.map((e, index) => {
          return (
            <div
              onClick={() => handlethebannerclick(e)}
              className="sliderdiv"
              style={{
                backgroundColor:
                  e._document.data.value.mapValue.fields.bannerBackground
                    .stringValue,
              }}
              key={index}
            >
              <img
                src={
                  e._document.data.value.mapValue.fields.bannerImage.stringValue
                }
                alt="SLIDERIMG"
              />
            </div>
          );
        })}
      </Carousel>
      {/* } */}
    </div>
  );
};

export default Slider;
