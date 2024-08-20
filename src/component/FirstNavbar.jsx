import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from "../Images/logo.jpg"
import "../CSS/Firstnavbar.css"
import { BiCartAlt, BiUserCircle } from 'react-icons/bi'
import { IconContext } from 'react-icons'
import { doc, onSnapshot } from 'firebase/firestore'
import { database } from '../firebaseauth'
import { useUserAuth } from '../Context/UseAuthContext'
import SearchComponent from './SearchComponent'

const FirstNavbar = () => {
    const {User}=useUserAuth();
  const [SingleUser, setUserData] = useState(null);

// console.log(SingleUser);
  useEffect(() => {
    // const storedUser = JSON.parse(localStorage.getItem('user'));

if(User){


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
  return (
  
    <div className="Firstnavbar_main">
        <div className="Firstnavbar_one"> <NavLink to={"/"} className="nav_link">
          {/* <div className="logo"> */}
            
            <img src={logo} alt="Logo" />
          
          {/* </div> */}
        </NavLink></div>

        <div className="Firstnavbar_two">
            <div>
            <NavLink className="nav_link" to={"/store"}>
              <>Store Info</>
            </NavLink>
            <NavLink to={"/contact_us"} className="nav_link">
              <>Contact Us</>
            </NavLink>
            </div>
            <div>
        <SearchComponent/>
            </div>
        </div>

        <div className="Firstnavbar_three">
        {!User ?  

         ( 
            <NavLink className="nav_link" to={"/login"}><>Login/Signup</></NavLink>
              ):(
            <NavLink to="/profile" className="nav_link" style={{display:"flex",alignItems:"center"}}>
 <IconContext.Provider
                value={{ className: "top-react-icons-user" }}
              >
                <BiUserCircle />
              </IconContext.Provider><h6 className="username" >
              {SingleUser&&SingleUser.name}
              </h6></NavLink>
              )
              }
              <div >
           
           <NavLink to="/cart"  >
       
          <div style={{display:"flex",position:"relative"}}>
         
          <IconContext.Provider value={{className:"top-react-icons-cart"}}>
          <BiCartAlt />
         
          </IconContext.Provider>
          <div >

          <h4  style={{color:"white",position:"absolute",backgroundColor:"red",borderRadius:"50%",width:"50%",right:"0%"}}>
          {
        
         SingleUser&&SingleUser.cartSize?SingleUser.cartSize:0
         }
         

          </h4>
          </div>

          </div>
        
        
           </NavLink>
         </div>
        </div>
    </div>
  )
}

export default FirstNavbar;