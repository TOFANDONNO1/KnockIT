import React from 'react'
import Footer from '../Footer'
import Navbar from '../../component/Navbar'

import logo from "../../Images/logo.jpg";
import "../../CSS/Policy/Privacy.css"
const Contact_Us = () => {
  return (
    <div>
   

        <div className="privacy_policy">
            <div className="logo">
            <img  src={logo} alt="KnockIT" />
            </div>
        <h2>Contact Us
</h2>
     <p>If you have questions or concerns about your privacy, please contact us at:
</p>
<p>KnockIT Grocery Delivery
</p>

<p>+91 0000000000</p>
<p>KnockITonline@gmail.com</p>
<p>By using our services, you agree to the terms outlined in this Privacy Policy. </p>
<p>Last updated:09/11/2023</p>
        </div>
        
    </div>
  )
}

export default Contact_Us