import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../Context/UseAuthContext';

const ProtectedRoute = ({children}) => {
const {User}=useUserAuth();
// console.log(User);

  if(User===null){
return <Navigate to={"/login"}/>
  }
  return children
}

export default ProtectedRoute;