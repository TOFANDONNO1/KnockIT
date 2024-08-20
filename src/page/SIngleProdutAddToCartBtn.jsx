import React, { useEffect, useState } from "react";
// import { useUserAuth } from '../Context/UseAuthContext'
import { useParams } from "react-router-dom";
import Product from "../services/Product";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  collection,
  doc,
  getDocs,

  setDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import UserDataService from "../services/User.js";
import { database} from "../firebaseauth";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../CSS/SingleProductPage.css";
import "../CSS/slider.css";
import ClipLoader from "react-spinners/ClipLoader";
import wishelistimage from "../Images/wishelist.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; //
import Progressbar from "./Progressbar";
import { Button } from "react-bootstrap";
import profile from "../Images/Profile.jpg"
import SInglePageProductPageincanddec from "./SInglePageProductPageincanddec.jsx";
import { useUserAuth } from "../Context/UseAuthContext.js";
import { BiCartAlt } from "react-icons/bi";
const SIngleProdutAddToCartBtn = ({productId,elementKg,setKgelement}) => {
  // const { productId } = useParams();
  const {setCartSize}=useUserAuth();
  const [incdecbtn,setIncDecBTN]=useState(false);
  const [UserData, SetUser] = useState(null);
  const [SingleUser, setUserData] = useState(null);
const [loading,setLoading]=useState(false);
const [cartLoading,setCartLoading]=useState(false);
  const [singledata, setSingledata] = useState(null);
  const [Reviewsdata, setReviewData] = useState(null);
  const [ImageData, setImageData] = useState(null);
  const [Kg, setKg] = useState(null);
  const [Specification, setSpecification] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
const [oneitem,setOneItem]=useState(null);
// console.log("ELEMENTKG",elementKg);
const {User}=useUserAuth();
  let id;
  if (UserData) {
    id = UserData.uid;
  }

  
const addToCart = async (productId) => {
  try {
    if (!id) {
      toast.info('User not logged in', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        
        });
      return; // Exit the function if the user is not logged in
    }

    if (!productId) {
      console.log("Invalid productId");
      return; // Exit the function if productId is not valid
    }
   
    if (id && SingleUser) {
      console.log(SingleUser.data());
      const userId = id;
setIncDecBTN(true)
      // Reference to the "USER" collection
      const userRef = doc(database, "USERS", userId);

      // Reference to the subcollection "wishlist" under the user's document
      const wishlistRef = doc(collection(userRef, "MY_CART"), productId);

      const wishelistDoc = await getDoc(wishlistRef);
      if (wishelistDoc.exists()) {
        toast.info('🦄Item Alrady In Your Cart', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });

      } else {

        // Data to be added to the wishlist
        const CartItem = {
          address: SingleUser._document.data.value.mapValue.fields.address.stringValue,

          city: SingleUser._document.data.value.mapValue.fields.city.stringValue,

          coupon: "Apply your coupon here",

          couponId: "",

          deliveredDate: "",

          delivery: "Pending",

          id: "",

          latitude:  SingleUser._document.data.value.mapValue.fields.latitude.doubleValue,

          longitude:  SingleUser._document.data.value.mapValue.fields.longitude.doubleValue,

          name:  SingleUser._document.data.value.mapValue.fields.name.stringValue,

          number:  SingleUser._document.data.value.mapValue.fields.number.stringValue,

          oderConfirmedDate: "",

          outForDeliveryDate: "",
          productImage:singledata._document.data.value.mapValue.fields.productImage.stringValue,
          payment: "",

          pincode:  SingleUser._document.data.value.mapValue.fields.pincode.stringValue,

          price:(elementKg!==null? Number( elementKg._document.data.value.mapValue.fields.price.stringValue):Number(500)),

          productCuttedPrice:(elementKg!==null?
       Number(elementKg._document.data.value.mapValue.fields.cuttedPrice.stringValue)
            
            :Number(500)),



          productId: productId,

          productPrice:(elementKg!==null? Number( elementKg._document.data.value.mapValue.fields.price.stringValue):Number(500)) ,
        

          productTitle:singledata._document.data.value.mapValue.fields.productTitle.stringValue,

          qty: (elementKg!==null? elementKg._document.data.value.mapValue.fields.qty.stringValue:""),

          qtyId: (elementKg!==null? elementKg._document.data.value.mapValue.fields.id.stringValue:""),

          qtyNo: 1,

          ratingProduct: "",

          riderId: "",

          shippedDate: "",

          state: SingleUser._document.data.value.mapValue.fields.state.stringValue,

          storeId:singledata._document.data.value.mapValue.fields.storeId.stringValue,

          timeStamp: Date.now(),
          storeToken:"",
          uid: SingleUser._document.data.value.mapValue.fields.uid.stringValue, // You can add a timestamp to track when the item was added
        };
const cartSize= String(Number(SingleUser.data().cartSize)+1);
       

           const subcollectionRef=doc(database,"PRODUCTS",productId,"productSize",elementKg._document.data.value.mapValue.fields.id.stringValue)   

           const keteachiaue={availableQty:elementKg._document.data.value.mapValue.fields.availableQty.integerValue-1};




        await setDoc(wishlistRef, CartItem);
//update The Qty Of Product
await updateDoc(subcollectionRef,keteachiaue)

  //update The cartSize   
  // setCartSize(cartSize)
        await UserDataService.updateUser(userId, {cartSize });
       
        toast.success('Item added to Cart', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
          fetchData();
      }
    } else {
      // console.log("User not logged in");
      toast.info('User not logged in', {
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
  } catch (error) {
    console.error("Error adding item to Cart", error);
  }
};


const handleAddtoCart = async (e, productId) => {
  // console.log(e.target.innerHTML);
 if (e.target.innerHTML === `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M8.246 11L18.246 11 19.675 6 6.428 6z"></path><path d="M21,4H5H4H2v2h2h0.3l3.282,9.025C8.011,16.206,9.145,17,10.401,17H19v-2h-8.599c-0.419,0-0.797-0.265-0.94-0.658L8.973,13 h9.273c0.89,0,1.68-0.598,1.923-1.451l1.793-6.274c0.086-0.302,0.025-0.626-0.163-0.877C21.609,4.147,21.313,4,21,4z M18.246,11 h-10L6.428,6h13.247L18.246,11z"></path><circle cx="10.5" cy="19.5" r="1.5"></circle><circle cx="16.5" cy="19.5" r="1.5"></circle></svg>ADD TO CART`) { 

    setLoading(true);

    try {
      await addToCart(productId);

    } catch (error) {
      // Handle any errors that occurred during addToCart
      console.error("Error adding product to cart:", error);
    } finally {
      // Regardless of success or failure, set loading to false
      setLoading(false);
    }
  }
};

  // Function to add a product to the wishlist
  const addToWishlist = async (productId) => {
    try {
      if (id) {
        const userId = id;

        // Reference to the "USER" collection
        const userRef = doc(database, "USERS", userId);

        // Reference to the subcollection "wishlist" under the user's document
        const wishlistRef = doc(collection(userRef, "MY_WISHLIST"), productId);

        const wishelistDoc = await getDoc(wishlistRef);
        if (wishelistDoc.exists()) {
          await deleteDoc(wishlistRef);
          setIsInWishlist(false);
          toast.warn('Item removed successfully from wishlist', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        } else {
          // Data to be added to the wishlist
          const wishlistItem = {
            productId: productId, // Replace with the actual product ID
            timestamp: Date.now(), // You can add a timestamp to track when the item was added
          };

          // Add the item to the wishlist
          await setDoc(wishlistRef, wishlistItem);
          setIsInWishlist(true);
          toast.success('Item added to wishlist', {
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
      } else {
        // User is not logged in, handle this case
        // console.log("User not logged in");
        toast.info('User not logged in', {
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
    } catch (error) {
      // console.error("Error adding item to wishlist", error);
      toast.info('Error adding item to wishlist', {
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
  };

  // Example usage in your component
  const handleWishlistClick = async(productId) => {
    // const productId = "your-product-id"; // Replace with the actual product ID
   
    if (productId) {
      setCartLoading(true);
  
      try {
        // Simulate an asynchronous operation (e.g., adding to the cart)
        await  addToWishlist(productId);
  
      } catch (error) {
        // Handle any errors that occurred during addToCart
        console.error("Error adding product to cart:", error);
      } finally {
        // Regardless of success or failure, set loading to false
        setCartLoading(false);
      }
    }
   

  };
  const fetchData = async () => {
    
    if (id) {
      const userId = id;
      const userRef = doc(database, "USERS", userId);
      const cartCollectionRef = collection(userRef, "MY_CART");
      const querys = query(cartCollectionRef, orderBy("timeStamp", "desc"));
      const cartDoc = await getDocs(querys);
      // const cartItems = [];

      cartDoc.forEach((doc) => {
        const cartItem = doc.data();
        if(cartItem.productId===productId){
          setOneItem(cartItem);
          setIncDecBTN(true);
return;
        }
       
      });

      // setIsInCartlist(cartItems);
    }

  
  };
  useEffect(() => {
    setLoading(false);
    // const storedUser = JSON.parse(localStorage.getItem("user"));
   

    fetchData();
    const checkWishlist = async () => {
      try {
        if (id) {
          const userId = id;
          const userRef = doc(database, "USERS", userId);
          const wishlistRef = doc(
            collection(userRef, "MY_WISHLIST"),
            productId
          );
          const wishlistDoc = await getDoc(wishlistRef);
          setIsInWishlist(wishlistDoc.exists());
        }
      } catch (error) {
        console.error("Error checking wishlist", error);
      }
    };

    if (User) {
      SetUser(User);
    }
    const getsingledata = async (productId) => {
      try {
        const product = await Product.getsingleProductData(productId);

        if (product.exists) {
          setSingledata(product);
        } else {
          console.log("No such product");
          
        }
      } catch (error) {
        console.log("Error: " + error);
      }
      //
    };

const getsingledataReview = async (productId) => {
  try {
    const valu = doc(database, "PRODUCTS", productId);
    const collectionvalu = collection(valu, "ProductReview");

    const getValue = await getDocs(collectionvalu);

    const promises = [];

    getValue.docs.forEach(async (d) => {
      const data = d.data();
      const userRef = doc(database, "USERS", data.userId);
      const userPromise = getDoc(userRef).then((userDoc) => {
        if (userDoc.exists()) {
          const userData = userDoc.data();
          return { reviewData: data, userData };
        }
      });
      promises.push(userPromise);
    });

    const resolvedData = await Promise.all(promises);

    // Now, resolvedData contains both reviewData and userData
    // Handle and set this data as needed
    setReviewData(resolvedData.filter(Boolean));
  } catch (error) {
    console.log(error);
  }
};

    const getsingledataproductImages = async (productId) => {
      try {
        const valu = doc(database, "PRODUCTS", productId);
        const collectionvalu = collection(valu, "productImages");

        const getValue = await getDocs(collectionvalu);
        if (getValue !== null) {
          setImageData(getValue);
        } else {
          console.log("No such Product");
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getsingledataproductKg = async (productId) => {
      try {
        const valu = doc(database, "PRODUCTS", productId);
        const collectionvalu = collection(valu, "productSize");

        const getValue = await getDocs(collectionvalu);
        if (getValue !== null) {
          setKg(getValue);
        } else {
          console.log("No such Product");
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getsingledataproductSpecification = async (productId) => {
      try {
        const valu = doc(database, "PRODUCTS", productId);
        const collectionvalu = collection(valu, "productSpecification");

        const getValue = await getDocs(collectionvalu);
        if (getValue !== null) {
          setSpecification(getValue);
        } else {
          console.log("No such Product");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getsingledata(productId);
    getsingledataReview(productId);

    getsingledataproductImages(productId);
    getsingledataproductKg(productId);
    getsingledataproductSpecification(productId);
    checkWishlist();
    if (id) {
      getUserData(id);
    }
  
  }, [productId, id,loading]);
  const getUserData =  (id) => {
    const userDocRef=doc(database,"USERS",id);

    onSnapshot(userDocRef,(doc)=>{
      if(doc.exists()){
        setUserData(doc);
        // console.log(doc);
      }
    })
  };
 


 



 

  

  return (
    <div>
       
   
       {singledata != null ? (
        <div className="SingleProduct_Add_To_Cart_Btn">
        

         
          {/* <div className="ratingan_dkg">
                   {incdecbtn?"": <div >
              {Kg !== null ? (
                Kg.docs.map((e, index) => (
                  <h3 key={index} onClick={() => setKgelement(e)}>
                    {e._document.data.value.mapValue.fields.qty.stringValue}
                  </h3>
                ))
              ) : (
                ""
              )}
            </div>} 
          </div> */}

<div className="kgset_productpage">
  {incdecbtn ? (
    ""
  ) : (

  Kg !== null && Kg.docs.length === 1 ? (

    
      <h3   onClick={() => setKgelement(Kg.docs[0])}>
      {Kg.docs[0]._document.data.value.mapValue.fields.qty.stringValue}~
      {
                  Kg.docs[0]._document.data.value.mapValue.fields.availableQty
                    .integerValue
                }left
                  </h3>
   
  ) : (
    Kg !== null && Kg.docs.length > 1 && (
      <select onChange={(e) => {
            const selectedIndex = e.target.selectedIndex;
            const selectedOption = Kg !== null ? Kg.docs[selectedIndex] : null;
            setKgelement(selectedOption);
        }}>
        {Kg.docs.map((el, index) => (
          <option key={index} value={el._document.data.value.mapValue.fields.qty.stringValue}>{el._document.data.value.mapValue.fields.qty.stringValue} ~ 
            {
                        el.data().availableQty
                      }left
          </option>
        ))}
      </select>
    )
  )
  )}
</div>


       
        
        </div>
      ) : (
        ""
      )}
      {
  incdecbtn && oneitem? (
    
    <SInglePageProductPageincanddec  UserData={UserData} e={ oneitem}/>
  ) : loading ? (
    <ClipLoader
      color={"#36d7b7"}
      loading={loading}
      size={20}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  ) : (
    <button
      size="lg"
      className="SingleProductPageADD_ADDTOCARTBTN"
      style={{
        backgroundColor:
          elementKg !== null&& elementKg.data().productId===productId
            ? elementKg._document.data.value.mapValue.fields.availableQty
                .integerValue > 0
              ? "#048ED5"
              : "red"
            : "gray",
        // marginTop: "1%",
      }}
      onClick={(e) => handleAddtoCart(e, productId)}
    >
         

      { elementKg !== null&& elementKg.data().productId===productId
          ? elementKg._document.data.value.mapValue.fields.availableQty
              .integerValue > 0
            ?<> 
               <BiCartAlt />
                ADD TO CART</>
            : "OUT OF STOCK"
          : <>SELECT QUANTITY</>
        }
    </button>
  )
}

      
     

     
    </div>
  );
};

export default SIngleProdutAddToCartBtn;
