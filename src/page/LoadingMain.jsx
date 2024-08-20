import React from 'react'
import logo from '../Images/loadinggif.gif';
import loading from '../Images/loading.gif';
import "../CSS/LoadingMain.css"
export const LoadingMain = () => {
  return (
    <>
          <div className="LoadingMain_center">
    <div ><img src={logo} alt = "logo"  /></div>
    <div ><img src={loading} alt="loader" /></div>
  </div>
    </>
  )
}
