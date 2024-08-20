import React from "react";
import { IconContext } from "react-icons";
import { BiUserCircle } from "react-icons/bi";
import { IoNotificationsOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import "./NavbarDropdown.css";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../Context/UseAuthContext";
import { FiLogOut } from "react-icons/fi";

import { FaHeart, FaRegHeart, FaRegObjectGroup } from "react-icons/fa";
const NavbarDropdown = ({ User, SingleUser ,setShowMediaIcons,showMediaIcons}) => {
  const {Logout}=useUserAuth();
  const handleClick = async () => {
    try {
      await Logout();
   

      
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="dropdown_menu">
      <ul>
        {User ? (
          <li onClick={() => setShowMediaIcons(!showMediaIcons)}>
            <NavLink to="/profile">
             
              <>My_Profile</>

            </NavLink>
          </li>
        ) : (
          ""
        )}
        <li onClick={() => setShowMediaIcons(!showMediaIcons)}>
       
        <IconContext.Provider
                value={{ className: "top-react-icons-wishelist" }}
              >
           <FaRegObjectGroup />
              </IconContext.Provider>
         
        </li>
        <li onClick={() => setShowMediaIcons(!showMediaIcons)}>
        <IconContext.Provider
                value={{ className: "top-react-icons-wishelist" }}
              >
             <FaRegHeart />
              </IconContext.Provider>
        
        </li>
        <li onClick={() => setShowMediaIcons(!showMediaIcons)}>
        
        </li>
        {/* <li>
          <NavLink to="/about">
            <IconContext.Provider
                value={{ className: "top-react-icons-notification" }}
              >
                <FaHeart />
              </IconContext.Provider>
            <>About Us</>
          </NavLink>
        </li> */}
        <li onClick={() => setShowMediaIcons(!showMediaIcons)}>
        <IconContext.Provider
       
                value={{ className: "top-react-icons-notification" }}
              >
             <FiLogOut  color="white"/>
              </IconContext.Provider>
        
        <Button variant="danger" onClick={handleClick}>
              SignOut
            </Button>
        </li>
      </ul>
    </div>
  );
};

export default NavbarDropdown;
