import React, { useEffect, useState } from "react";

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  // updateDoc,
} from "firebase/firestore";
// import { Button, Modal } from 'react-bootstrap';
import { database } from "../firebaseauth";
import { AiFillDelete } from "react-icons/ai";
// import { Modal } from "react-bootstrap";
import Modal from "react-modal";
import UserDataService from "../services/User.js";
import "../CSS/CartItemCard.css";
import { Button, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useUserAuth } from "../Context/UseAuthContext.js";
// import ClipLoader from "react-spinners/ClipLoader";

const CartItemCard = ({
  UserData,
  cartData,
  setTotalPrice,
  setIsInCartlist,
  totalPrice,
SetremoveBtnLoading,
removeBtnLoading,
  e,
  setcutprice,
  cutprice,
  i,
  totalArray,
  setTotalArray,
  btnloader,setLoadingBtn
}) => {
  const [totalQty, SetTotalQty] = useState(1);
  const [btndisable, setdisblebtn] = useState(false);
  const [CouponsDatas, SetCouponsDatas] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [CouponSingleData, setCoupunSingledata] = useState(null);
 const [calculatedPrice, setCalculatedPrice] = useState(0);
 const [UserUsedcouponData, setUserUsedCouponData] = useState([]);

  let id;
  if (UserData) {
    id = UserData.uid;
  }
  const openModal = () => {
    setIsModalOpen(true);
  };
const ApplyCoupon=async()=>{
  setIsModalOpen(false);

  try {
    if (id && e.productId) {
      // ... (your existing code)
      const userId=id;
      const userRef=doc(database,"USERS",userId);
  const cartItemRef=doc(userRef,"MY_CART",e.productId);

  const couponAppliedCollection = collection(userRef, "COUPON_APPLIED");
 
  if(CouponSingleData.title === "Flat Off"){
    const calculatedPrice= e.productPrice - CouponSingleData.price;
    setCalculatedPrice(calculatedPrice);

  
    const couponData={
      id:String(CouponSingleData!==null? CouponSingleData.id:""),
    }

    await setDoc(doc(couponAppliedCollection,(CouponSingleData!==null? CouponSingleData.id:"")), couponData);
  await  updateDoc(cartItemRef,{productPrice:calculatedPrice,coupon:"Coupon Applied"})
  window.reload.location();
 
  }else{

    const calculatedPrice = Math.floor(e.productPrice - e.productPrice * (CouponSingleData.price / 100));
    setCalculatedPrice(calculatedPrice); // Store the calculated value in the state variable


   const couponData={
    id:String(CouponSingleData!==null? CouponSingleData.id:""),
  }
  await setDoc(doc(couponAppliedCollection,(CouponSingleData!==null? CouponSingleData.id:"")), couponData);

  await  updateDoc(cartItemRef,{productPrice:calculatedPrice,coupon:"Coupon Applied"})
  window.reload.location();

 

}

    }

  } catch (error) {
    console.log(error);
  }
}
  const closeModal = async() => {
   
    setIsModalOpen(false);


  };



  useEffect(() => {
    if(removeBtnLoading){
      return
    }
    const GetCoupons = async () => {
      const couponsRef = collection(database, "Coupons");
      try {
        const querySnapshot = await getDocs(couponsRef);
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        return data;
      } catch (error) {
        console.log(error);
        return [];
      }
    };
    const totalqtygetswithprice = async () => {
      try {
        if (id && e.productId) {
          const userId = id;
          const userRef = doc(database, "USERS", userId);
          const cartDocRef = doc(userRef, "MY_CART", e.productId);
          

          const cartdoc = await getDoc(cartDocRef);

       

          let totalItemPrice =
            Number(
              cartdoc._document.data.value.mapValue.fields.qtyNo.integerValue
            ) *
            Number(
              cartdoc._document.data.value.mapValue.fields.productPrice
                .integerValue
            );
            // console.log(totalItemPrice);
           let totalitemcutprice= Number(
            cartdoc._document.data.value.mapValue.fields.qtyNo.integerValue
          ) *
          Number(
            cartdoc._document.data.value.mapValue.fields.productCuttedPrice
              .integerValue
          );
          setTotalPrice((Prev)=>Prev+totalItemPrice);
        
setcutprice( (Prev)=>Prev+totalitemcutprice)
          setTotalArray((prevTotalArray) => [
            ...prevTotalArray,
            totalItemPrice,
          ]);
          // setTotalPrice(Number(cartdoc._document.data.value.mapValue.fields.qtyNo.integerValue)*Number(cartdoc._document.data.value.mapValue.fields.productPrice.stringValue))
          SetTotalQty(
            Number(
              cartdoc._document.data.value.mapValue.fields.qtyNo.integerValue
            )
          );
       
          console.log(totalPrice);
        
        }
      } catch (error) {
        console.log(error);
      }
    };




    const fetchCouponDataFromUserUsed=async()=>{
      try {
         if (id && e.productId) {
          const userId = id;
          const userRef = collection(database, "USERS", userId, "COUPON_APPLIED");
          const q = query(userRef);
        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });

        // Now 'data' contains the coupon data from the subcollection
        setUserUsedCouponData(data);
        
        
        }
      } catch (error) {
        console.error("Error getting data from subcollection:", error);
      
      }
    }
fetchCouponDataFromUserUsed();
    totalqtygetswithprice();

    GetCoupons().then((data) => {
      SetCouponsDatas(data);
   
    });
  }, []);
 
  const foundItem=(UserUsedcouponData!==null?(UserUsedcouponData.some(item => item.id===(CouponSingleData!==null? CouponSingleData.id:null))):null)

  const incfuction = async (e) => {
    try {
      if (id && e.productId) {
        setLoadingBtn(true);
        const userId = id;
        const userRef = doc(database, "USERS", userId);
        const cartDocRef = doc(userRef, "MY_CART", e.productId);
   

        const cartdoc = await getDoc(cartDocRef);

        const childDocumentRef = doc(
          database,
          "PRODUCTS",
          e.productId,
          "productSize",
          e.qtyId
        );
        const childDocumentSnapshot = await getDoc(childDocumentRef);

        if (childDocumentSnapshot.exists()) {
          const childDocumentData = childDocumentSnapshot.data();
          const availableQty = childDocumentData.availableQty - 1;

          if (availableQty < 1) {
            toast.info('🦄No Qty available', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
            setdisblebtn(true);
            await updateDoc(childDocumentRef, { availableQty: 0 });

            return;
          } else {
            await updateDoc(cartDocRef, {
              qtyNo:
                (Number(
                  cartdoc._document.data.value.mapValue.fields.qtyNo.integerValue
                ) + 1)
            });
            const dee = await getDoc(cartDocRef);
            SetTotalQty(
              Number(
                dee._document.data.value.mapValue.fields.qtyNo.integerValue
              )
            );

        
            setTotalPrice(
              totalPrice +
                Number(
                  dee._document.data.value.mapValue.fields.productPrice
                    .integerValue
                )
            );
            setcutprice(
              cutprice+( Number(
                dee._document.data.value.mapValue.fields.productCuttedPrice
                  .integerValue
              ))
            )
           
            await updateDoc(childDocumentRef, { availableQty });
          }
        } else {
          console.log("Document does not exist.");
        }
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoadingBtn(false);

    }
  };

  const discfunction = async (e) => {
    try {
      if (id && e.productId) {
        setLoadingBtn(true);

        const userId = id;
        const userRef = doc(database, "USERS", userId);
        const cartDocRef = doc(userRef, "MY_CART", e.productId);
       

        const cartdoc = await getDoc(cartDocRef);

        const childDocumentRef = doc(
          database,
          "PRODUCTS",
          e.productId,
          "productSize",
          e.qtyId
        );
        const childDocumentSnapshot = await getDoc(childDocumentRef);

        if (childDocumentSnapshot.exists()) {
          const childDocumentData = childDocumentSnapshot.data();
          const availableQty = childDocumentData.availableQty + 1;

          
          await updateDoc(cartDocRef, {
            qtyNo:
              Number(
                cartdoc._document.data.value.mapValue.fields.qtyNo.integerValue
              ) - 1,
          });
          const dee = await getDoc(cartDocRef);
          SetTotalQty(
            Number(dee._document.data.value.mapValue.fields.qtyNo.integerValue)
          );
         
          setTotalPrice(
            totalPrice -
              Number(
                dee._document.data.value.mapValue.fields.productPrice
                  .integerValue
              )
          );
          setcutprice(
            cutprice-( Number(
              dee._document.data.value.mapValue.fields.productCuttedPrice
                .integerValue
            ))
          )
         
          await updateDoc(childDocumentRef, { availableQty });
          // }
        } else {
          console.log("Document does not exist.");
        }
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoadingBtn(false);

    }
  };
  const removeCart = async (e) => {
  

    try {
      if (id && e.productId) {
        SetremoveBtnLoading(true);
        const userId = id;
        const userRef = doc(database, "USERS", userId);
        const cartDocRef = doc(userRef, "MY_CART", e.productId);
       
        const size = await getDoc(userRef);

        const cartdoc = await getDoc(cartDocRef);

        const childDocumentRef = doc(
          database,
          "PRODUCTS",
          e.productId,
          "productSize",
          e.qtyId
        );
        const childDocumentSnapshot = await getDoc(childDocumentRef);

        if (childDocumentSnapshot.exists()) {
          const childDocumentData = childDocumentSnapshot.data();
          const availableQty =
            childDocumentData.availableQty +
            Number(
              cartdoc._document.data.value.mapValue.fields.qtyNo.integerValue
            );

          await updateDoc(childDocumentRef, { availableQty });
        } else {
          console.log("Document does not exist.");
        }

        const cartSize =
          size &&
          size._document &&
          size._document.data &&
          size._document.data.value &&
          size._document.data.value.mapValue &&
          size._document.data.value.mapValue.fields &&
          size._document.data.value.mapValue.fields.cartSize &&
          size._document.data.value.mapValue.fields.cartSize.stringValue
            ? String(
                Number(
                  size._document.data.value.mapValue.fields.cartSize.stringValue
                ) - 1
              )
            : "1";
        SetTotalQty(
          Number(
            cartdoc._document.data.value.mapValue.fields.qtyNo.integerValue
          )
        );

        if(cartdoc.exists()){
          const cartItemData=cartdoc.data();
          const itemPrice=cartItemData.productPrice||0;
          const itemNo=cartItemData.qtyNo||0;
          setTotalPrice(0)
       const itemcuttedPrice=cartItemData.productCuttedPrice||0;
            setcutprice(0)
        

        }
   
        // Replace "productId" with the actual field name in your cart data
        await deleteDoc(cartDocRef);

        await UserDataService.updateUser(userId, { cartSize });
      
        // After deleting, you can refresh the cart data or update the UI as needed
        const updatedCartData = cartData.filter(
          (item) => item.productId !== e.productId
        );
        setIsInCartlist(updatedCartData);

        // fetchData()
  // "
  // window.location.reload();
        SetremoveBtnLoading(false);
        toast.info('Item Remove Sucessfull ', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        console.log(totalPrice);
      
      }

    } catch (error) {
      console.error("Error removing product from cart", error);
    } finally {
      SetremoveBtnLoading(false);
    }
  };
console.log("totallprice",totalPrice);

  return (
    <div className="pmainone" key={i}>
    
      <div className="imgoff">
        <h5 className="off">
          {Math.floor(100 - (e.productPrice * 100) / e.productCuttedPrice)}% OFF
        </h5>
        <img src={e.productImage} alt={e.productBrandName} />
      </div>
      <div className="pmaintwo">
        <h5>{e.productBrandName}</h5>
        <h5>{e.productTitle}</h5>
        <h5>{e.qty}</h5>
        <div className="hdealtwo">
          <h5>₹{e.productPrice}</h5>
          <h5
            style={{
              textDecoration: "line-through",
              fontSize: "10px",
              marginLeft: "1%",
            }}
          >
            {" "}
            ₹{e.productCuttedPrice}
          </h5>
        </div>

        <div>
          <Button variant="warning" disabled={e.coupon==="Coupon Applied"} onClick={openModal}>{e.coupon}</Button>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            className="custom-modal"
          >
            {CouponsDatas && CouponsDatas.length > 0 
              ? CouponsDatas.map((elem, index) => (
                Date.now()<elem.validTime && elem.productAbovePrice<e.productPrice?<div
                key={index}
                className="couponsdivmain"
                style={{
                  backgroundColor: foundItem ? "lightgray" : "white",
                  color:foundItem?"white":"green"
                  // pointerEvents: foundItem ? "none" : "auto",
                }}
                onClick={() =>(  setCoupunSingledata(elem))}
              >
                <div className="showthecoupons" >
                  <h5>
                    {" "}
                    ValideTime --{new Date(elem.validTime).toLocaleString()}
                  </h5>
                  <h5>{elem.subject}</h5>
                </div>
              </div>:""
                  
                ))
              : ""}

            <div className="ModalPricediv" >
              <div>
                <h5>Original Price</h5>
                <h5>Rs .{e.productPrice}</h5>
              </div>
              <div>
                <h5>Discounted Price</h5>{" "}
                {CouponSingleData === null ? (
                  <h5>Selected Coupon</h5>
                ) : CouponSingleData.title === "Flat Off" ? (
                  e.productPrice - CouponSingleData.price
                ) : (

              Math.floor(  e.productPrice- e.productPrice*(CouponSingleData.price/100)
                
                ))}{" "}
              </div>
            </div>

            <Button onClick={closeModal}>Close Modal</Button>
            <Button variant="danger" disabled={foundItem} onClick={ApplyCoupon}>APPY COUPON</Button>
          </Modal>
        </div>

        <div
          className="btnforincdec"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // margin:"auto"
          }}
        >

<Button  disabled={totalQty <= 1||btnloader}  onClick={() => discfunction(e)}>
            —
          </Button>
          {
          <Button >{totalQty}</Button>
          
          }

          <Button  disabled={btndisable||totalPrice===0||btnloader||totalQty>=5}  onClick={() => incfuction(e)}>
            +
          </Button>
         
        </div>
      </div>

  
        <div
          className="removeCartColore"
          
          // style={{ display: "flex", backgroundColor: "" }}
          onClick={() => removeCart(e)}
        >
          
        Remove
        </div>
     
    </div>
  );
};

export default CartItemCard;
