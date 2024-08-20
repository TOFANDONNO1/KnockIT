import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Footer from "./Footer";
import UserDataService from "../services/User.js";

import "../CSS/Cart.css";
import {
  collection,

  doc,

  getDocs,
  onSnapshot,
  orderBy,
  query,
 
 
} from "firebase/firestore";
import { database } from "../firebaseauth";

import cartimg from "../Images/CartEmpty.webp";
import PacmanLoader from "react-spinners/PacmanLoader";
// import ClipLoader from "react-spinners/ClipLoader";
import CartItemCard from "./CartItemCard";
import SkeletonLoader from "./SkeletonLoader";
import Example from "./BsComponent";
import { useUserAuth } from "../Context/UseAuthContext";
import { Button, Spinner } from "react-bootstrap";
import { MdAddShoppingCart } from "react-icons/md";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router";
const Cart = () => {
  // const [removeBtnLoading, SetremoveBtnLoading] = useState(false);
  const [totalArray, setTotalArray] = useState([]);
  const [UserData, SetUser] = useState(null);
  const [cartData, setIsInCartlist] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [removeBtnLoading, SetremoveBtnLoading] = useState(false);
  const [cutprice, setcutprice] = useState(null);
const [storedata,setStoreData]=useState(null);
const [oneitem,setOneItem]=useState(null);
const [btnloader,setLoadingBtn]=useState(false);

const navigate=useNavigate();    

  // const [newupdatecartdata,setNewupdatecart]=useState(null);
const {User}=useUserAuth();
  let id;
  if (UserData) {
    id = UserData.uid;
  }

  // let totalArray=[]
// console.log(storedata,oneitem);
console.log(totalPrice);

  useEffect(() => {
    // const storeUser = JSON.parse(localStorage.getItem("user"));
// console.log("totallprice",totalPrice);
// 
    if (User) {
      SetUser(User);
    }
  
    const fetchData = async () => {
      // Fetch store data
      const storeDataSnapshot = await getDocs(collection(database, "BRANCHES"));
      const storeData = storeDataSnapshot.docs[0].data();
      setStoreData(storeData);
    
      if (User) {
        const userId = User.uid;
        const userRef = doc(database, "USERS", userId);
        const cartCollectionRef = collection(userRef, "MY_CART");
        const querys = query(cartCollectionRef, orderBy("timeStamp", "desc"));
    
        const unsubscribe = onSnapshot(querys, (snapshot) => {
          const cartItems = [];
    
          snapshot.forEach((doc) => {
            const cartItem = doc.data();
            setOneItem(doc.data());
            cartItems.push(cartItem);
          });
    
          setIsInCartlist(cartItems);
        });
    
        setIsLoading(false);
    
        // Cleanup function to detach the listener when the component unmounts
        return () => {
          unsubscribe();
        };
      }
       
    
    
       
    
       
      }
    
  

    fetchData();
    const updatecartsize=async()=>{
      if(cartData&&id){
        const size=String(cartData.length)
        await UserDataService.updateUser(id, {cartSize:size });
  
      }
    }
 updatecartsize();
    // console.log(cartData);

    console.log(totalPrice);

  }, [User]);


  return (
    <div className="Cart_main">

      {removeBtnLoading ? (
        // <ClipLoader />
        <div style={{
          height: "400px",
          // backgroundColor: "darkblue",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
        {/* <PacmanLoader speedMultiplier={5} color="#36d7b7"  size={20} margin={50} loading={removeBtnLoading}  /> */}
        <Spinner animation="border" />
        </div>

      ) : (
        // <ClipLoader
        //   color={"#36d7b7"}
        //   loading={removeBtnLoading}
        //   size={100}
        //   aria-label="Loading Spinner"
        //   data-testid="loader"
        // />
        <div
          style={
            cartData !== null && cartData.length > 0
              ? { height: "auto" }
              : { height: "100%" ,color:"#048ED5",textAlign:"center"}
          }
        >
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <div className="All_pmain">
              {cartData !== null && cartData.length > 0 && (
                cartData.map((e, index) => (
                  <CartItemCard
                    UserData={UserData}
                    cartData={cartData}
                    setIsInCartlist={setIsInCartlist}
                    setTotalPrice={setTotalPrice}
                    e={e}
                    i={index}
                    key={index}
                    totalPrice={totalPrice}
                    totalArray={totalArray}
                    setTotalArray={setTotalArray}
                    SetremoveBtnLoading={SetremoveBtnLoading}
                    removeBtnLoading={removeBtnLoading}
                    setcutprice={setcutprice}
                    cutprice={cutprice}
                  btnloader={btnloader}
                  setLoadingBtn={setLoadingBtn}
                  />

                 
                ))
              ) }
            
            </div>
          )}

          {cartData == null || cartData.length <= 0 ? (
            (
              <div className="cartemptytime"
                // style={{
                //   position: "absolute",
                //   display: "grid",
                //   justifyContent: "center",
                //   margin: "auto",
                //   width: "100%",
                // }}
              >
                {/* <img src={cartimg} alt="" /> */}
                <IconContext.Provider value={{className:"react-icon-emptycart"}}>
        
                <MdAddShoppingCart />

              </IconContext.Provider>
              <h4>No products added to your cart</h4>

              <Button onClick={ ()=> navigate(`/`)}> Continue Shopping </Button>
              </div>
              // <h1 style={{height:"200px",width:"500px",margin:"5% 100%" ,"backgroundColor":"red"}}>No Cart Item</h1>
            )
          ) : (
            <div>
              <h4>Total Item Price --{totalPrice}</h4>
              <h4>Total Save --{cutprice -totalPrice}</h4>
               {/* <h4>Delivery Fee --{deliveryCharge}</h4>   */}
               <h4>Total Price --{totalPrice}</h4> 
              <Example
           
                totalPrice={totalPrice}
                cartData={cartData}
                UserData={UserData}
                setTotalPrice={setTotalPrice}
              />
            </div>
          )}
        </div>
      )}
 
    </div>
  );
};

export default Cart;
