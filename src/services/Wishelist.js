
import { database } from "../firebaseauth";
import {
  collection,
  getDocs,
  getDoc,
  
  doc,
  query,
  orderBy,
} from "firebase/firestore";


const WishelistCollection =collection(database,"PRODUCTS");


class WishelistData{
    getallProductData=()=>{
      const querys = query(WishelistCollection, orderBy("timeStamp","desc"));

        return getDocs(querys)
    }
  updateWishlistData=()=>{
    const wishlistDoc=doc(database,"")
  }
    
}

export default new WishelistData();