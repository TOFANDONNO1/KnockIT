import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import Footer from './Footer'
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { database } from '../firebaseauth';
import {BsStopwatch} from 'react-icons/bs'
import { useNavigate } from 'react-router';
import { Card, Container, Row, Col } from 'react-bootstrap';

import "../CSS/Store.css"
import SkeletonLoader from './SkeletonLoader';
    
   


const Store = () => {
    const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate=useNavigate();
    useEffect(() => {
      setIsLoading(true)
      fetchBranchesData()
        .then((data) => {
          setBranches(data);
        
        })
        .catch((error) => {
       setIsLoading(false)
        }).finally(() => {
          setIsLoading(false)
        });

        // setTimeout(() => {
        //   setIsLoading(false);
        // }, 1000);
    }, []);
    const fetchBranchesData = async () => {

        try {
          const collectionRef = collection(database, 'BRANCHES');
      const q=query(collectionRef,orderBy("timeStamp","asc"));
          const querySnapshot = await getDocs(q);
      
          const branchesData = [];
      
          querySnapshot.forEach((doc) => {
            const branchData = doc.data();
            branchesData.push(branchData);
          });
      
          return branchesData;
        } catch (error) {
          console.error('Error fetching data from Firestore', error);
          throw error; 
        }
      };
      
   
  
    return (
      <div className="main_store">
     
{isLoading?(<SkeletonLoader/>):(

<Container>
<Row  style={
            branches !== null && branches.length > 0
              ? { height: "auto","margin":"5% 0% 10% 0%" }
              : { height: "100%" ,"margin":"5% 0% 25% 0%",color:"#537E2C",textAlign:"center"}
          }>
  {branches.map((el, index) => (
    <Col  xs={12} sm={6} md={4} lg={3} key={index}>
      <Card
        className="store-card"
        onClick={() => navigate(`/store/${el.storeId}`)}
      >
        <Card.Img style={{ height: '180px' }} src={el.storeImage} alt={el.storeName} />
        <Card.Body>
          <Card.Title>{el.storeName}</Card.Title>
          <Card.Text>{el.storeDescription}</Card.Text>
          <Card.Text>
            <BsStopwatch /> {el.deliveryTiming}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
</Container>
)}

      
    </div>
      // <div>
      //   <Navbar/>
   
      //   <ul className='storeul'>
      //     {branches.map((el, index) => (
      //     <div className='storemain' key={index} onClick={()=>navigate(`/store/${el.storeId}`)}>
      //    <img  src={el.storeImage} alt={el.storeName} />
      //    <h1>{el.storeName}</h1>
      //    <p>{el.storeDescription}</p>
      //    <h2 ><BsStopwatch/>{el.deliveryTiming}</h2>
      //     </div>
      //     ))}
      //   </ul>
      //   <Footer/>
      // </div>
    );
  };
  
  export default Store;
  