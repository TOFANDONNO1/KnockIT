// Footer.js
import React, { useEffect, useState } from "react";
import logo from "../Images/logo.jpg";
import "../CSS/Footer.css";

import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../Context/UseAuthContext";
import UserDataService from "../services/User.js";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle, AiOutlineInstagram } from "react-icons/ai";
import { IconContext } from "react-icons";
import PermissionComponent from "./Location.jsx";
import { IoLogoApple, IoLogoGooglePlaystore } from "react-icons/io5";
const Footer = () => {
  const history = useNavigate();
  const [SingleUser, setUserData] = useState(null);
// const [location,setLocation]=useState(null);
  const { Logout, localUser } = useUserAuth();
  const location=JSON.parse(localStorage.getItem("address"));
    // setLocation(address);
    // console.log(location);
  useEffect(() => {
  
    if (localUser) {
      getUserData(localUser.uid);
    }
  }, []);

  const getUserData = async (id) => {
    const user = await UserDataService.getUser(id);

    setUserData(user.data());
  };
  // const handleClick = async () => {
  //   try {
  //     await Logout();
   

      
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  return (
    <footer>
      <div className="container">
        <div className="footerone">
          <div >
            <NavLink to={"/"}>
              <div className="logo">
              <img  src={logo} alt="Logo.JPG" />

              </div>
            </NavLink>
            <h6>
              {location !== null && location !== undefined
                ? location
                : "Refresh Your Page Or Allow Location"}
            </h6>
            {/* <h6><PermissionComponent/></h6> */}
          </div>
          <div>
            <h6>DOWNLOAD THE APP</h6>
            <NavLink className="nav_link">
              <h6><IoLogoGooglePlaystore color="black"/>Google play</h6>
            </NavLink>
            <NavLink className="nav_link">
              <h6><IoLogoApple  color="black"/> App Store</h6>
            </NavLink>
          </div>
          <div>
            <h6>POLICY</h6>
            <NavLink to={"/privacy_policy"} className="nav_link">
              <h6>Privacy Policy</h6>
            </NavLink>
            <NavLink to={"/Refund_policy"} className="nav_link">
              <h6>Refund Policy</h6>
            </NavLink>
            <NavLink to={"/Shipping_policy"} className="nav_link">
              <h6>Shipping Policy</h6>
            </NavLink>
          </div>
          <div>
            <h6>INFORMATION</h6>
            <NavLink to={"/Terms_conditions"} className="nav_link">
              <h6>Terms and conditions</h6>
            </NavLink>
           
            <NavLink className="nav_link" to={"/about"}>
              <h6>About Us</h6>
            </NavLink>
          </div>
          <div>
            <h6>SUPPORT</h6>
            <NavLink to={"/contact_us"} className="nav_link">
              <h6>Support / Contact Us</h6>
            </NavLink>
            {/* <h6>Advanced Search </h6> */}
            <NavLink className="nav_link" to={"/store"}>
              <h6>Store Info</h6>
            </NavLink>
           
            {/* <Button variant="danger" onClick={handleClick}>
              SignOut
            </Button> */}
          </div>
        </div>
        <div className="footer-content">
          <h6>Keep in Touch</h6>
          <ul className="social-links">
            <li>
              <a href="">
                <IconContext.Provider
                  value={{ className: "top-react-icons-facebook" }}
                >
                  <FaFacebook />
                </IconContext.Provider>
              </a>
            </li>
            <li>
              <a href="">
                <IconContext.Provider
                  value={{ className: "top-react-icons-tweet" }}
                >
                  <AiFillTwitterCircle />
                </IconContext.Provider>
              </a>
            </li>
            <li>
              <a href="">
                <IconContext.Provider
                  value={{ className: "top-react-icons-insta" }}
                >
                  <AiOutlineInstagram />
                </IconContext.Provider>
              </a>
            </li>
            <li>
            <PermissionComponent/>
            </li>
          </ul>
          <p>&copy; {new Date().getFullYear()}KnockIT</p>
        </div>
      </div>
    
    </footer>
  );
};

export default Footer;
