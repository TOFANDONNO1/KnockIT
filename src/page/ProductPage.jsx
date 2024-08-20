import React, { useEffect, useState } from "react";
import "../CSS/Product.css";

import Product from "../services/Product";
import { Link, NavLink } from "react-router-dom";
import SkeletonLoader from "./SkeletonLoader";
import { useUserAuth } from "../Context/UseAuthContext";
import UserDataService from "../services/User.js";
import { Button } from "react-bootstrap";
import SInglePageProductPageincanddec from "./SInglePageProductPageincanddec.jsx";
import SIngleProdutAddToCartBtn from "./SIngleProdutAddToCartBtn.jsx";
import { BiCartAlt } from "react-icons/bi";
import Slider from "react-slick";
import SampleNext from "./SampleNext.jsx";
import SamplePrev from "./SamplePrev.jsx";
import { ToastContainer } from "react-toastify";

const ProductPage = () => {
  const [totalProduct, setTotaProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [SingleUser, setUserData] = useState(null);
  const [elementKg, setKgelement] = useState(null);

  // const [isFiltered, setIsFiltered] = useState(false);
  // const [filteredProducts, setFilteredProducts] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);

  // const { localUser } = useUserAuth();
  
  let id;
  // if (localUser && localUser.uid) {
  //   id = localUser.uid;
  // }
  useEffect(() => {
  const User = JSON.parse(localStorage.getItem("user"));
if(User&&User.uid){
  setIsLoading(true);
  id=User.uid;
  getUserData(id);
      setIsLoading(false);


}
    getTotalProduct();
    // if (id) {
    //   getUserData(id);
    // }
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
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
  let city =
    SingleUser &&
    SingleUser._document &&
    SingleUser._document.data &&
    SingleUser._document.data.value &&
    SingleUser._document.data.value.mapValue &&
    SingleUser._document.data.value.mapValue.fields &&
    SingleUser._document.data.value.mapValue.fields.city &&
    SingleUser._document.data.value.mapValue.fields.city.stringValue
      ? SingleUser._document.data.value.mapValue.fields.city.stringValue
      : "No City";

  
  const handleAddClick = (productId) => {
    setAddedProducts((prevProducts) => [...prevProducts, productId]);
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,

    nextArrow: <SampleNext />,
    prevArrow: <SamplePrev />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          dots: false,
        },
      },
    ],
  };
  return (
    <div style={{margin:"auto",width:"90%"}}>
     
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <div className="topp">
          <div className="headingproduct">
            <h2>PRODUCT FOR YOU</h2>
            <div>
              
              <NavLink to={"/allproductpage"}>
                <button>VIEW ALL</button>
              </NavLink>
            </div>
          </div>

          <div className="pmain">
       {totalProduct.length>0&&<Slider {...settings} >
        
            {   totalProduct.length > 0
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
                            key={index}
                            to={`/productpage/${e._document.data.value.mapValue.fields.id.stringValue}`}
                            className="link_single_Product"
                         
                         >
                            <div>
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
                              {elementKg !== null &&
                                  elementKg.data().productId ===
                                    e._document.data.value.mapValue.fields.id
                                      .stringValue
                                    ? elementKg.data().price
                                    :
                                e._document.data.value.mapValue.fields
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
                              {elementKg !== null &&
                                  elementKg.data().productId ===
                                    e._document.data.value.mapValue.fields.id
                                      .stringValue
                                    ? elementKg.data().cuttedPrice
                                    :
                                e._document.data.value.mapValue.fields
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
              : "No Product Is Available"}</Slider>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
