import React, { useEffect, useState } from 'react'

import "../CSS/SubCategorypage.css"
import { useNavigate, useParams } from 'react-router'
import Navbar from '../component/Navbar'
import Footer from './Footer'
import Category from '../services/Category';
import { collection, doc, getDocs } from 'firebase/firestore'
import { database } from '../firebaseauth'
import CategorySkeleton from './Skeletons/CategorySkeleton'

const SubCategoryPage = () => {
    const {SubCategoryId}=useParams();
const navigate=useNavigate();
    const [subcatagoryalldata,setSubcategoryalldata]=useState([]);
    const [banner, setCategoryBanner] = useState(null);
    const [Cat,setCategory]=useState("");
    const [localcategoryvalue,setlocalcategoryvalue]=useState("");
    const local=JSON.parse(localStorage.getItem("categorytitle"));
    const [totalCategories, setTotalCategories] = useState([]);
const [isLoading, setIsLoading] = useState(true);
   
    const getDatas = async () => {
      try {
          const homeDocRef = doc(database, 'HOME', 'HomeData');
          const bannerCollectionRef = collection(homeDocRef, 'CategoryBanner');
          const querySnapshot = await getDocs(bannerCollectionRef);
      
          const bannerData = [];
      
          querySnapshot.forEach((doc) => {
            const bannerDocData = doc.data();
            // console.log(bannerDocData.category);
            // if (bannerDocData.category === localcategoryvalue) {
            //   bannerData.push(bannerDocData);
              
            // }
              bannerData.push(bannerDocData);

          });
      
          // Now, bannerData contains the data from the "Banner_2" subcollection of "HomeData" document.
          setCategoryBanner(bannerData);
          // return bannerData;
        } catch (error) {
          console.error('Error getting banner data:', error);
          return [];
        }
  
      // setTotalhomedata(data.docs);
    };
    useEffect(() => {
        if(local!==""){
setlocalcategoryvalue(local);
        
        // setTimeout(() => {
        }
        getDatas(); 
if(totalCategories.length===0){
  getCategoriesDatas();

}
if(subcatagoryalldata.length===0){ 
          fetchDataFromCollection();}
        // }, 2000);
    
     
     


    
  }, [local]);
  console.log(localcategoryvalue);

  const getCategoriesDatas = async () => {
    const data = await Category.getallCategories();
    setTotalCategories(data.docs);
  };

 
 const fetchDataFromCollection = async () => {
    try {
    setIsLoading(true)

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
      setSubcategoryalldata( data)
    } catch (error) {
      setIsLoading(false)

      console.error("Error fetching data from Firestore", error);
    }finally{
      setIsLoading(false)

    }
  };

  const handlethebannerclick = (e) => {
    // if( 
    //   e.productId!=="" ){
    //     navigate(`/productpage/${e.productId}`)
    //   }else{
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
// console.log(banner);
    return (
    <div>
   
     {/* <div className="slidermain" style={{height:"auto"}}>
           {banner!==null?
           banner.map((e,index)=> (e.category===localcategoryvalue? <div
            onClick={() => handlethebannerclick(e)}
            className="sliderdiv"
            style={{backgroundColor:e.bannerBackground }} >
            <img
              src={
                e.bannerImage
              }
              alt="SLIDERIMG"
            />
          </div>:""))
          :""}
                       
    </div> */}



        {isLoading?<CategorySkeleton/>:<div className='mainsubCategorypage'>
        <div className='subcategorypageslider'>
            <h3>CateGory's</h3>
        {totalCategories.map((e, index) => {
        return (
        

          <div
  key={index}
  onClick={() => {
    const categoryTitle = e._document.data.value.mapValue.fields.categoryTitle.stringValue;
    setCategory(categoryTitle);
    // localStorage.setItem('categorytitle', JSON.stringify(""));
    setlocalcategoryvalue("");
  }}
>
            <img
              src={
                e._document.data.value.mapValue.fields.categoryImage
                  .stringValue
              }
              alt={e._document.data.value.mapValue.fields.categoryTitle.stringValue}
            />
            <h4>
              {
                e._document.data.value.mapValue.fields.categoryTitle
                  .stringValue
              }
            </h4>
          </div>
          // </NavLink>
        );
      })}
        </div>
        
        <div className='subcategorypagedatashow'> 
      <h3> SubCateGory's</h3> 
<div>
{ 
   subcatagoryalldata.map((e, index) =>
      e.category === Cat || e.category === localcategoryvalue ? (
        <div key={index} onClick={()=>localStorage.setItem("productbycategory",JSON.stringify(e.subCategoryTitle),navigate("/subcategoryProducPage"))}>
          <img src={e.subCategoryImage} alt={e.subCategoryTitle} />
          <h6>{e.subCategoryTitle}</h6>
        </div>
      ) :""
    )
  }
</div>
  
        </div>
     </div>}
      
     









    </div>
  )
}

export default SubCategoryPage