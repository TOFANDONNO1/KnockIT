import { sendPasswordResetEmail } from 'firebase/auth';
import React from 'react'
import "../CSS/ForgotPassword.css"
import { Button, } from 'react-bootstrap'
import { auth } from '../firebaseauth';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const ForgotPassword = () => {
const history=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const emailValue=e.target.email.value;
      
        sendPasswordResetEmail(auth,emailValue).then(data=>{
            toast.info('🦄Check Your Mail', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
                setTimeout(()=>{
                history("/login")

                },5000)
        }).catch(err=>{
            toast.warn(err.code+'🦄!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        })
        
    }
    
  return (
    <div className='ForgotPass'>
      
        <h2>Forgot Password</h2>
       
        <form onSubmit={(e)=>handleSubmit(e)}>
            <input name="email" placeholder='Email'/>
            <br />
            <br />
            <Button type="submit">Button</Button>
        </form>
    </div>
  )
}

export default ForgotPassword;