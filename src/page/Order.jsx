import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Footer from "./Footer";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { database } from "../firebaseauth";
import OrderItemCard from "./OrderItemCard";
import SkeletonLoader from "./SkeletonLoader";
import "../CSS/Order.css";
import { useUserAuth } from "../Context/UseAuthContext";
import { Button } from "react-bootstrap";
import { AiOutlineBars } from "react-icons/ai";
const Order = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { User } = useUserAuth();
  const [OrderData, SetOrderData] = useState(null);
  const [FilterdOrderData, SetFilterdOrderData] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const unsubscribe = onSnapshot(
          query(collection(database, "ORDER"), orderBy("timeStamp", "desc")),
          (snapshot) => {
            const data = [];
            snapshot.forEach((doc) => {
              if (doc.data().uid === User.uid) {
                data.push({ id: doc.id, ...doc.data() });
              }
            });
            SetOrderData(data);
          }
        );

        // Clean up the listener when the component unmounts
        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [User]);
  // console.log(OrderData);
  const filterOrdersByStatus = (Orders, targetStatus) => {
    const newfilter = Orders.filter(
      (order) => order.delivery.toLowerCase() === targetStatus.toLowerCase()
    );
    SetFilterdOrderData(newfilter);
    setIsFiltered(true);
  };
  // const pendign=(OrderData && filterOrdersByStatus(OrderData,"Pending"))
  // console.log(pendign);
  return (
    <div className="sabkabap_main_in_order">
      <div className="main_order">
      {OrderData !== null && OrderData.length > 0 && OrderData&& <h1>Your Orders</h1>}
      {OrderData !== null && OrderData.length > 0 && OrderData&&  <div className="dropdown">
          <Button className="dropbtn"><AiOutlineBars /></Button>
          <div className="dropdown-content">
          {OrderData !== null && (
  <>
    <Button onClick={() => filterOrdersByStatus(OrderData, "Pending")}>
      Pending
    </Button>

    <Button onClick={() => filterOrdersByStatus(OrderData, "Order confirmed")}>
      Order_Confirmed
    </Button>

    <Button onClick={() => filterOrdersByStatus(OrderData, "Shipped")}>
      Shipped
    </Button>

    <Button onClick={() => filterOrdersByStatus(OrderData, "Out for delivery")}>
      Out_for_Delivery
    </Button>

    <Button onClick={() => filterOrdersByStatus(OrderData, "Delivered")}>
      Delivered
    </Button>
  </>
)}
          </div>
        </div>}
      </div>

      <>
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <div className="Order_pmain">
            {isFiltered&&FilterdOrderData.length>0 ? (
              FilterdOrderData.map((e, index) => (
                <OrderItemCard key={index} e={e}  index={index} />
              ))
            ) : OrderData !== null && OrderData.length > 0 && OrderData ? (
              OrderData.map((e, index) => (
                <OrderItemCard key={index} e={e} index={index} />
              ))
            ) : (
              <h1 className="No_Order">No Order </h1>
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default Order;
