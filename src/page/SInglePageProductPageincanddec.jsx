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
// import ClipLoader from "react-spinners/ClipLoader";

const SInglePageProductPageincanddec = ({
  UserData,
 
  e
 
  
}) => {
  
  const [totalQty, SetTotalQty] = useState(1);
  const [btndisable, setdisblebtn] = useState(false);
 const [btnloader,setLoadingBtn]=useState(false);
  let id;
  if (UserData) {
    id = UserData.uid;
  }
  useEffect(() => {
    
    const totalqtygetswithprice = async () => {
      try {
        if (id && e.productId) {
          const userId = id;
          const userRef = doc(database, "USERS", userId);
          const cartDocRef = doc(userRef, "MY_CART", e.productId);
          

          const cartdoc = await getDoc(cartDocRef);

         

          SetTotalQty(
            Number(
              cartdoc._document.data.value.mapValue.fields.qtyNo.integerValue
            )
          );
       
        }
      } catch (error) {
        console.log(error);
      }
    };




  

    totalqtygetswithprice();

    
  }, [id,e.productId]);



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

        
            // setTotalPrice(
            //   totalPrice +
            //     Number(
            //       dee._document.data.value.mapValue.fields.productPrice
            //         .integerValue
            //     )
            // );
            // setcutprice(
            //   cutprice+( Number(
            //     dee._document.data.value.mapValue.fields.productCuttedPrice
            //       .integerValue
            //   ))
            // )
           
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
    // console.log(e);

    setTimeout(() => {
        
      }, 1000);
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
         
          // setTotalPrice(
          //   totalPrice -
          //     Number(
          //       dee._document.data.value.mapValue.fields.productPrice
          //         .integerValue
          //     )
          // );
          // setcutprice(
          //   cutprice-( Number(
          //     dee._document.data.value.mapValue.fields.productCuttedPrice
          //       .integerValue
          //   ))
          // )
         
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

console.log(e);
  return (
    <div style={{display:"flex"
    ,
    justifyContent:"center"}}>
    
   
      <div>
       

        <div
          className="btnforincdec"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >

<Button  disabled={totalQty <= 1||btnloader}  onClick={() => discfunction(e)}>
            -
          </Button>

          {btnloader?
          <Button variant="primary" >
            {/* {totalQty} */}
          <Spinner
          // style={{position:"absolute",marginLeft:"-1%"}}
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          
          {/* <span className="visually-hidden">Loading...</span> */}
        </Button>

          :
          <Button  >{totalQty}</Button>
          
          }

          <Button  disabled={btndisable||totalQty>=5||btnloader}  onClick={() => incfuction(e)}>
            +
          </Button>
         
        </div>
      </div>

  
       
     
    </div>
  );
};

export default SInglePageProductPageincanddec;
