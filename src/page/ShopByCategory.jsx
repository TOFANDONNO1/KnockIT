import React, { useEffect, useState } from 'react'
import Category from '../services/Category';
import {  useNavigate } from 'react-router-dom';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { database } from '../firebaseauth';
import SubcategorySkeleton from './Skeletons/SubcategorySkeleton';

const ShopByCategory = () => {
const [isLoading, setIsLoading] = useState(true);
const [branches, setBranches] = useState([]);

const navigate=useNavigate();    
  const [totalCategories, setTotalCategories] = useState([]);
  useEffect(() => {
    setIsLoading(true)

    getCategoriesDatas();
      fetchBranchesData()
        .then((data) => {
          setBranches(data);
        
        })
        .catch((error) => {
       setIsLoading(false)
        }).finally(() => {
          setIsLoading(false)
        });
}, []);


const getCategoriesDatas = async () => {
    const data = await Category.getallCategories();
    setTotalCategories(data.docs);
  };

  const handleClick=(id,title)=>{
    localStorage.setItem('categorytitle', JSON.stringify(title));

    navigate(`/category/${id}`)
  }
  const fetchBranchesData = async () => {

    try {
      const collectionRef = collection(database, 'BRANCHES');
  const q=query(collectionRef,orderBy("timeStamp","asc"));
      const querySnapshot = await getDocs(q);
  
      const branchesData = [];
  
      querySnapshot.forEach((doc) => {
        const branchData = doc.data();
        branchesData.push(branchData);
      });
  
      return branchesData;
    } catch (error) {
      console.error('Error fetching data from Firestore', error);
      throw error; 
    }
  };
  // console.log(branches);
  return (
    <div style={{width:"90%",margin:"auto"}} className="main_sub_store">
      {isLoading?<SubcategorySkeleton/>:
<div>

  <div> 
     <div className="honee">
    <h2>SHOP BY CATEGORY</h2>
    <div className="htwo">
      {totalCategories.map((e, index) => {
        return (
          // <NavLink to={"/category"}>

          <div  onClick={ ()=> handleClick(e._document.data.value.mapValue.fields.id.stringValue,e._document.data.value.mapValue.fields.categoryTitle.stringValue)} key={index}>
           
            <img
              src={
                e._document.data.value.mapValue.fields.categoryImage
                  .stringValue
              }
              alt={e._document.data.value.mapValue.fields.categoryTitle
                .stringValue}
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
  </div></div>

  <div className="store_details_home">

  
   
          <div className="honee">
    <h2>SHOP BY STORE</h2>
    <div className="htwo">
      {branches&&branches.map((e, index) => {
        return (
     

          <div  onClick={ ()=> navigate(`/store/${e.storeId}`)} key={index}>
           
            <img
             style={{borderRadius:"5px" }}
              src={
                e.storeImage
              }
              alt={e.storeName}
            />
            <h4>
              {
                e.storeName
              }
            </h4>
          </div>
     
        );
      })}
    </div>
  </div>


   

  
   
  </div>

  </div>}
  </div>
    
  )
}

export default ShopByCategory;