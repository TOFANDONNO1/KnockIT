import React, { useEffect, useState } from "react";
import Data from "../services/Homedata";
// import {collection } from "firebase/firestore"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import logo from "../component/logo.jpg"
import "../CSS/slider.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; //
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { database } from "../firebaseauth";
import { useNavigate } from "react-router";
// import { database } from '../firebaseauth';
const Poster = () => {
  const [totalhomedata, setTotalhomedata] = useState(null);
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
    const homeCollection = collection(database, 'HOME');
    const homeDataDocument = doc(homeCollection, 'HomeData');
    const posterCollection = collection(homeDataDocument, 'Poster');
    const posterImageDocument = doc(posterCollection, 'PosterImage');
    try {
        const posterImageData = await getDoc(posterImageDocument);
        if (posterImageData.exists()) {
          // Access the data from the document
          const data = posterImageData.data();
setTotalhomedata(data)
          console.log('Data from PosterImage document:', data);
        } else {
          console.log('PosterImage document does not exist.');
        }
      } catch (error) {
        console.error('Error fetching PosterImage data:', error);
      }

    // setTotalhomedata(data.docs);
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
  
        localStorage.setItem("subcategoryDiscount",JSON.stringify(e.discount))
          subcatagoryalldata.map((el, index) =>(
            e.subCategory===el.subCategoryTitle?
            localStorage.setItem("productbycategory",JSON.stringify(el.subCategoryTitle),
            navigate("/subcategoryProducPage")
            )   
            :"")
          
                
         
           )
         
      // }
   

  };
  // const responsive = {
  //   superLargeDesktop: {
  //     // the naming can be any, depends on you.
  //     breakpoint: { max: 4000, min: 3000 },
  //     // items: 1,
  //   },
  //   desktop: {
  //     breakpoint: { max: 3000, min: 1024 },
  //     // items: 1,
  //     // slidesToSlide: 1,
  //   },
  //   tablet: {
  //     breakpoint: { max: 1024, min: 464 },
  //     // items: 1,
  //     // slidesToSlide: 1,
  //   },
  //   mobile: {
  //     breakpoint: { max: 464, min: 0 },
  //     // items: 1,
  //     // slidesToSlide: 1,
  //   },
  // };
console.log(totalhomedata);
  return (
    <div className="slidermain">
           {totalhomedata!==null?(<div
              onClick={() => handlethebannerclick(totalhomedata)}
              className="sliderdiv"
              style={{backgroundColor:totalhomedata.posterBackground }} >
              <img
                src={
                  totalhomedata.posterImage
                }
                alt="SLIDERIMG"
              />
            </div>):""}
                       
    </div>
  );
};

export default Poster;
