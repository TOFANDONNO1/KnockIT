import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, database } from "../firebaseauth";
import UserDataService from "../services/User.js";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const history = useNavigate();

  const [User, SetUser] = useState(null);
  const [localUser, SetUserlocal] = useState(null);
  const [SignUpUser, SetSignUpUser] = useState(null);
  const [UserData, setUserData] = useState(null);
  const [cartSize, setCartSize] = useState(0);

  // useEffect(() => {
  //     // const storedUser = JSON.parse(localStorage.getItem('user'));
  //     if (storedUser) {
  //       SetUserlocal(storedUser);
  //     }
  //   }, []);
  // let id;
  // if(User){
  //  id= User.uid
  // }
  const getUserData =  (id) => {
  
    const userDocRef=doc(database,"USERS",id);

    onSnapshot(userDocRef,(doc)=>{
      if(doc.exists()){
        setUserData(doc.data());
        // console.log(doc.data());
      }
    })

  };
  const signUp = async (newuser, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newuser.email,
        password
      );
history("/")
      const userUID = userCredential.user.uid;
      newuser.uid = userUID;
      newuser.timeStamp = Date.now();
      // await UserDataService.addUsers(newuser)
      const ref = doc(database, "USERS", userUID);
      await setDoc(ref, newuser);
window.location.reload();
      // window.localStorage.setItem("isSignUp", true);
    } catch (error) {
      alert(error.code);
    }
  };

  const  SignIn=async(email, password)=> {
    return signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        
        SetUser(userCredential.user);
history("/")

      }
    );
  }

  const  Logout=() =>{
    SetUser(null);
    

     signOut(auth);
  }
  // const getUserData=async (id)=>{
  //     const userData=await UserDataService.getUser(id);
  //     setUserData(userData)
  // }
  useEffect(() => {
   
  if(User){
    getUserData(User.uid)
  }
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        // console.log("ccF",currentUser);
        // history("/");
    
        SetUser(currentUser);
        // localStorage.setItem('user', JSON.stringify(currentUser));
        // if(User&&User.uid){
        // getUserData(User.uid)
        // }
      } else {
      }
    });

    return () => {
      unsubscribe();
    };
  
  }, [User]);

  // console.log(User,UserData,cartSize);
  return (
    <userAuthContext.Provider
      value={{
        cartSize,
        setCartSize,
        localUser,
        User,
        signUp,
        UserData,
        SignIn,
        Logout,
        SignUpUser,
        SetSignUpUser,
        setUserData,
        
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
