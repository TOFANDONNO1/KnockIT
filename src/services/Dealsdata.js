
import { database } from "../firebaseauth";
import {
  collection,
  getDocs,
  getDoc,
  
  doc,
  query,
  orderBy,
} from "firebase/firestore";


const DealsOfTheDay =collection(database,"HOME/HomeData/Deals_of_the_day");


class DealsData{
    getallDealsData=()=>{
        const querys = query(DealsOfTheDay, orderBy("timeStamp","desc"));

        return getDocs(querys)
    }
    getsingleDealsData=(id)=>{

        const singeldata=doc(database,"HOME",id);
        return getDoc(singeldata)
    }
}

export default new DealsData();