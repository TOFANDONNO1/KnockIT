import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import {  database } from "../firebaseauth";


const userCollectionRef=collection(database,"USERS");
class UserDataService {
    addUsers=(newUser)=>{
        return addDoc(userCollectionRef,newUser)
    }
    updateUser=(id,updateUser)=>{
        const userDoc=doc(database,"USERS",id);
        return updateDoc(userDoc,updateUser)
    }
    getUser=(id)=>{
        const userDoc=doc(database,"USERS",id);
        return getDoc(userDoc)
    }
}

export default new UserDataService();