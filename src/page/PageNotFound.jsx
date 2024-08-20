import React from 'react'
import "../CSS/PageNotFound.css"
import { NavLink } from 'react-router-dom'
const PageNotFound = () => {
  return (
    <div className="PageNot_container">
        <h2>404</h2>
        <h3>Oops, nothing here...</h3>
        <p>Please Check the URL</p>
        <p>Otherwise, <NavLink to={"/"}>Click hear</NavLink> to redirect to homepage.</p>
    </div>
  )
}

export default PageNotFound