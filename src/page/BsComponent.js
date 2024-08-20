import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useUserAuth } from '../Context/UseAuthContext';
import UserDataService from "../services/User.js";
import "../CSS/BsComponent.css"
import {  collection, deleteDoc, doc, getDocs, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { database } from '../firebaseauth';

import { Dropdown, Form } from 'react-bootstrap';
import WhatsAppChatButton from './WhatsApp.jsx';
import { ToastContainer ,toast} from 'react-toastify';
const Example=({totalPrice,cartData,setTotalPrice})=> {
  const [show, setShow] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [SingleUser,setUserData]=useState(null);
  const [UserData,setUser]=useState(null);
  const {User,setCartSize}=useUserAuth();
const [deliveryCharge,setDistance]=useState(0);
const [allAdress,setallAdress] = useState(null);
const [showForm, setShowForm] = useState(false);
const [singleAddress,setSingleAdress]=useState(null);
const [singleformData, setsingleFormData] = useState({
 

  name:"",
  address:"",
  pincode:"",
  city:"",
    number:"",
  
  });
const [formData, setFormData] = useState({
 

  name:"",
  address:"",
  pincode:"",
  city:"",
    number:"",
  
  });

  const [showsingleaddressform,setshowsingleaddressform] = useState(null);
let id;
if(UserData){
  id=UserData.uid;
}
function sendNotification(name, message, token) {
  const key = "AAAA1GKyPQY:APA91bHHqpGYjpQWwlHkB1SKY1HU_MbJHgll3RvthoX6C3CHDl3o86eb54u0ytDkvPtf4Zjr_acmVUKRVjtMwzND3bGg6XGQrzSxQFazinkADaAS4VJYFEOuIE0XtyhD0Cy02DjfPknL";

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Key=${key}`
  };

  try {
    const url = 'https://fcm.googleapis.com/fcm/send';
    const data = {
      title: name,
      body: message
    };

    const notificationData = {
      notification: data,
      to: token
    };

    fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(notificationData)
    })
    .then(response => {
      // Handle response here
      // You can check response.ok and response.status for success/error handling
    })
    .catch(error => {
      // Handle error here
    });

  } catch (ex) {
    // Handle exception
  }
}

const buyNow=async()=>{
  if(id){
    toast.info('Order Sucessfull ', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  


      cartData.forEach((e) => {

    const randomId = Math.random().toString(36).substring(2);
  
        const orderInfo = {
          address:(singleAddress&&singleAddress.address?singleAddress.address:e.address),
          city:(singleAddress&&singleAddress.city?singleAddress.city:e.city),
          coupon:e.coupon,
          couponId:e.couponId,
          deliveredDate:"",
          delivery:"Pending",
          deliveryPrice:String(deliveryCharge),
          id:randomId,
          latitude:e.latitude,
          longitude:e.longitude,
          name:(singleAddress&&singleAddress.name?singleAddress.name:e.name),
          number:(singleAddress&&singleAddress.number?singleAddress.number:e.number),
          orderConfirmedDate:"",
          outForDeliveryDate:"",
          payment:"Cash on delivery",
          pincode:(singleAddress&&singleAddress.pincode?singleAddress.pincode:e.pincode),
          price:Number(e.price),
          productCuttedPrice:Number(e.productCuttedPrice),
          productId:e.productId,
          productPrice:Number(e.productPrice),
          productTitle:e.productTitle,
          qty:e.qty,
          qtyId:e.qtyId,
          qtyNo:Number(e.qtyNo),
          ratingProduct:"",
          riderId:"",
          shippedDate:"",
          state:e.state,
          storeId:e.storeId,
          productImage:e.productImage,
          
               userToken:(e.token)||"",
          timeStamp: Date.now(),
          uid: User.uid,
       
        };
        sendNotification(e.productPrice,"Order Confirem",e.storeToken)
  // console.log(orderInfo);
// const notificationInfo={
//   productId:e.productId,
//   productPrice:String(e.productPrice),
//   productTitle:e.productTitle,
//   timeStamp: Date.now(),

// }

        try {
         
          const orderRef = collection(database, "ORDER");
        const customDocRef = doc(orderRef, randomId);
         // Specify the custom ID here
        setDoc(customDocRef, orderInfo);
setTotalPrice(Number(0))
// const notificationRef = collection(database, "OrderNotification");
// const customNotificationRef = doc(notificationRef, e.storeId);
 // Specify the custom ID here
// setDoc(customNotificationRef, notificationInfo);
        async function deleteSubcollection(db, parentCollection, documentId, subcollectionName) {
          const subcollectionRef = collection(db, parentCollection, documentId, subcollectionName);
          const subcollectionQuery = await getDocs(subcollectionRef);
        
          subcollectionQuery.forEach(async (subDoc) => {
            const subDocRef = doc(db, parentCollection, documentId, subcollectionName, subDoc.id);
            await deleteDoc(subDocRef);
    await UserDataService.updateUser(id,{cartSize:"0"});
   setCartSize(0)
   

          });
        }
        
        // Example usage
        const parentCollection = 'USERS';
        const documentId = id;
        const subcollectionName = 'MY_CART';

        
        deleteSubcollection(database, parentCollection, documentId, subcollectionName)
       
        } catch (error) {
          console.log(error);
        }
      });
  };
}
useEffect(()=>{
  if(User) {
    setUser(User)
    getAddressDatafromUserSubCollection()
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
// console.log(totalPrice,(cartData!==null?cartData:0));
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDropdownChange = (value) => {
    // setSelectedValue(value);
    if(SingleUser&&SingleUser.city){
      const mainString=SingleUser.city;
      const subCitys= ["Hanamkonda", "Warangal","Kazipet"];
     const containsSubstring = subCitys.some(substring =>
        mainString.includes(substring)
      );
      console.log(containsSubstring);
    
   if(containsSubstring){
    if(totalPrice>=299){
      setDistance("Free Delivery")
          }else{
      
          
          if(value==="Hanamkonda"){
            setDistance(30)
          }else if(value==="Warangal"){
            setDistance(50)
          }else if(value==="Kazipet"){
            setDistance(50)
          }
        }
    setShowButton(true);
   }else{
    toast.info('Order Not Available in Your City ', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
   }
  }
  };
  const phone = '+';

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phone}`, '_blank');
  };
// console.log(localUser,UserData,SingleUser);



const handleShowForm = () => {

  setFormData({
  
    name:SingleUser.name,
    address:SingleUser.address,
    pincode:SingleUser.pincode,
    city:SingleUser.city,
      number:SingleUser.number,
      timeStamp:Date.now(),
    })
  setShowForm(!showForm);
  console.log(SingleUser);
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

const handleFormSubmit = (e) => {
  e.preventDefault();

  if(formData.city===""||formData.pincode===""||formData.address===""||formData.name===""||formData.number==="") {
    toast.info('Please fill all the fields', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }else{

const randomStringForAddress = Math.random().toString(36).substring(2, 8);
  
 console.log(formData);
 const userRef=doc(database,"USERS",User.uid);
 const newAddressRef=doc(collection(userRef,"ADDRESS"),randomStringForAddress);
 setDoc(newAddressRef,{...formData,id:randomStringForAddress});
 toast.info('New Adress Added', {
  position: "top-right",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  });
  setShowForm(false);
  getAddressDatafromUserSubCollection();

    }
};

const getAddressDatafromUserSubCollection =()=>{
 const userRef=doc(database,"USERS",User.uid);

  const addressCollectionRef=collection(userRef,"ADDRESS");
const addressArray=[];
  const unsubscribe = onSnapshot(addressCollectionRef, (snapshot) => {
    snapshot.forEach((doc) => {
      // console.log("Address ID: ", doc.id);
      // console.log("Address data: ", doc.data());
      addressArray.push(doc.data());
      // Process each document in the "ADDRESS" subcollection here
    });
    setallAdress(addressArray)
  });

  return unsubscribe;
}
// console.log(allAdress);
const handleCancel = () => {setShowForm(false);};

const handleNewAdressinfo=(e)=>{
  setSingleAdress(e);
}
const handleDeleteOneSingleAdress=async(e)=>{

  const addressRef = doc(database, 'USERS', User.uid, 'ADDRESS', e.id);

  try {
    await deleteDoc(addressRef);
  getAddressDatafromUserSubCollection();

    console.log('Address document deleted successfully');
  } catch (error) {
    console.error('Error deleting address document: ', error);
  }

  }

  const handleFromShowForPerticularAdress=(e,index)=>{
    console.log(e);
    setsingleFormData({
      id:e.id,
      name:e.name,
      address:e.address,
      pincode:e.pincode,
      city:e.city,
      number:e.number,
      timeStamp:Date.now(),
    })
    setshowsingleaddressform(index);
    
  }

  const handleInputChangeForSingleForm = (e) => {
    const { name, value } = e.target;
    setsingleFormData({ ...singleformData, [name]: value });
  };


  const handleFormSubmitsingleadress=async(e)=>{

console.log(singleformData);

e.preventDefault();

    if(singleformData.city===""||singleformData.pincode===""||singleformData.address===""||singleformData.name===""||singleformData.number==="") {
      toast.info('Please fill all the fields', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }else{
      const userRef = doc(database, 'USERS', User.uid);
const addressDocRef = doc(collection(userRef, 'ADDRESS'), singleformData.id);
console.log(singleformData,"dinf");
try {
  await updateDoc(addressDocRef, singleformData);
  toast.info('Document updated successfully!', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
  console.log('Document updated successfully!');
} catch (error) {
  console.error('Error updating document: ', error);
}
setshowsingleaddressform(null);

    }


  }
  return (
    <>
    

      <Button variant="primary" onClick={handleShow}>
       CheckOut
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
       
      >
        <div className="bscomponent_main_div">
<div>  <Modal.Header closeButton>
          <Modal.Title>Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       <div className='maindivofpaymentpage'>
        <div className='udermaindivofpaymentpagefirst'>
          <div>
            <h6>📌Delivery to </h6>
            <h6> {singleAddress&&singleAddress.address?singleAddress.address: SingleUser && SingleUser.address}</h6>

          </div>
          <div>
            <h6>
              User information
            </h6>
            <h6>Name:
            {singleAddress&&singleAddress.name?singleAddress.name: SingleUser &&SingleUser.name }
          </h6>
          <h6>
            Email:
            {            SingleUser&&SingleUser.email
        }
          </h6>
          <h6>
            Phone Number:
            {   singleAddress&&singleAddress.number?singleAddress.number:SingleUser &&SingleUser.number
             }
          </h6>
          </div>
        </div>


        <div className='udermaindivofpaymentpagesecond'>

<h6>Delivery Price {deliveryCharge}</h6>


<h6>Total Amount ₹{deliveryCharge!=="Free Delivery"?totalPrice+Number(deliveryCharge):totalPrice}</h6>
{cartData!==null?<h6>{cartData.length}items</h6>:<h6>0 items</h6>}
<h6>Delivery time at 10:00 Am - 10:00 Pm</h6>

        </div>

       </div>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary"  onClick={handleShowForm}>
            + Add a new address
          </Button>


          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Dropdown onSelect={handleDropdownChange}>
        <Dropdown.Toggle variant="success">Select Your City</Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu">
          <Dropdown.Item className="dropdown-item" eventKey="Hanamkonda">Hanamkonda</Dropdown.Item>
          <Dropdown.Item className="dropdown-item" eventKey="Warangal">Warangal</Dropdown.Item>
          <Dropdown.Item className="dropdown-item" eventKey="Kazipet">Kazipet</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

         {showButton && (
        <Button onClick={buyNow} variant="outline-primary">
          PROCEED TO PAY
        </Button>
      )}
      <Button variant="outline-warning" onClick={handleWhatsAppClick}>Quick Delivery</Button>
        </Modal.Footer>
        {/* form of new address added */}

        {showForm && (
          <div className="edit_address_form">
            <h3>Add New  Address</h3>
            <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="Address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="Pincode">
            <Form.Label>Pincode</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
            />
          </Form.Group>
        
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="Number">
            <Form.Label>Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter number"
              name="number"
              value={formData.number}
              onChange={handleInputChange}
            />
          </Form.Group>
        
          <Button variant="primary" type="submit">
            Save Address
          </Button>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Form>
          </div>
       
      )}
</div>
<div>
{/* display Address */}

<div className="all_address_maindiv">
 {allAdress&&allAdress.length>0&&<h6>Select Your Adress</h6>} 
{allAdress&&allAdress.length>0? allAdress.map((e,index)=>(
<div className="all_address_second_div" key={index} onClick={()=>handleNewAdressinfo(e)}>
  <h6>Name - {e.name}</h6>
<h6>Phone - {e.number}</h6>
<h6>City - {e.city}</h6>
<h6>Pincode - {e.pincode}</h6>
<h6>Address - {e.address}</h6>
<div className="all_address_button_div">
<Button variant="outline-danger" onClick={()=>handleDeleteOneSingleAdress(e)}>Delete</Button>

  <Button variant="outline-success" onClick={()=>handleFromShowForPerticularAdress(e,index)}>Edit</Button>
</div>
{showsingleaddressform===index && (
          <div className="edit_address_form">
            <h3>Edit  Address</h3>
            <Form onSubmit={handleFormSubmitsingleadress}>
          <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={singleformData.name}
              onChange={handleInputChangeForSingleForm}
            />
          </Form.Group>
          <Form.Group controlId="Address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              name="address"
              value={singleformData.address}
              onChange={handleInputChangeForSingleForm}
            />
          </Form.Group>
          <Form.Group controlId="Pincode">
            <Form.Label>Pincode</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter pincode"
              name="pincode"
              value={singleformData.pincode}
              onChange={handleInputChangeForSingleForm}
            />
          </Form.Group>
        
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              name="city"
              value={singleformData.city}
              onChange={handleInputChangeForSingleForm}
            />
          </Form.Group>
          <Form.Group controlId="Number">
            <Form.Label>Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter number"
              name="number"
              value={singleformData.number}
              onChange={handleInputChangeForSingleForm}
            />
          </Form.Group>
        
          <Button variant="primary" type="submit">
            Save Address
          </Button>
          <Button variant="secondary" onClick={handleFromShowForPerticularAdress}>
            Cancel
          </Button>
        </Form>
          </div>
       
      )}
</div>

)):""}
</div>


</div>
        </div>
      


















      </Modal>
    </>
  );
}


export default Example;