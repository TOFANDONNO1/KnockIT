import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { database } from "../firebaseauth";

const RatingReview = ({ productId, uid ,orderId}) => {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState(""); // State for review text

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const onStarClick = (newRating) => {
    setRating(newRating); // Update the rating state
  };

  const handleSave = () => {
    // You can access the rating and review text here
    const ordertRef = doc(database, "ORDER", orderId);
    getDoc(ordertRef)
    .then((orderDoc) => {
      if (orderDoc.exists()) {
        const orderData = orderDoc.data();

     
        console.log(orderData);
        if (rating >= 1) {
         orderData.ratingProduct=String(rating);

          return updateDoc(ordertRef, orderData);
        }

        console.log(orderData);

        // return updateDoc(productRef, productData);
      } else {
        console.error("Order document does not exist");
      }
    })
    .then(() => {
      console.log("Order data updated successfully");
    })
    .catch((error) => {
      console.error("Error updating Order data:", error);
    });


    console.log("Rating:", rating);

    console.log("Review:", reviewText);
    const productRef = doc(database, "PRODUCTS", productId);

    getDoc(productRef)
      .then((productDoc) => {
        if (productDoc.exists()) {
          const productData = productDoc.data();

       
          console.log(productData);
          const productReviewCollectionRef = collection(productRef, "ProductReview");
        
         
    const randomId = Math.random().toString(36).substring(5);
        

          const newReviewDocRef = doc(productReviewCollectionRef, randomId);

          setDoc(newReviewDocRef, {
            id:randomId,
            userId: uid,
            timeStamp:Date.now(),
            review: reviewText,
            // You can include other review-related fields here
          });
          
          if (rating === 1) {
            productData.rating_1 = String(Number(productData.rating_1) + 1);
            productData.productTotalRating = String(
              Number(productData.productTotalRating) + 1
            );

            productData.productRating = String(
            Number( (5 * Number(productData.rating_5) +
                4 * Number(productData.rating_4) +
                3 * Number(productData.rating_3) +
                2 * Number(productData.rating_2) +
                1 * Number(productData.rating_1)) /
                (Number(productData.rating_1) +
                  Number(productData.rating_2) +
                  Number(productData.rating_3) +
                  Number(productData.rating_4) +
                  Number(productData.rating_5))
            ).toFixed(1)
            
            );

            return updateDoc(productRef, productData);
          } else if (rating === 2) {
            productData.rating_2 = String(Number(productData.rating_2) + 1);
            productData.productTotalRating = String(
              Number(productData.productTotalRating) + 1
            );
            productData.productRating = String(
              Number( (5 * Number(productData.rating_5) +
                 4 * Number(productData.rating_4) +
                 3 * Number(productData.rating_3) +
                 2 * Number(productData.rating_2) +
                 1 * Number(productData.rating_1)) /
                 (Number(productData.rating_1) +
                   Number(productData.rating_2) +
                   Number(productData.rating_3) +
                   Number(productData.rating_4) +
                   Number(productData.rating_5))
             ).toFixed(1)
             
             );
            return updateDoc(productRef, productData);
          } else if (rating === 3) {
            productData.rating_3 = String(Number(productData.rating_3) + 1);
            productData.productTotalRating = String(
              Number(productData.productTotalRating) + 1
            );
            productData.productRating = String(
              Number( (5 * Number(productData.rating_5) +
                 4 * Number(productData.rating_4) +
                 3 * Number(productData.rating_3) +
                 2 * Number(productData.rating_2) +
                 1 * Number(productData.rating_1)) /
                 (Number(productData.rating_1) +
                   Number(productData.rating_2) +
                   Number(productData.rating_3) +
                   Number(productData.rating_4) +
                   Number(productData.rating_5))
             ).toFixed(1)
             
             );
            return updateDoc(productRef, productData);
          } else if (rating === 4) {
            productData.rating_4 = String(Number(productData.rating_4) + 1);
            productData.productTotalRating = String(
              Number(productData.productTotalRating) + 1
            );
            productData.productRating = String(
              Number( (5 * Number(productData.rating_5) +
                 4 * Number(productData.rating_4) +
                 3 * Number(productData.rating_3) +
                 2 * Number(productData.rating_2) +
                 1 * Number(productData.rating_1)) /
                 (Number(productData.rating_1) +
                   Number(productData.rating_2) +
                   Number(productData.rating_3) +
                   Number(productData.rating_4) +
                   Number(productData.rating_5))
             ).toFixed(1)
             
             );
            return updateDoc(productRef, productData);
          } else if (rating === 5) {
            productData.rating_5 = String(Number(productData.rating_5) + 1);
            productData.productTotalRating = String(
              Number(productData.productTotalRating) + 1
            );
            productData.productRating = String(
          Number( (5 * Number(productData.rating_5) +
                 4 * Number(productData.rating_4) +
                 3 * Number(productData.rating_3) +
                 2 * Number(productData.rating_2) +
                 1 * Number(productData.rating_1)) /
                 (Number(productData.rating_1) +
                   Number(productData.rating_2) +
                   Number(productData.rating_3) +
                   Number(productData.rating_4) +
                   Number(productData.rating_5))
             ).toFixed(1)
             
             );
            return updateDoc(productRef, productData);
          }

          console.log(productData);

          // return updateDoc(productRef, productData);
        } else {
          console.error("Product document does not exist");
        }
      })
      .then(() => {
        console.log("Product data updated successfully");
      })
      .catch((error) => {
        console.error("Error updating product data:", error);
      });
    // You can save this data to your database or perform any other action here
    handleClose(); // Close the modal
  };
  console.log(productId, uid,orderId);

  return (
    <Container>
      <Button onClick={handleShow}>Open Rating & Review</Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rating & Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your Rating:</p>
          <StarRatings
            rating={rating}
            starRatedColor="blue"
            changeRating={onStarClick}
            numberOfStars={5}
            name="rating"
          />
          <p>Your Review:</p>
          <textarea
            cols="80"
            rows="3"
            placeholder="Enter your review"
            value={reviewText} // Set the value of the textarea from the state
            onChange={(e) => setReviewText(e.target.value)} // Update the reviewText state
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default RatingReview;
