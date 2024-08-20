import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../page/Home";
import Catagory from "../page/Catagory";
import Cart from "../page/Cart";
import Profile from "../page/Profile";
import Login from "../page/Login";
import Order from "../page/Order";

import ProtectedRoute from "./ProtectedRoute";
import ProductPage from "../page/ProductPage";
import SingleProductPage from "../page/SingleProductPage";

import WishlistComponent from "../page/Wishelist";
import SubCategoryPage from "../page/SubCategoryPage";
import SubCategoryProductPage from "../page/SubCategoryProductPage";
import Store from "../page/Store";
import StoreDetailsPage from "../page/StoreDetailsPage";
import { SinlgOrderPage } from "../page/SinlgOrderPage";
import Notification from "../page/Notification";
import AboutUs from "../page/AboutUs";
import ForgotPassword from "../page/ForgotPassword";
import Privacy from "../page/Policy/Privacy";
import Refund from "../page/Policy/Refund";
import Shipping from "../page/Policy/Shipping";
import Terms_conditions from "../page/Information/Terms_conditions";
import Contact_Us from "../page/Information/Contact_Us";
import PageNotFound from "../page/PageNotFound";
import AllProductsPage from "../page/AllProductsPage";
import DealsOfTheDay from "../page/DealsOfTheDay";

const AllRoutes = () => {
  return (
    <Routes >
      <Route path="*" element={<PageNotFound/>}/>
      <Route path="/privacy_policy" element={<Privacy/>}/>
      <Route path="/Refund_policy" element={<Refund/>}/>
      <Route path="/Shipping_policy" element={<Shipping/>}/>
      <Route path="/Terms_conditions" element={<Terms_conditions/>}/>
      <Route path="/contact_us" element={<Contact_Us/>}/>
          


      <Route path="/reset" element={<ForgotPassword />} />
      <Route path="/store" element={<Store />} />
      <Route path="/store/:storeId" element={<StoreDetailsPage />} />
      <Route
        path="/"
        element={
       
            <Home />
    
        }
      />
      <Route
        path="/category"
        element={
        
            <Catagory />
      
        }
      />
      <Route
        path="/category/:SubCategoryId"
        element={
        
            <SubCategoryPage />
     
        }
      />
      <Route
        path="/subcategoryProducPage"
        element={<SubCategoryProductPage />}
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      {/* <Route path='/signup' element={<Signup/>} /> */}
      <Route
        path="/order"
        element={
          <ProtectedRoute>
            <Order />
          </ProtectedRoute>
        }
      />
      <Route path="/order/:orderId" element={<SinlgOrderPage />} />
      <Route path="/notification" element={<Notification />} />
      <Route
        path="/wishelist"
        element={
       <ProtectedRoute>
            <WishlistComponent />

       </ProtectedRoute>
         
        }
      />
      <Route path="/productpage" element={<ProductPage />} />
     <Route path="/allproductpage" element={<AllProductsPage />} />
     <Route path="/allproductpage/:productId" element={<SingleProductPage />} />

      <Route path="/productpage/:productId" element={<SingleProductPage />} />
      <Route path="/Dealspage" element={<DealsOfTheDay/>}/>
      <Route path="/Dealspage/:productId" element={<SingleProductPage />} />
      <Route path="/about" element={<AboutUs />} />
    </Routes>
  );
};

export default AllRoutes;
