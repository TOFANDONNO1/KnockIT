import React from 'react'
import "../../CSS/Skeletons/SubcategorySkeleton.css";
const SubcategorySkeleton = () => {
  return (
    <div style={{width:"90%",margin:"auto"}} className="main_sub_store_skeleton">

    <div className="Skeleton_category"> 
     <div className="honee_skeleton">
    <h2></h2>
    <div className="htwo_skeleton">
      {Array.from({length:6},(_, index) => {
        return (
         

          <div   key={index}>
           
            <div
              src=""
              alt=""
            />
            <h4>
            
            </h4>
          </div>
         
        );
      })}
    </div>
  </div></div>

  <div className="store_details_home_skeleton">

  
   
          <div className="honee_skeleton">
    <h2></h2>
    <div className="htwo_skeleton">
      {Array.from({length:6},(_, index) => {
        return (
     

          <div   key={index}>
           
            <div
             style={{borderRadius:"5px" }}
              src=""
              alt=""
            />
            <h4></h4>
          </div>
     
        );
      })}
    </div>
  </div>


   

  
   

  </div>
  </div>

  )
}

export default SubcategorySkeleton