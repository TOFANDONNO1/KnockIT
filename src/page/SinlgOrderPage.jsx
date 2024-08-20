import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { database } from "../firebaseauth";
import { Image, Container, Row, Col } from "react-bootstrap";
import StatusBar from "./SingleOrderPagestatusbar";
import "../CSS/SingleOrderPage.css";
import RatingReview from "./RatingReview";

export const SinlgOrderPage = () => {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const docRef = doc(database, "ORDER", orderId);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const documentData = docSnap.data();
        setOrderData(documentData);
      }
    });

    return () => {
      // Clean up the listener when the component is unmounted
      unsubscribe();
    };
  }, [orderId]);

  // console.log( orderData );

  
 
  return (
    <Container style={{width:"90%"}} className="singleOrderpage_container">
      {orderData ? (
        <Row className="singleOrderPage-main">
          <Col md={6} xs={12}>
            {/* <h1>Product ID: {orderData.id}</h1> */}
            <h1>{orderData.productTitle}</h1>
            <Image src={orderData.productImage} alt="No Image" />
            <h1>Price: {orderData.productPrice}</h1>
            <h4>Qty: {orderData.qtyNo}</h4>
          </Col>
          <Col md={6} xs={12}>
            <StatusBar orderData={orderData} orderStatus={orderData.delivery} />
         
          </Col>

          
          <Col md={6} xs={12}>
            <div>
              <h1 className="price-line">📌 Delivery to</h1>
              <h4>{orderData.address}</h4>
            </div>
          </Col>
          <Col md={6} xs={12}>
            <div>
              <h1 className="price-line">User Information</h1>
              <h4>Name: {orderData.name}</h4>
              <h4>Phone Number: {orderData.number}</h4>
            </div>
          </Col>
          <Col xs={12}>
            <div className="price-details">
              <h3 className="price-line">Price Details</h3>
              <h2>Original Price: {orderData.productCuttedPrice}</h2>
              <h2>Discounted Price: {orderData.productPrice}</h2>
              <h2>DeliveryPrice: {orderData.deliveryPrice}</h2>
              <h2 className="price-line">
                Total Price:{" "}
                {Number(orderData.productPrice) * Number(orderData.qtyNo)}
              </h2>
            </div>
          </Col>
        </Row>
      ) : (
        <p>No data available</p>
      )}
      {orderData &&
      orderData.ratingProduct === "" &&
      orderData.delivery === "Delivered" ? (
        <RatingReview
          ratingProduct={orderData.ratingProduct}
          orderId={orderData.id}
          uid={orderData.uid}
          productId={orderData.productId}
        />
      ) : (
        ""
      )}
    </Container>
  );
};
