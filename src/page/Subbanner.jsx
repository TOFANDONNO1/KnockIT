import React, { useEffect, useState } from "react";
import Data from "../services/Homedata";
import "../CSS/Subbanner.css";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebaseauth";
import { useNavigate } from "react-router";
import Carousel from "react-multi-carousel";
const Subbanner = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [totalhomedata, setTotalhomedata] = useState([]);
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
      e.productId!=="" ){
        navigate(`/allproductpage/${e.productId}`)
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
  // console.log(totalhomedata.slice(0, 3).map((e) => e.data()));
  // console.log(subcatagoryalldata);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,

       arrows: true,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
       arrows: true,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      arrows: false,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      arrows: false,
    },
  };
  return (
    <div className="subbanner_main">
<Carousel
    responsive={responsive}
    infinite={true}
    autoPlay={true}
   arrows={false}
   autoPlaySpeed={5000}

     // Set to true to display navigation arrows
    swipeable={true} // Enable swipe gesture for mobile
  >
    {totalhomedata &&
      totalhomedata.map((e, index) => (
        <div
          className="subbanner_one"
          key={index}
          style={{ backgroundColor: e.data().bannerBackground }}
          onClick={() => handlethebannerclick(e.data())}
        >
          <img src={e.data().bannerImage} alt="bannerImage" />
        </div>
      ))}
  </Carousel>
    </div>
    
    // <div className="subbanner_main">
    //   {totalhomedata &&
    //     totalhomedata.slice(0, 3).map((e, index) => (
    //       <div
    //         className="subbanner_one"
    //         key={index}
    //         style={{ backgroundColor: e.data().bannerBackground }}
    //         onClick={() => handlethebannerclick(e.data())}

    //       >
    //         <img src={e.data().bannerImage} alt="bannerImage" />
    //       </div>
    //     ))}
    // </div>
  );
};

export default Subbanner;
