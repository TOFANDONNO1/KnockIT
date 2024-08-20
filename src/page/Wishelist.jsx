import React, { useEffect, useState } from "react";

import { collection, doc, getDocs } from "firebase/firestore";
import { database } from "../firebaseauth";
import { Button } from "react-bootstrap";
import SIngleProdutAddToCartBtn from "./SIngleProdutAddToCartBtn.jsx";
import { FcLike } from "react-icons/fc";
import "../CSS/Wishelist.css"
import Product from "../services/Product";
import SkeletonLoader from "./SkeletonLoader";
import { Link } from "react-router-dom";
import whichlistimg from "../Images/wishelist.png";
import { useUserAuth } from "../Context/UseAuthContext.js";
import { IconContext } from "react-icons";
import { BiCartAlt } from "react-icons/bi";
const WishlistComponent = () => {
  const [wishlistItems, setWishlistItems] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [User, SetUser] = useState(null);
  const [addedProducts, setAddedProducts] = useState([]);
const {User}=useUserAuth();
const [elementKg, setKgelement] = useState(null);

 

  useEffect(() => {
    if (User) {
      const fetchWishlistData = async () => {
        try {
          const userId = User.uid;
          const userRef = doc(database, "USERS", userId);
          const wishlistCollectionRef = collection(userRef, "MY_WISHLIST");

          const snapshot = await getDocs(wishlistCollectionRef);
          const wishlistData = [];

          for (const docSnap of snapshot.docs) {
            const productId = docSnap.id;
            const wishlistItemData = docSnap.data();
            const product = await Product.getsingleProductData(productId);
            // console.log(product);

            // You can add more logic here to format the data as needed
            wishlistData.push(product );
          }

          setWishlistItems(wishlistData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching wishlist data", error);
        }
      };

      fetchWishlistData();
    }
  }, [User]);
  const handleAddClick = (productId) => {
    setAddedProducts((prevProducts) => [...prevProducts, productId]);
  };
// (wishlistItems!==null?wishlistItems.map((e)=>console.log(e)):"")
  // console.log(wishlistItems.map((e)=>e))
  return (
    <div style={{width:"90%",margin:"auto"}}>

      <div>
        {loading ? (
          <SkeletonLoader />
        ) : (
          <div >
            <div className="headingproduct">
             {wishlistItems.length>0&&<h1>Your Wishlist</h1>}
            </div>

            <div className="All_pmain">
              {wishlistItems.length > 0 &&wishlistItems? (
                wishlistItems.map((e, index) =>
                  e._document.data.value.mapValue.fields.productVerification
                    .stringValue === "Public" ? (
                      <div key={index}>
                      <div className="pmainone" style={{}} key={index}>
                        <div className="imgoff">
                          <h5 className="off">
                            {Math.floor(
                              100 -
                                (e._document.data.value.mapValue.fields
                                  .productPrice.integerValue *
                                  100) /
                                  e._document.data.value.mapValue.fields
                                    .productCuttedPrice.integerValue
                            )}
                            % OFF
                          </h5>
                          <Link
                            style={{ textDecoration: "none" }}
                            key={index}
                            to={`/productpage/${e._document.data.value.mapValue.fields.id.stringValue}`}
                          >
                            <img
                              src={
                                e._document.data.value.mapValue.fields
                                  .productImage.stringValue
                              }
                              alt={
                                e._document.data.value.mapValue.fields
                                  .productBrandName.stringValue
                              }
                            />
                          </Link>
                        </div>
                        <div className="pmaintwo">
                        <Link
                            style={{ textDecoration: "none" }}
                            className="link_single_Product"
                            key={index}
                            to={`/productpage/${e._document.data.value.mapValue.fields.id.stringValue}`}
                          ><div>
{/* <h5>
                            {
                              e._document.data.value.mapValue.fields
                                .productBrandName.stringValue
                            }
                          </h5> */}
                          <h5>
                            {
                              e._document.data.value.mapValue.fields
                                .productTitle.stringValue
                            }
                          </h5>
                          </div></Link>
                          
                          <div className="hdealtwo">
                            <div>
                            <h5>
                              ₹
                              {
                               elementKg !== null &&
                               elementKg.data().productId ===
                                 e._document.data.value.mapValue.fields.id
                                   .stringValue
                                 ? elementKg.data().price
                                 : e._document.data.value.mapValue.fields
                                  .productPrice.integerValue
                              }
                            </h5>
                            <h5
                              style={{
                                textDecoration: "line-through",
                                fontSize: "10px",
                                marginLeft: "1%",
                              }}
                            >
                              {" "}
                              ₹
                              {
                                elementKg !== null &&
                                elementKg.data().productId ===
                                  e._document.data.value.mapValue.fields.id
                                    .stringValue
                                  ? elementKg.data().cuttedPrice
                                  :e._document.data.value.mapValue.fields
                                  .productCuttedPrice.integerValue
                              }
                            </h5>
                            </div>
                           
                            <div className="ratingstyle">
                            <h5>
                              {
                                e._document.data.value.mapValue.fields
                                  .productRating.stringValue
                              }{" "}
                              *
                            </h5>
                            <h5>
                              {
                                e._document.data.value.mapValue.fields
                                  .productTotalRating.stringValue
                              }{" "}
                            </h5>
                          </div>
                          </div>
                          <div>
                            {/* <label >Choose a Quantity:</label>
<select id="cars" name="cars" >
<option value="">Select Kg</option>
<option value="1kg">1kg</option>
<option value="5kg">5kg</option>
<option value="10kg">10kg</option>
<option value="20kg">20kg</option>
</select> */}
                          </div>
                          {/* <div style={{ color: "green" }}>
                            {e._document.data.value.mapValue.fields.productPrice
                              .stringValue > 800 ? (
                              <h5>Free Delivery</h5>
                            ) : (
                              <h5>80 ₹ Delivery Price</h5>
                            )}
                          </div> */}
                        
                        </div>
                        {/* {
    e._document.data.value.mapValue.fields.productCategory
      .stringValue
  } */}
                        <div className="add_btn_productpage">
                          {addedProducts.includes(e.data().id) ? (
                            // <SInglePageProductPageincanddec e={e.data()} />
                            <SIngleProdutAddToCartBtn
                              productId={e.data().id}
                              e={e.data()}
                              elementKg={elementKg}
                              setKgelement={setKgelement}
                            />
                          ) : (
                            <Button onClick={() => handleAddClick(e.data().id)}>
                              <BiCartAlt />
                              Add
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )
                )
              ) : (
               ""
              )}
            </div>
            {
              wishlistItems.length===0&& <div
              style={{
                // position: "absolute",
                display: "grid",
                justifyContent: "center",
                margin: "auto",
                alignItems:"center",
                // border:"1px solid red",
                // marginLeft: "100%",
                // width: "200%",
                // height:"500px"
              }}
            >
              <h4>No Wishelist Product</h4>
              {/* <img src={whichlistimg} alt="No WHICHLIST" /> */}
              <IconContext.Provider value={{className:"react-icon-love"}}>
              <FcLike />

              </IconContext.Provider>
            </div>
            }
          </div>
        )}
      </div>

    
    </div>
  );
};

export default WishlistComponent;
