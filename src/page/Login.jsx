import React, {  useState } from "react";
import { useNavigate } from "react-router";
import "../CSS/login.css";
import { useUserAuth } from "../Context/UseAuthContext";
import { ToastContainer, toast } from "react-toastify";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { database } from "../firebaseauth";
import Navbar from "../component/Navbar";
import Footer from "./Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const history = useNavigate();
  const [login, SetLogin] = useState(false);
  const { signUp, SignIn } = useUserAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleSubmit = async (e, type) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (type === "Register") {
      const username = e.target.name.value;
      const phonenumber = e.target.phone.value;
      const ExistUserreferCode = e.target.referCode.value;
      if (
        username === "" ||
        phonenumber === "" ||
        email === "" ||
        password === ""
      ) {
        toast.info("Please enter all crenentials", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        if (password.length < 8) {
          toast.info("Password Must me 8 characters", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          const usersCollection = collection(database, "USERS");
          let isValidReferCode = false;
          let matchingUsers = null;
          const randomString = Math.random().toString(36).substring(2, 8);

          if (ExistUserreferCode) {
            try {
              const querySnapshot = await getDocs(usersCollection);

              // const usersData = [];

              querySnapshot.forEach((doc) => {
                const userData = doc.data();
                if (userData.referCode === ExistUserreferCode) {
                  // console.log("VALID REFERCODE: " + userData.referCode);
                  isValidReferCode = true;
                  matchingUsers = userData;
                  return;
                }

                // usersData.push(userData);
              });

              // Now, usersData array contains the data of all users in the "USERS" collection.
              // console.log(usersData);
              if (isValidReferCode) {
                // console.log("At least one user has a valid referCode.");
                console.log("Matching Users: ", matchingUsers);
                const coin = matchingUsers.coin + 10;
                await updateDoc(doc(usersCollection, matchingUsers.uid), {
                  coin,
                });

                try {
                  const newuser = {
                    timeStamp: Date.now(),
                    email,
                    name: username,
                    number: phonenumber,
                    "Last seen": "",
                    address: "",
                    cartSize: "0",
                    city: "",
                    country: "",
                    latitude: 1,
                    longitude: 1,
                    notificationSize: "0",
                    pincode: "",
                    productListSize: "",
                    profile: "",
                    state: "",
                    wishlistSize: "0",
                    uid: "",
                    token: "",
                    coin: 10,
                    referCode: randomString,
                  };
                  signUp(newuser, password);
                } catch (error) {
                  if (error.code === "auth/email-already-in-use") {
                    SetLogin(true);
                  }
                }
              } else {
                toast.info("Not valid referCode.", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
              }
            } catch (error) {
              console.error("Error getting users data: ", error);
              return [];
            }
            // console.log("E",ExistUserreferCode,typeof ExistUserreferCode, ExistUserreferCode.length);
          } else {
            try {
              const newuser = {
                timeStamp: Date.now(),
                email,
                name: username,
                number: phonenumber,
                "Last seen": "",
                address: "",
                cartSize: "0",
                city: "",
                country: "",
                latitude: 1,
                longitude: 1,
                notificationSize: "0",
                pincode: "",
                productListSize: "",
                profile: "",
                state: "",
                wishlistSize: "0",
                uid: "",
                token: "",
                coin: 0,
                referCode: randomString,
              };
              signUp(newuser, password);
            } catch (error) {
              if (error.code === "auth/email-already-in-use") {
                SetLogin(true);
              }
            }
            // console.log("NO",typeof ExistUserreferCode, ExistUserreferCode,ExistUserreferCode.length);
          }
        }
      }
    } else {
      if (email === "" || password === "") {
        toast.info("Please enter all crenentials", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        if (password.length < 8) {
          toast.info("Password Must me 8 characters", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          let ismailExisAdmin = false;
          let ismailExisRider = false;
          const riderCollectionRef = collection(database, "RIDERS");

          const adminCollectionRef = collection(database, "ADMIN");
          try {
            const riderquerySnapshot = await getDocs(riderCollectionRef);
            const adminquerySnapshot = await getDocs(adminCollectionRef);

            adminquerySnapshot.forEach((doc) => {
              const adminData = doc.data();

              if (adminData.email === email) {
                ismailExisAdmin = true;
                return;
              }
            });
            riderquerySnapshot.forEach((doc) => {
              const riderData = doc.data();
              if (riderData.email === email) {
                ismailExisRider = true;
                return;
              }
            });

            if (ismailExisRider) {
              toast.warn("Mail Used By Rider", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            } else if (ismailExisAdmin) {
              toast.warn("Mail Used By Admin", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            } else {
              await SignIn(email, password);
       
            }
          } catch (error) {
            toast.warn(error.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        }
      }
    }
  };
  const handleReset = () => {
    history("/reset");
  };
  return (
    <>
  
    <div className="loginmain">

      <div className="tog">
        <div
          className={login ? "activecolor" : "pointer"}
          onClick={() => SetLogin(false)}
        >
         <h2>Register</h2> 
        </div>
        <div
          className={login ? "pointer" : "activecolor"}
          onClick={() => SetLogin(true)}
        >
         <h2>Login</h2> 
        </div>
      </div>
      <h1>{login ? "login" : "Register"}</h1>
      <form onSubmit={(e) => handleSubmit(e, login ? "login" : "Register")}>
        {!login ? (
          <input type="text" name="name" placeholder="🧑‍🏫Enter Your Name" />
        ) : (
          ""
        )}

        <input type="email" name="email" placeholder="📧Enter Your Email" />
        {!login ? (
          <input
            type="tel"
            name="phone"
            pattern="[0-9]{10}"
            placeholder="📱Enter Your Phone Number"
          />
        ) : (
          ""
        )}
        {!login ? (
          <input
            type="text"
            name="referCode"
            placeholder="❤️Enter Your Refer Code"
          />
        ) : (
          ""
        )}
         <div className="password-input">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="🔒Enter Your Password"
          />
          <div
            // type="button"
            onClick={handleTogglePassword}
            className="eye_button"
          >
            {showPassword ? <FaEyeSlash color="#A7A9AA"/> : <FaEye color="#A7A9AA"/>}
          </div>
        </div>
        {/* <input
          type="password"
          name="password"
          placeholder="Enter Your Password"
        /> */}
        {login ? (
          <p
            style={{ textAlign: "right", cursor: "pointer", marginRight: "7%" }}
            onClick={handleReset}
          >
            forgot Password
          </p>
        ) : (
          ""
        )}
        <button>{login ? "login" : "Register"}</button>
      </form>
    </div>

  
    </>
    
  );
};

export default Login;
