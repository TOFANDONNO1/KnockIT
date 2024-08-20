import React, { useEffect, useState } from "react";
import "../CSS/Product.css";
import "../CSS/AllProductpage.css";
import Product from "../services/Product";
import { Link, NavLink } from "react-router-dom";
import SkeletonLoader from "./SkeletonLoader";
import { useUserAuth } from "../Context/UseAuthContext";
import UserDataService from "../services/User.js";
import { Button } from "react-bootstrap";
import SInglePageProductPageincanddec from "./SInglePageProductPageincanddec.jsx";
import SIngleProdutAddToCartBtn from "./SIngleProdutAddToCartBtn.jsx";
import SearchComponent from "../component/SearchComponent.jsx";
import { AiOutlineBars } from "react-icons/ai";
import { BiCartAlt } from "react-icons/bi";
const AllProductPage = () => {
  const [totalProduct, setTotaProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [SingleUser, setUserData] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);
  const [elementKg, setKgelement] = useState(null);

  // const { localUser } = useUserAuth();
  
  let id;
  // if (localUser && localUser.uid) {
  //   id = localUser.uid;
  // }
  useEffect(() => {
  const User = JSON.parse(localStorage.getItem("user"));
if(User&&User.uid){
  id=User.uid;
  getUserData(id);

}
if(totalProduct.length===0){
  getTotalProduct();

}
    // if (id) {
    //   getUserData(id);
    // }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const getTotalProduct = async () => {
    const products = await Product.getallProductData();
    setTotaProduct(products.docs);
  };

  const getUserData = async (id) => {
    const user = await UserDataService.getUser(id);
    if (user !== null) {
      setUserData(user);
    }
  };
  const filterProductsByPrice = () => {
    if (totalProduct.length > 0) {
      const sortedProducts = [...totalProduct].sort((a, b) => {
        const priceA =
          a._document.data.value.mapValue.fields.productPrice.integerValue;
        const priceB =
          b._document.data.value.mapValue.fields.productPrice.integerValue;
        return priceA - priceB;
      });

      const sorteddatas = [];
      sortedProducts.forEach((doc) => {
        const d = doc.data();
        sorteddatas.push(d);
      });
      setFilteredProducts(sorteddatas);
      setIsFiltered(true);
    }
  };
  const filterProductsByPriceHighToLow = () => {
    if (totalProduct.length > 0) {
      const sortedProducts = [...totalProduct].sort((a, b) => {
        const priceA =
          a._document.data.value.mapValue.fields.productPrice.integerValue;
        const priceB =
          b._document.data.value.mapValue.fields.productPrice.integerValue;
        return priceB - priceA;
      });

      const sorteddatas = [];
      sortedProducts.forEach((doc) => {
        const d = doc.data();
        sorteddatas.push(d);
      });
      setFilteredProducts(sorteddatas);
      setIsFiltered(true);
    }
  };
  const handleAddClick = (productId) => {
    setAddedProducts((prevProducts) => [...prevProducts, productId]);
  };
  
  return (
    <div className="allproductpage_main">
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        
        <div >
                 
          <div className="headingallproduct">
            <h2>All Products</h2>
            {<SearchComponent/>}
            <div class="dropdown">
  <Button class="dropbtn"><AiOutlineBars /></Button>
  <div class="dropdown-content">
  <Button onClick={filterProductsByPrice}>
                  Price_Low_to_High
                </Button>
                <Button onClick={filterProductsByPriceHighToLow}>
                  Price_High_to_Low
                </Button>
   
  </div>
</div>

          </div>

          <div className="All_pmain">
            {isFiltered
              ? filteredProducts.map((e, index) => (
                  <div className="pmainone" key={index}>
                    <div className="imgoff">
                      <h5 className="off">
                        {Math.floor(
                          100 - (e.productPrice * 100) / e.productCuttedPrice
                        )}
                        % OFF
                      </h5>
                      <Link
                        style={{ textDecoration: "none" }}
                        key={index}
                        to={`/allproductpage/${e.id}`}
                      >
                        <img src={e.productImage} alt={e.productBrandName} />
                      </Link>
                    </div>
                    <div className="pmaintwo">
                    <Link
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                        className="link_single_Product"
                        key={index}
                        to={`/allproductpage/${e.id}`}
                      ><div>
{/* <h5>{e.productBrandName}</h5> */}
<h5>{e.productTitle}</h5>
                      </div></Link>
                      
                      <div className="hdealtwo">
                        <div>
                        <h5>₹{elementKg !== null &&
                        elementKg.data().productId ===
                          e.id
                          ? elementKg.data().price
                          : e.productPrice}</h5>
                        <h5
                          style={{
                            textDecoration: "line-through",
                            fontSize: "10px",
                            marginLeft: "1%",
                          }}
                        >
                          {" "}
                          ₹{elementKg !== null &&
                                  elementKg.data().productId ===
                                    e.id? elementKg.data().cuttedPrice
                                    : e.productCuttedPrice}
                        </h5>
                        </div>
                        <div className="ratingstyle">
                        <h5>{e.productRating} *</h5>
                        <h5>{e.productTotalRating} </h5>
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
                          {e.productPrice > 800 ? (
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
                      {addedProducts.includes(e.id) ? (
                        // <SInglePageProductPageincanddec e={e.data()} />
                        <SIngleProdutAddToCartBtn productId={e.id} e={e}  elementKg={elementKg}
                        setKgelement={setKgelement}/>
                      ) : (
                        <Button onClick={() => handleAddClick(e.id)}>
                              <BiCartAlt />
                          Add
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              : totalProduct.length > 0
              ? totalProduct.map((e, index) =>
                  e._document.data.value.mapValue.fields.productVerification
                    .stringValue === "Public"  ? (
                    <div key={index}>
                      <div className="pmainone" >
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
                            to={`/allproductpage/${e._document.data.value.mapValue.fields.id.stringValue}`}
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
                            style={{ textDecoration: "none" ,color:'black'}}
                            key={index}
                            className="link_single_Product"
                            to={`/allproductpage/${e._document.data.value.mapValue.fields.id.stringValue}`}
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
              : "No Product Is Available"}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProductPage;
