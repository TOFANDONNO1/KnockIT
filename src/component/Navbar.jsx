import React, { useEffect, useState } from "react";
import "../CSS/navbar.css";
import {IoNotificationsOutline} from "react-icons/io5";
import UserDataService from "../services/User.js";

import { NavLink } from "react-router-dom";
import { useUserAuth } from "../Context/UseAuthContext.js";

import {  doc,  onSnapshot } from "firebase/firestore";
import { database } from "../firebaseauth.js";
import { FaRegHeart } from "react-icons/fa";

const Navbar = () => {
  const {User}=useUserAuth();


  
  const [SingleUser, setUserData] = useState(null);

 

  useEffect(() => {


if(User){

  updateTimestamp(User.uid);
  getUserData(User.uid);

}
   
    
  }, [User]);

  const getUserData =  (id) => {
   
    const userDocRef=doc(database,"USERS",id);

    onSnapshot(userDocRef,(doc)=>{
      if(doc.exists()){
        setUserData(doc.data());
        // console.log(doc.data());
      }
    })

  };
  const updateTimestamp = async (id) => {
    try {
      await UserDataService.updateUser(id, { timeStamp: Date.now() });
    } catch (error) {
      console.log(error);
    }
  };
  
  // const finalCartSize=SingleUser?SingleUser.cartSize:0;
  return (
  <div className="navbar_main">
     <NavLink className="nav_link" to="/"><>HOME</></NavLink>
    <NavLink  className="nav_link"  to="/category"><>CATEGORY</></NavLink>
    <NavLink  className="nav_link"  to="/allproductpage"><>PRODUCTS</></NavLink>
    <NavLink className="nav_link" to="/order">
            ORDERS
          </NavLink>
          <NavLink className="nav_link" to="/wishelist">
          
             <FaRegHeart />
           
          WISHLIST({SingleUser && SingleUser.wishlistSize
                ? SingleUser.wishlistSize
                : "0"})
          </NavLink>
          <NavLink className="nav_link" to="/notification">
           
                <IoNotificationsOutline />
            
              <>Notifications({SingleUser && SingleUser.notificationSize
                ? SingleUser.notificationSize
                : "0"})</>
         
          </NavLink>
  </div>
//     <>
//       <nav className="main-nav">

       

//         <div 
//           className={
//             showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
//           }
//         >
//           <ul>
          
//             {/* <li> */}
              
//               <PermissionComponent/>
//             {/* </li> */}
//             <li onClick={() => setShowMediaIcons(!showMediaIcons)}>
           
           
//              
//               <IconContext.Provider value={{className:"top-react-icons-notification"}}>
//             <AiOutlineHome />
//              </IconContext.Provider>
//                <>Home</> </NavLink>
//             </li>
//             <li onClick={() => setShowMediaIcons(!showMediaIcons)}>
//              
//             </li>

//             <li onClick={() => setShowMediaIcons(!showMediaIcons)}>
//             
//             </li>
//           {User&&  <div className="Navbar_menu"
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}>
//           <IconContext.Provider value={{className:"top-react-icons-notification"}}>
//               <BiUserCircle />
//              </IconContext.Provider>
//               {isDropdownVisible &&<NavbarDropdown User={User} SingleUser={SingleUser} setShowMediaIcons={setShowMediaIcons} showMediaIcons={showMediaIcons}/>}
            

//             </div>} 
           
           
            
            
          

        
//           </ul>
//         </div>

//         {/* 3rd social media links */}
//         <div className="social-media">
//           {/* hamburget menu start  */}
//           <div className="hamburger-menu">
//             <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
//               <GiHamburgerMenu color="white"/>
//             </a>
//           </div>
//         </div>
//       </nav>
// <div>

// </div>
    
//     </>
  );
};

export default Navbar;
