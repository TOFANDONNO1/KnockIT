import React, { useEffect, useRef, useState } from "react";
import Navbar from "../component/Navbar";
import Footer from "./Footer";
import Modal from "react-modal";
import logo from "../Images/logo.jpg";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import profile from "../Images/Profile.jpg"
 import { useUserAuth } from "../Context/UseAuthContext";
import UserDataService from "../services/User.js";
import "../CSS/Profile.css";
import { auth, database, storageInstance  } from "../firebaseauth";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { doc, onSnapshot } from "firebase/firestore";
import { updateEmail } from "firebase/auth";
const Profile = () => {
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const history = useNavigate();

  const [SingleUser, setUserData] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
const [FormData,setFromData]=useState(null);
const [UserData,SetUser]=useState(null);
const {  Logout ,User} = useUserAuth();
const handleClick =  () => {
  // try {
     Logout();
    // window.localStorage.removeItem("isSignUp");
    // window.localStorage.removeItem("isSignIn");
// if(!User){
  history("/");

// }
  // } catch (error) {
  //   console.log(error.message);
  // }
};
  let id;
  // if (User&&User.uid) {
  //   id = User.uid;
  // }
  if(UserData){
    id=UserData.uid
  }
  useEffect(()=>{
    // const storedUser = JSON.parse(localStorage.getItem('user'));
    if (User) {
      SetUser(User);
    }
    if(id){
      getUserData(id);
    }
  },[id,User])
 

  const getUserData =  (id) => {
   
    const userDocRef=doc(database,"USERS",id);

    onSnapshot(userDocRef,(doc)=>{
      if(doc.exists()){
        setUserData(doc.data());
        // console.log(doc.data());
      }
    })

  };
  const openModal = () => {
    setFromData({name:SingleUser.name,email:SingleUser.email,number:SingleUser.number})
    setModalIsOpen(true);
  };

  const closeModal = async() => {
    setModalIsOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(image==null)return;
  
    const name = e.target.name.value;
   const number=e.target.phone.value;
   const mail=e.target.mail.value;
   const imageRef=ref(storageInstance ,`profiles/${id}`);
   const user=auth.currentUser;
   
  //  console.log(user);
   if (
    name === "" ||
    number === "" ||
    mail === "" 
    
  ) {
    toast.info("Please enter all crenentials", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })}else{

    
   console.log(mail);
  
  
    try {
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);
      updateEmail(auth.currentUser,mail).then(async()=>{
        await UserDataService.updateUser(id, { name, profile: imageUrl ,number,email:mail});
        toast.info(`${name} Data Updated`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
          closeModal();

      }).catch((error)=>{if(error.code==="auth/requires-recent-login"){
        toast.info(`${name} Please Login Then Updated`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
auth.signOut();
history("/login");
      }
        // console.error( error.code);
      })
   
    
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }
    if (id) {
      getUserData(id);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    
  };

  return (
    <div>
 
     
      <div style={{height:"585px"}}>

   
      <div className="profile-container">
        <div className="profile-image">
          <img
            src={
              SingleUser &&   SingleUser.profile
                ? SingleUser.profile
                : profile
            }
            alt=""
          />
          <Button variant="outline-danger" onClick={handleClick}>SignOut</Button>

        </div>
        <div className="profile-details">
          <h2>
            {            SingleUser && SingleUser.name
              ? SingleUser.name
              : ""}
          </h2>
          <p>
         
           Mail: {            SingleUser 
              ? SingleUser.email
              : ""}
          </p>
          <p>
           
           Phone: {            SingleUser 
           
              ? SingleUser.number
              : ""}
          </p>
          {/* Add more user data as needed */}
          <Button variant="outline-primary" onClick={openModal} className="submit-button"> Update Profile</Button>

          <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Example Modal"
  className="custom-modal" // Add a custom class to your modal
>
  <form onSubmit={(e) => handleSubmit(e)}>
    <h2>Update Profile</h2>
    <label>
      Image:
      <div
        className="image-upload-container" // Add a custom class to your image container
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.click();
          }
        }}
      >
        {image ? (
          <img
            className="uploaded-image" // Add a custom class to your uploaded image
            src={URL.createObjectURL(image)}
            alt="For Add Img"
          />
        ) : (
          <img
            className="default-image" // Add a custom class to your default image
            src={
              SingleUser
                ? SingleUser.profile
                : logo
            }
            alt="Add_your_Profile"
          />
        )}
        <input
          type="file"
          name="img"
          ref={inputRef}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </div>
    </label>
    <label>
      User Name:
      <input type="text" name="name" placeholder="Enter Your Name" />
    </label>
    <label>
    Phone:
      <input  type="tel"
            name="phone"
            pattern="[0-9]{10}"  placeholder="Enter Your Number" />
    </label>
    <label>
    Mail:
      <input type="email" name="mail" placeholder="Enter Your Mail" />
    </label>
    <button className="submit-button">Submit</button>
  </form>
</Modal>

        </div>
      </div>
      </div>
     
    </div>
  );
};

export default Profile;
