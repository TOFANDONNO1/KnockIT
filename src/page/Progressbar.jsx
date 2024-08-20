import React from 'react'
import "../CSS/Progressbar.css"
const Progressbar = ({val,col}) => {
   
  return (
    <div className='progress'>
        <div style={{width:`${val}%`,backgroundColor:`${col}`}}></div>
         </div>
  )
}

export default Progressbar