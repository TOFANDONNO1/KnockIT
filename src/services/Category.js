import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { database } from "../firebaseauth";



const CategoryCollection = collection(database,"Category")
class Category {

    getallCategories=()=> {
        const querys = query(CategoryCollection, orderBy("timeStamp","desc"));
        return getDocs(querys)
    }

    getSingelCategories=(id)=> {
        const singeldata=doc(database,"Category",id)
    return getDoc(singeldata)
    }


}

export default new Category();