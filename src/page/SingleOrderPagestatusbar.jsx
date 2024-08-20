import React, { } from 'react';
import '../CSS/StatusIndicator.css';

const StatusBar = ({ orderStatus ,orderData}) => {
  // console.log(orderData);
  const pendingtimestampInMilliseconds = orderData.timeStamp ;
// console.log(pendingtimestampInMilliseconds);

  const Pendingdate = new Date(pendingtimestampInMilliseconds);
  const confirmtimestampInMilliseconds = orderData.orderConfirmedDate ;

  // console.log(Number(confirmtimestampInMilliseconds));
  const confirmdate = new Date(Number(confirmtimestampInMilliseconds));
  const shippedtimestampInMilliseconds = orderData.shippedDate ;

  const shippeddate = new Date(Number(shippedtimestampInMilliseconds));
  const outfordeliverytimestampInMilliseconds = orderData.outForDeliveryDate ;
  const outfordeliverydate = new Date(Number(outfordeliverytimestampInMilliseconds));
  const deliveredtimestampInMilliseconds = orderData.deliveredDate ;
  // console.log(deliveredtimestampInMilliseconds);
  const delivereddate = new Date(Number(deliveredtimestampInMilliseconds));
// console.log(Pendingdate);
// console.log(confirmdate);
// console.log(shippeddate);
// console.log(outfordeliverydate);
// console.log(delivereddate);

  const statuses = ['Pending', 'Order confirmed', 'Shipped', 'Out for delivery', 'Delivered'];
  const statusIndex = statuses.indexOf(orderStatus);
  const isCanceled = orderStatus === 'Canceled';

  return (
    <div style={{display:"flex"}} className="mainstatusbar">
 <div className={`status-bar ${isCanceled ? 'canceled' : ''}`}>
    {statuses.map((status, index) => (
      <div
        key={index}
        className={`status ${statusIndex >= index ? 'completed' : ''} ${status === orderStatus ? 'current' : ''} ${isCanceled ? 'canceled' : ''}`}
      >
       <h3>
       {status}
        </h3> 
      </div>
    ))}
    {/* <div className="progress" style={{ height: `${progress}%` }}> */}
        
    {/* </div> */}
  </div>

  <div className="singleOrdepage_date">
   <h3>{Pendingdate.toLocaleString()}</h3>
   <h3> {confirmdate.toLocaleString()!=="1/1/1970, 5:30:00 AM"?confirmdate.toLocaleString():''}</h3>
   <h3> {shippeddate.toLocaleString()!=="1/1/1970, 5:30:00 AM"?shippeddate.toLocaleString():''}</h3>

   <h3> {outfordeliverydate.toLocaleString()!=="1/1/1970, 5:30:00 AM"?outfordeliverydate.toLocaleString():''}</h3>

   <h3> {delivereddate.toLocaleString()!=="1/1/1970, 5:30:00 AM"?delivereddate.toLocaleString():''}</h3>

  </div>
    </div>
   
  );
};

export default StatusBar;
