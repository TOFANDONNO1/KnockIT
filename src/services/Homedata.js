
import { database } from "../firebaseauth";
import {
  collection,
  getDocs,
  getDoc,
  
  doc,
  orderBy,
  query,
} from "firebase/firestore";


const HomeCollection =collection(database,"HOME/HomeData/Banner");


class Data{
    getallHomeData=()=>{
        const querys = query(HomeCollection, orderBy("timeStamp","desc"));

        return getDocs(querys);
    }
    getsingleHomeData=(id)=>{
        const singeldata=doc(database,"HOME",id);
        return getDoc(singeldata)
    }
}

export default new Data();