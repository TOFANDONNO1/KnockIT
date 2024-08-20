import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Footer from "./Footer";
import { collection, doc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { database } from "../firebaseauth";
import NotificationSinglePage from "./NotificationSinglePage";
import { useUserAuth } from "../Context/UseAuthContext";
import { IconContext } from "react-icons";
import { IoNotificationsOffSharp } from "react-icons/io5";
import "../CSS/NotificationSinglePage.css"
const Notification = () => {
  const [notification, setNotification] = useState(null);
  // const [UserData, SetUser] = useState(null);
const {User}=useUserAuth();
  let id;
  if (User) {
    id = User.uid;
  }

  // let totalArray=[]
  useEffect(() => {
    // const storeUser = JSON.parse(localStorage.getItem("user"));
    const notificationdata = async () => {
    
      try {
        if (id) {
          const userId = id;
          const userRef = doc(database, "USERS", userId);
          const cartCollectionRef = collection(userRef, "MY_NOTIFICATION");
          const querys = query(cartCollectionRef, orderBy("timeStamp", "desc"));
          const unsubscribe = onSnapshot(querys, (snapshot) => {
            const cartItems = [];
            snapshot.forEach((doc) => {
              const cartItem = doc.data();
              cartItems.push(cartItem);
            });
            setNotification(cartItems);
          });
        
          return () => unsubscribe();
        }
      } catch (error) {
        console.error("Error checking wishlist", error);
      }
    };

    notificationdata();


  }, [id]);
console.log("notification",notification,User);
  return (
    <>
  

      <div
        style={{
          // height: "380px",
          // overflow: "scroll",
          width: "98%",
          margin: "2% auto",
        }}
      >
       {notification&&notification.length>0&& <h4>Notifications</h4>}
        {notification !== null && notification.length > 0 ? (
          notification.map((e, i) => (
            <NotificationSinglePage key={i} e={e} UserData={User} />
          ))
        ) : (
          <div>
<h4>
            No Notification
          </h4>
          <IconContext.Provider value={{className:"react-icon-notification"}}>
          <IoNotificationsOffSharp />

              </IconContext.Provider>
          </div>
          
        )}
      </div>


    </>
  );
};

export default Notification;
