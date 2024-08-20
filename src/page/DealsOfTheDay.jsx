import React, { useEffect, useState } from "react";
import Dealsdata from "../services/Dealsdata";
import Product from "../services/Product";
import "../CSS/Product.css";
import { Link, NavLink } from "react-router-dom";
import SkeletonLoader from "./SkeletonLoader";
import { Button } from "react-bootstrap";
import SIngleProdutAddToCartBtn from "./SIngleProdutAddToCartBtn";
import { BiCartAlt } from "react-icons/bi";
import Slider from "react-slick";
import SamplePrev from "./SamplePrev";
import SampleNext from "./SampleNext";
const DealsOfTheDay = () => {
  const [totalDeals, setTotalDeals] = useState([]);
  const [TotalPlease, SetNaaPlease] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addedProducts, setAddedProducts] = useState([]);
  const [elementKg, setKgelement] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const dealsData = await Dealsdata.getallDealsData();
        // setTotalDeals(dealsData.docs);



        const promises = dealsData.docs.map((e) =>
          Product.getsingleProductData(
            e._document.data.value.mapValue.fields.productId.stringValue
          )
        );

        Promise.all(promises)
          .then((documentSnapshots) => {
            const newDataArray = [];

            documentSnapshots.forEach((snapshot) => {
              if (snapshot.exists) {
                const data = snapshot.data();
                newDataArray.push(data);
              } else {
                console.log("Document does not exist");
              }
            });

            // Update the state with the new data
            SetNaaPlease(newDataArray);
          })
          .catch((error) => {
            console.error("Error fetching DocumentSnapshots:", error);
          });
      } catch (error) {
        console.error("Error fetching deals data:", error);
      }
    };

    fetchData();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []); 
  const handleAddClick = (productId) => {
    setAddedProducts((prevProducts) => [...prevProducts, productId]);
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
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
            {" "}
            <h2>DEALS OF THE DAY</h2>{" "}
            <div>
            <NavLink to={"/Dealspage"}>
                
                <button>VIEW ALL</button>
              </NavLink>{" "}
            </div>
          
          </div>

          <div className="pmain">
       {TotalPlease.length>0&&<Slider {...settings}>
            {   TotalPlease.length > 0
              ? TotalPlease.map((e, index) =>
                  e.productVerification   === "Public"  ? (
                    <div key={index}>
                      <div className="pmainone" >
                        <div className="imgoff">
                          <h5 className="off">
                            {Math.floor(
                              100 -
                                (e.productPrice *
                                  100) /
                                  e.productCuttedPrice
                            )}
                            % OFF
                          </h5>
                          <Link
                            style={{ textDecoration: "none" }}
                            key={index}
                            to={`/productpage/${e.id}`}
                          >
                            <img
                              src={
                                e.productImage
                              }
                              alt={
                                e.productBrandName
                              }
                            />
                          </Link>
                        </div>
                        <div className="pmaintwo"> 
                        <Link
                            style={{ textDecoration: "none" }}
                            className="link_single_Product"
                            key={index}
                            to={`/productpage/${e.id}`}
                            
                          ><div>
  {/* <h5>
                            {
                              e.productBrandName
                            }
                          </h5> */}
                          <h5>
                            {
                              e.productTitle
                            }
                          </h5>
                          </div>
                          </Link>
                        
                          <div className="hdealtwo">
                            <div>
                            <h5>
                              ₹
                              {
                               elementKg !== null &&
                               elementKg.data().productId ===
                                 e.id
                                 ? elementKg.data().price
                                 : e.productPrice
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
                                  e.id? elementKg.data().cuttedPrice
                                  :e.productCuttedPrice
                              }
                            </h5>
                            </div>
                            <div className="ratingstyle">
                            <h5>
                              {
                                e.productRating
                              }{" "}
                              *
                            </h5>
                            <h5>
                              {
                                e.productTotalRating
                              }{" "}
                            </h5>
                          </div>
                          </div>
                          <div>
                            
                          </div>
                         
                         
                        </div>
                        <div className="add_btn_productpage">
                          {addedProducts.includes(e.id) ? (
                            // <SInglePageProductPageincanddec e={e.data()} />
                            <SIngleProdutAddToCartBtn
                              productId={e.id}
                              e={e}
                              elementKg={elementKg}
                              setKgelement={setKgelement}
                            />
                          ) : (
                            <Button onClick={() => handleAddClick(e.id)}>
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
        </Slider>}

          </div>
        </div>
      )}
    </div>
  );
};

export default DealsOfTheDay;
