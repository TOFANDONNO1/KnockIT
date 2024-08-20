import React from 'react'
import "../../CSS/Skeletons/CategorySkeleton.css";
const CategorySkeleton = () => {
  return (
    <div className="mainsubCategorypage_skeleton">
        <div className='subcategorypageslider_skeleton'>
<h3></h3>
<div>
{Array.from({length:3},(_, index) => {
        return (
         

          <div   key={index}>
           
          
<img src="" alt="" />
            <h4></h4>
          </div>
         
        );
      })}
</div>


        </div>



        <div className='subcategorypagedatashow_skeleton'>
            <h3></h3>
            <div>
            {Array.from({length:3},(_, index) => {
        return (
         

          <div   key={index}>
           
          
<img src="" alt="" />
            <h4></h4>
          </div>
         
        );
      })}
            </div>
        
        </div>
    </div>
  )
}

export default CategorySkeleton