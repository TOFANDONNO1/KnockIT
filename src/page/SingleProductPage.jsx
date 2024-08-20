import React, { useEffect, useState } from "react";
// import { useUserAuth } from '../Context/UseAuthContext'
import { useParams } from "react-router-dom";
import Product from "../services/Product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { database } from "../firebaseauth";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../CSS/SingleProductPage.css";
import "../CSS/slider.css";
import ClipLoader from "react-spinners/ClipLoader";
import wishelistimage from "../Images/wishelist.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; //
import Progressbar from "./Progressbar";
import { Button } from "react-bootstrap";
import profile from "../Images/Profile.jpg";
import SInglePageProductPageincanddec from "./SInglePageProductPageincanddec.jsx";
import { useUserAuth } from "../Context/UseAuthContext.js";
import { BiCartAlt } from "react-icons/bi";
const SingleProductPage = () => {
  const { productId } = useParams();
  const [incdecbtn, setIncDecBTN] = useState(false);
  const [UserData, SetUser] = useState(null);
  const [SingleUser, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [singledata, setSingledata] = useState(null);
  const [Reviewsdata, setReviewData] = useState(null);
  const [ImageData, setImageData] = useState(null);
  const [Kg, setKg] = useState(null);
  const [Specification, setSpecification] = useState(null);
  const [elementKg, setKgelement] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [oneitem, setOneItem] = useState(null);
  const { User } = useUserAuth();
  let id;
  if (UserData) {
    id = UserData.uid;
  }

  const addToCart = async (productId) => {
    try {
      if (!id) {
        toast.info("User not logged in", {
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

      if (id) {
        const userId = id;
        setIncDecBTN(true);
        // Reference to the "USER" collection
        const userRef = doc(database, "USERS", userId);

        // Reference to the subcollection "wishlist" under the user's document
        const wishlistRef = doc(collection(userRef, "MY_CART"), productId);

        const wishelistDoc = await getDoc(wishlistRef);
        if (wishelistDoc.exists()) {
          toast.info("🦄Item Alrady In Your Cart", {
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
            address:
              SingleUser._document.data.value.mapValue.fields.address
                .stringValue,

            city: SingleUser._document.data.value.mapValue.fields.city
              .stringValue,

            coupon: "Apply your coupon here",

            couponId: "",

            deliveredDate: "",

            delivery: "Pending",

            id: "",

            latitude:
              SingleUser._document.data.value.mapValue.fields.latitude
                .doubleValue,

            longitude:
              SingleUser._document.data.value.mapValue.fields.longitude
                .doubleValue,

            name: SingleUser._document.data.value.mapValue.fields.name
              .stringValue,

            number:
              SingleUser._document.data.value.mapValue.fields.number
                .stringValue,

            oderConfirmedDate: "",

            outForDeliveryDate: "",
            productImage:
              singledata._document.data.value.mapValue.fields.productImage
                .stringValue,
            payment: "",

            pincode:
              SingleUser._document.data.value.mapValue.fields.pincode
                .stringValue,

            price:
              elementKg !== null
                ? Number(
                    elementKg._document.data.value.mapValue.fields.price
                      .stringValue
                  )
                : Number(500),

            productCuttedPrice:
              elementKg !== null
                ? Number(
                    elementKg._document.data.value.mapValue.fields.cuttedPrice
                      .stringValue
                  )
                : Number(500),

            productId: productId,

            productPrice:
              elementKg !== null
                ? Number(
                    elementKg._document.data.value.mapValue.fields.price
                      .stringValue
                  )
                : Number(500),

            productTitle:
              singledata._document.data.value.mapValue.fields.productTitle
                .stringValue,

            qty:
              elementKg !== null
                ? elementKg._document.data.value.mapValue.fields.qty.stringValue
                : "",

            qtyId:
              elementKg !== null
                ? elementKg._document.data.value.mapValue.fields.id.stringValue
                : "",

            qtyNo: 1,

            ratingProduct: "",

            riderId: "",

            shippedDate: "",

            state:
              SingleUser._document.data.value.mapValue.fields.state.stringValue,

            storeId:
              singledata._document.data.value.mapValue.fields.storeId
                .stringValue,

            timeStamp: Date.now(),
            storeToken:"",

            uid: SingleUser._document.data.value.mapValue.fields.uid
              .stringValue, // You can add a timestamp to track when the item was added
          };
          const cartSize =
            SingleUser &&
            SingleUser._document &&
            SingleUser._document.data &&
            SingleUser._document.data.value &&
            SingleUser._document.data.value.mapValue &&
            SingleUser._document.data.value.mapValue.fields &&
            SingleUser._document.data.value.mapValue.fields.cartSize &&
            SingleUser._document.data.value.mapValue.fields.cartSize.stringValue
              ? String(
                  Number(
                    SingleUser._document.data.value.mapValue.fields.cartSize
                      .stringValue
                  ) + 1
                )
              : "1";

          const subcollectionRef = doc(
            database,
            "PRODUCTS",
            productId,
            "productSize",
            elementKg._document.data.value.mapValue.fields.id.stringValue
          );

          const keteachiaue = {
            availableQty:
              elementKg._document.data.value.mapValue.fields.availableQty
                .integerValue - 1,
          };

          await setDoc(wishlistRef, CartItem);
          //update The Qty Of Product
          await updateDoc(subcollectionRef, keteachiaue);

          //update The cartSize
          await UserDataService.updateUser(userId, { cartSize });

          toast.success("Item added to Cart", {
            position: "top-right",
            autoClose: 5000,
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
        toast.info("User not logged in", {
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
      if (id&&SingleUser) {
        const userId = id;

        // Reference to the "USER" collection
        const userRef = doc(database, "USERS", userId);

        // Reference to the subcollection "wishlist" under the user's document
        const wishlistRef = doc(collection(userRef, "MY_WISHLIST"), productId);

        const wishelistDoc = await getDoc(wishlistRef);
        if (wishelistDoc.exists()) {
          await deleteDoc(wishlistRef);
          setIsInWishlist(false);
          const wishlistSize=String(Number(SingleUser.wishlistSize)-1);
          await UserDataService.updateUser(userId, {wishlistSize});
          toast.warn("Item removed successfully from wishlist", {
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
          const wishlistSize=String(Number(SingleUser.wishlistSize)+1);
          await UserDataService.updateUser(userId, {wishlistSize});
          toast.success("Item added to wishlist", {
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
        toast.info("User not logged in", {
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
      toast.info("Error adding item to wishlist", {
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
  const handleWishlistClick = async (productId) => {
    // const productId = "your-product-id"; // Replace with the actual product ID

    if (productId) {
      setCartLoading(true);

      try {
        // Simulate an asynchronous operation (e.g., adding to the cart)
        await addToWishlist(productId);
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
        if (cartItem.productId === productId) {
          setOneItem(cartItem);
          setIncDecBTN(true);
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
      // console.log("USER", User);
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
  }, [productId, id, loading]);
  const getUserData =  (id) => {
    const userDocRef=doc(database,"USERS",id);

    onSnapshot(userDocRef,(doc)=>{
      if(doc.exists()){
        setUserData(doc.data());
        // console.log(doc.data());
      }
    })
  };
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
      arrows: false,

    },
  };
  let total;
  if (singledata !== null) {
    let r1 = Number(
      singledata._document.data.value.mapValue.fields.rating_1.stringValue
    );
    let r2 = Number(
      singledata._document.data.value.mapValue.fields.rating_2.stringValue
    );
    let r3 = Number(
      singledata._document.data.value.mapValue.fields.rating_3.stringValue
    );
    let r4 = Number(
      singledata._document.data.value.mapValue.fields.rating_4.stringValue
    );
    let r5 = Number(
      singledata._document.data.value.mapValue.fields.rating_5.stringValue
    );
    total = r1 + r2 + r3 + r4 + r5;
  }
  return (
    <div>
    
      <div className="slidermain">
        <Carousel
          responsive={responsive}
          showDots={true}
          autoPlay={true}
          infinite={true}
          autoPlaySpeed={2000}
          transitionDuration={500}
        arrows={false}

        >
          {ImageData !== null ? (
            ImageData.docs.map((e, index) => {
              return (
                <div className="sliderdiv" key={index}>
                  <img
                    style={{
                      width: "auto",
                      position: "relative",
                      top: 0,
                      left: 0,
                    }}
                    src={
                      e._document.data.value.mapValue.fields.image.stringValue
                    }
                    alt={e._document.data.value.mapValue.fields.id.stringValue}
                  />
                </div>
              );
            })
          ) : (
            <h4>No Image</h4>
          )}
        </Carousel>
        {cartLoading ? (
          <ClipLoader
            color={"#36d7b7"}
            loading={loading}
            // cssOverride={override}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <img
            src={wishelistimage}
            onClick={() => handleWishlistClick(productId)}
            className="whichlistimage"
            alt="WishlistImage"
            style={{
              height: "12%",
              top: "3%",
              right: "1%",
              position: "absolute",
              backgroundColor: isInWishlist ? "red" : "white",
              // wishlistButtonStyle,
            }}
          />
        )}
      </div>

      {incdecbtn ? (
        oneitem !== null && oneitem ? (
          <SInglePageProductPageincanddec
            UserData={UserData}
            e={oneitem !== null ? oneitem : ""}
          />
        ) : (
          ""
        )
      ) : loading ? (
        <ClipLoader
          color={"#36d7b7"}
          loading={loading}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <Button
          size="lg"
          className="SingleProductPageADD_ADDTOCARTBTN"
          style={{
            backgroundColor:
              elementKg !== null
                ? elementKg._document.data.value.mapValue.fields.availableQty
                    .integerValue > 0
                  ? "#048ED5"
                  : "red"
                : "gray",
            marginTop: "1%",
          }}
          onClick={(e) => handleAddtoCart(e, productId)}
        >
          {elementKg !== null
            ? elementKg._document.data.value.mapValue.fields.availableQty
                .integerValue > 0
              ? <><BiCartAlt />ADD TO CART</>
              : "OUT OF STOCK"
            : "SELECT QUANTITY"}
        </Button>
      )}

      <div className="whichlist" style={{ padding: "2%" }}></div>

      {singledata != null ? (
        <div className="SingleProductPageone">
          <div className="SingleProductPageNamePriceDeliveryprice">
            <div>
              <h4>
                {
                  singledata._document.data.value.mapValue.fields.productTitle
                    .stringValue
                }
              </h4>
            </div>
            <div style={{ display: "flex", gap: "1%" }}>
              <h4>Special price</h4>
              <h4>
                ₹
                {elementKg !== null
                  ? elementKg._document.data.value.mapValue.fields.price
                      .stringValue
                  : singledata._document.data.value.mapValue.fields.productPrice
                      .integerValue}
              </h4>
              <h4
                style={{
                  textDecoration: "line-through",
                  fontSize: "18px",
                  marginLeft: "0.0001%",
                }}
              >
                {" "}
                ₹
                {elementKg !== null
                  ? elementKg._document.data.value.mapValue.fields.cuttedPrice
                      .stringValue
                  : singledata._document.data.value.mapValue.fields
                      .productCuttedPrice.integerValue}
              </h4>
            </div>

            {/* <div style={{ color: "green" }}>
              {(elementKg!==null? Number( elementKg._document.data.value.mapValue.fields.price.stringValue):Number(500)) > 800 ? (
                <h4>Free Delivery</h4>
              ) : (
                <h4> Delivery Price ₹80 </h4>
              )}
            </div> */}
          </div>

          {/* end of the delivery price */}
          {/* <div>Add MODAL FOR SPECIAL OFFER</div> */}
          <div className="ratingandkg">
            <div className="ratingstyle">
              <h4>
                {
                  singledata._document.data.value.mapValue.fields.productRating
                    .stringValue
                }{" "}
                *
              </h4>
              <h4>
                {
                  singledata._document.data.value.mapValue.fields
                    .productTotalRating.stringValue
                }{" "}
                Ratings
              </h4>
            </div>
            <h4>Please Select Qty</h4>
            <div>
              {Kg !== null ? (
                Kg.docs.map((e, index) => (
                  <h4 key={index} onClick={() => setKgelement(e)}>
                    {e._document.data.value.mapValue.fields.qty.stringValue}
                  </h4>
                ))
              ) : (
                <h6>No Qty</h6>
              )}
            </div>
          </div>

          <div className="singleProductPageSpecification">
            <div>
              {" "}
              <h4>Specification</h4>
            </div>
            <div>
              <div>
                <h4>Brand</h4>
                {Specification !== null ? (
                  Specification.docs.map((e, index) => (
                    <h4 key={index}>
                      {e._document.data.value.mapValue.fields.brand.stringValue}
                    </h4>
                  ))
                ) : (
                  <h6>No Brand</h6>
                )}
              </div>
              <div>
                <h4>Value </h4>
                {Specification !== null ? (
                  Specification.docs.map((e, index) => (
                    <h4 key={index}>
                      {e._document.data.value.mapValue.fields.value.stringValue}
                    </h4>
                  ))
                ) : (
                  <h6>No Value</h6>
                )}
              </div>
            </div>
          </div>

          <div className="SingleProductPageDescription">
            <h4>Description</h4>
            <h4>
              {
                singledata._document.data.value.mapValue.fields
                  .productDescription.stringValue
              }
            </h4>
          </div>

          <div className="SingleProductPageRatingBar">
            <h4>Rating</h4>
            <div>
              <h4>
                {
                  singledata._document.data.value.mapValue.fields.productRating
                    .stringValue
                }{" "}
                *
              </h4>

              <h4>
                {
                  singledata._document.data.value.mapValue.fields
                    .productTotalRating.stringValue
                }{" "}
                Ratings
              </h4>
            </div>
            <div>
              <div>
                <h4>Exceelent</h4>

                <h4>
                  {" "}
                  5⭐
                  <Progressbar
                    col="#42AA1D"
                    val={Math.floor(
                      (Number(
                        singledata._document.data.value.mapValue.fields.rating_1
                          .stringValue
                      ) *
                        100) /
                        total
                    )}
                  />
                  {
                    singledata._document.data.value.mapValue.fields.rating_1
                      .stringValue
                  }
                </h4>
                <h4>Very Good</h4>
                <h4>
                  4⭐
                  <Progressbar
                    col="rgb(111, 253, 3)"
                    val={Math.floor(
                      (Number(
                        singledata._document.data.value.mapValue.fields.rating_2
                          .stringValue
                      ) *
                        100) /
                        total
                    )}
                  />
                  {
                    singledata._document.data.value.mapValue.fields.rating_2
                      .stringValue
                  }
                </h4>
                <h4>Good</h4>
                <h4>
                  3⭐
                  <Progressbar
                    col="rgb(251, 255, 15)"
                    val={Math.floor(
                      (Number(
                        singledata._document.data.value.mapValue.fields.rating_3
                          .stringValue
                      ) *
                        100) /
                        total
                    )}
                  />
                  {
                    singledata._document.data.value.mapValue.fields.rating_3
                      .stringValue
                  }
                </h4>
                <h4>Average</h4>
                <h4>
                  2⭐
                  <Progressbar
                    col="rgb(255, 163, 4)"
                    val={Math.floor(
                      (Number(
                        singledata._document.data.value.mapValue.fields.rating_4
                          .stringValue
                      ) *
                        100) /
                        total
                    )}
                  />
                  {
                    singledata._document.data.value.mapValue.fields.rating_4
                      .stringValue
                  }
                </h4>
                <h4>Poor</h4>
                <h4>
                  1⭐
                  <Progressbar
                    col="rgb(255, 4, 4)"
                    val={Math.floor(
                      (Number(
                        singledata._document.data.value.mapValue.fields.rating_5
                          .stringValue
                      ) *
                        100) /
                        total
                    )}
                  />
                  {
                    singledata._document.data.value.mapValue.fields.rating_5
                      .stringValue
                  }
                </h4>
                {/* <hr style={{ width: "12%", margin: "auto" }} /> */}
                <h4>Total</h4>

                <h4>
                  {Number(
                    singledata._document.data.value.mapValue.fields.rating_1
                      .stringValue
                  ) +
                    Number(
                      singledata._document.data.value.mapValue.fields.rating_2
                        .stringValue
                    ) +
                    Number(
                      singledata._document.data.value.mapValue.fields.rating_3
                        .stringValue
                    ) +
                    Number(
                      singledata._document.data.value.mapValue.fields.rating_4
                        .stringValue
                    ) +
                    Number(
                      singledata._document.data.value.mapValue.fields.rating_5
                        .stringValue
                    )}
                </h4>
              </div>
            </div>
          </div>
          <div>
            <div className="SingleProductPageReviews">
              <h4>Reviews</h4>
              <div>
                {Reviewsdata !== null ? (
                  Reviewsdata.map((e, index) => (
                    <div key={index}>
                      <div className="SingleReviewsData">
                        {e.userData.profile === "" ? (
                          <img src={profile} alt="" />
                        ) : (
                          <img src={e.userData.profile} alt={e.userData.name} />
                        )}

                        <h4>{e.userData.name}</h4>
                        <h4>
                          {new Date(e.reviewData.timeStamp).toLocaleString()}{" "}
                        </h4>
                      </div>
                      <h3 key={index}>{e.reviewData.review}</h3>
                    </div>
                  ))
                ) : (
                  <h6>No Review</h6>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h4>No Data Found</h4>
      )}
    </div>
  );
};

export default SingleProductPage;
