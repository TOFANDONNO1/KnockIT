
import { useEffect, useState } from 'react';
import './App.css';
import AllRoutes from './component/AllRoutes';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoadingMain } from './page/LoadingMain';
import Navbar from './component/Navbar';
import Footer from './page/Footer';
import WhatsAppChatButton from './page/WhatsApp';
import FirstNavbar from './component/FirstNavbar';
import { ToastContainer } from 'react-toastify';
function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Replace this with your actual data loading logic
    setTimeout(() => {
      setIsLoading(false); // Once data is loaded, set isLoading to false
    }, 1000); // Simulating a 2-second delay
  }, []);
  return (
    <div className="App">
      <ToastContainer />
{isLoading?(<LoadingMain/>):
<>
{/* <WhatsAppChatButton/> */}
<FirstNavbar/>
<Navbar/>

      <AllRoutes/>
<Footer className={"footer_container"}/>
</>

}


     
    </div>
  );
}

export default App;
