
import { database } from "../firebaseauth";
import {
  collection,
  getDocs,
  getDoc,
  
  doc,
  query,
  orderBy,
} from "firebase/firestore";


const ProductCollection =collection(database,"PRODUCTS");


class ProductData{
    getallProductData=()=>{
        const querys = query(ProductCollection, orderBy("timeStamp","desc"));

        return getDocs(querys)
    }
    getsingleProductData=(id)=>{
        const singeldata=doc(database,"PRODUCTS",id);
        return getDoc(singeldata)
    }
    getsingleProductDataReview=(id)=>{
        const singeldata=collection(database,`PRODUCTS).doc(${id})/ProductReview`);
        return getDoc(singeldata)
    }
    
}

export default new ProductData();