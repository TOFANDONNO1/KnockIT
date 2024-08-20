import React from 'react'
import { Link } from 'react-router-dom'

const OrderItemCard = ({e,index}) => {
  return (
    <Link style={{textDecoration:"none"}} to={`/order/${e.id}`}>

    <div className="order_pmainone" >
       <div className="order_imgoff">
        <h4 className="order_off">
          {Math.floor(100 - (e.productPrice * 100) / e.productCuttedPrice)}% OFF
        </h4>
        <img src={e.productImage} alt={e.productBrandName} />
      </div>
       <div className="Order_details">
       <div>
       <h4>{e.productTitle}</h4>
        <h4>{e.qty}</h4>
       </div>
     
        <div className="Order_hdealtwo">
          <h4>₹{e.productPrice}</h4>
          <h4
            style={{
              textDecoration: "line-through",
              fontSize: "10px",
              marginLeft: "1%",
            }}
          >
            {" "}
            ₹{e.productCuttedPrice}
          </h4>
        </div>
       <div>
       <h4>Order Status:{e.delivery}</h4>

       </div>
        </div> 

    </div>
    </Link>

  )
}

export default OrderItemCard