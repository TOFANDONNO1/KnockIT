import React, { useEffect, useState } from "react";
import Data from "../services/Homedata";
// import {collection } from "firebase/firestore"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import logo from "../component/logo.jpg"
import "../CSS/slider.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; //
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { database } from "../firebaseauth";
import { useNavigate } from "react-router";
// import { database } from '../firebaseauth';
const BannerTwo = () => {
  const [totalhomedata, setTotalhomedata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [subcatagoryalldata, setSubcategoryalldata] = useState([]);
const navigate=useNavigate();
  useEffect(() => {
  fetchDataFromCollection();

    const homeDocRef = doc(database, 'HOME', 'HomeData');
    const bannerCollectionRef = collection(homeDocRef, 'Banner_2');

    const unsubscribe = onSnapshot(bannerCollectionRef, (querySnapshot) => {
      const bannerData = [];
      querySnapshot.forEach((doc) => {
        const bannerDocData = doc.data();
        bannerData.push(bannerDocData);
      });
      setTotalhomedata(bannerData);
      setIsLoading(false);
    });

    return () => unsubscribe();
    // getDatas();
    // setTimeout(() => {
    //   // getDatas();
    //   setIsLoading(false);
    // }, 1000);
  }, []);
  // const getDatas = async () => {
  //   try {
  //       const homeDocRef = doc(database, 'HOME', 'HomeData');
  //       const bannerCollectionRef = collection(homeDocRef, 'Banner_2');
  //       const querySnapshot = await getDocs(bannerCollectionRef);
    
  //       const bannerData = [];
    
  //       querySnapshot.forEach((doc) => {
  //         const bannerDocData = doc.data();
  //         bannerData.push(bannerDocData);
  //       });
    
  //       // Now, bannerData contains the data from the "Banner_2" subcollection of "HomeData" document.
  //       setTotalhomedata(bannerData);
  //       // return bannerData;
  //     } catch (error) {
  //       console.error('Error getting banner data:', error);
  //       return [];
  //     }

  //   // setTotalhomedata(data.docs);
  // };

  const fetchDataFromCollection = () => {
    try {
      // Reference to the Firestore collection
      const collectionRef = collection(database, "SubCategory"); // Replace with your collection name
  
      // Subscribe to real-time updates
      const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
        // Initialize an array to store the data
        const data = [];
  
        // Loop through the documents and extract data
        querySnapshot.forEach((doc) => {
          const documentData = doc.data();
          data.push(documentData);
        });
  
        // Update the state with the new data
        setSubcategoryalldata(data);
      });
  
      // Return the unsubscribe function to clean up the listener on component unmount
      return () => unsubscribe();
    } catch (error) {
      console.error("Error fetching data from Firestore", error);
    }
  };
  const handlethebannerclick = (e) => {
    if( 
      e.productId!=="" ){
        navigate(`/productpage/${e.productId}`)
      }else{
        localStorage.setItem("subcategoryDiscount",JSON.stringify(e.discount))
          subcatagoryalldata.map((el, index) =>(
            e.subCategory===el.subCategoryTitle?
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
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
console.log(totalhomedata);
  return (
    <div className="slidermain">
      {/* {isLoading?(<NavbarSkeleton/>): */}
      <Carousel
        responsive={responsive}
        showDots={true}
        autoPlay={true}
        infinite={true}
        autoPlaySpeed={9000}
        transitionDuration={500}
      >
        {totalhomedata.map((e, index) => {
          return (
            <div
              onClick={() => handlethebannerclick(e)}
              className="sliderdiv"
              style={{
                backgroundColor:
                  e.bannerBackground,
              }}
              key={index}
            >
              <img
                src={
                  e.bannerImage
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

export default BannerTwo;
