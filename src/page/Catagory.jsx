import React, { useEffect, useState } from 'react'

import "../CSS/SubCategorypage.css"
import { useNavigate } from 'react-router'
import Navbar from '../component/Navbar'
import Footer from './Footer'

import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { database } from '../firebaseauth'
import SubCategoryPage from './SubCategoryPage'
// import Category from './Catagory';

const Category = () => {

const navigate=useNavigate();
    const [subcatagoryalldata,setSubcategoryalldata]=useState([]);

    

    useEffect(() => {
  
        
        
        fetchDataFromCollection();
 
     


    
  }, []);
  

  


 const fetchDataFromCollection = async () => {
    try {
      // Reference to the Firestore collection
      const collectionRef = collection(database, "SubCategory"); // Replace with your collection name
  
      // Fetch data from the collection
      const querySnapshot = await getDocs(query(collectionRef,orderBy("timeStamp", "desc")));
  
      // Initialize an array to store the data
      const data = [];
  
      // Loop through the documents and extract data
      querySnapshot.forEach((doc) => {
        const documentData = doc.data();
        data.push(documentData);
      });
  
      // Return the data
      setSubcategoryalldata( data)
    } catch (error) {
      console.error("Error fetching data from Firestore", error);
    }
  };
  console.log(subcatagoryalldata);
    return (
    <div>
  
<SubCategoryPage/>

        {/* <div className='subcategorypagedatashow'> 
<div>
{ 
   subcatagoryalldata.map((e, index) =>
   <div> */}
{/* <h2>{e.category}</h2> */}
        {/* <div key={index} onClick={()=>localStorage.setItem("productbycategory",JSON.stringify(e.subCategoryTitle),navigate("/subcategoryProducPage"))}>
          <img src={e.subCategoryImage} alt={e.subCategoryTitle} />
          <h2>{e.subCategoryTitle}</h2>
        </div>
        </div>

    )
  }
</div> */}
  
    
     </div>









  )
}

export default Category;