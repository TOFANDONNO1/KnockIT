import React, { useEffect, useState } from "react";
import "../CSS/NotificationSinglePage.css";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { database } from "../firebaseauth";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import UserDataService from "../services/User.js";
import { Button, Modal } from "react-bootstrap";

const NotificationSinglePage = ({ e, UserData }) => {
  const [showModal, setShowModal] = useState(false);
  const [read,setnewdataofread]=useState(null);
  let id;
  if (UserData) {
    id = UserData.uid;
  }

  const date = new Date(e.timeStamp);
  const day = date.toISOString().split("T")[0];
useEffect(()=>{
const getnewupdatenotification =  ()=>{
  if (id && e.id) {
    // setShowModal(true);
    const userId = id;
    const userRef = doc(database, "USERS", userId);
    // const notificationUser = await getDoc(userRef);
    // const singleNotification = Number(
    //   notificationUser.data().notificationSize
    // );
// console.log("line29",notificationUser.data());
    const cartDocRef = doc(userRef, "MY_NOTIFICATION", e.id);
    const unsubscribe = onSnapshot(cartDocRef, (doc) => {
      if (doc.exists()) {
        const notifiData = doc.data();
        setnewdataofread(notifiData.read);
      }
    });

    // Remember to unsubscribe when the component unmounts
    return () => unsubscribe();
  }
};
getnewupdatenotification();
},[showModal,e.id,id])
  const updateRead = async () => {
    if (id && e.id) {
      setShowModal(true);
      const userId = id;
      const userRef = doc(database, "USERS", userId);
      const notificationUser = await getDoc(userRef);
      const singleNotification = Number(
        notificationUser.data().notificationSize
      );

      const cartDocRef = doc(userRef, "MY_NOTIFICATION", e.id);
      const cartdoc = await getDoc(cartDocRef);


      if (cartdoc.exists()) {
        const notifiData = cartdoc.data();
        const notificationSize = String(singleNotification - 1);
      
                if (notifiData.read === "true") {
                  await UserDataService.updateUser(userId, { notificationSize });
                }
       
        notifiData.read = "false";
        await updateDoc(cartDocRef, notifiData);
      


       

      }
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div>
 <div
      onClick={updateRead}
      className="NotificationSinglePagemaindiv"
      style={read===false?{ backgroundColor: "white" }:
       e.read === "true"
          ? {  backgroundColor: "#048ED5",color:"white"}
          : { backgroundColor: "white" }
      }
    >
      <h3>{e.title}</h3>
      <h3>{day}</h3>
      <h3>{e.description}</h3>
  
    </div>
    <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h3>{e.title}</h3>
      <h3>{day}</h3>
      <h3>{e.description}</h3>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
    </div>
   
  );
};

export default NotificationSinglePage;
