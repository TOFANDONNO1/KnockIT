import React from 'react'
import Footer from '../Footer'
import Navbar from '../../component/Navbar'
import logo from "../../Images/logo.jpg";
import "../../CSS/Policy/Privacy.css"

const Terms_conditions = () => {
  return (
    <div>
   
        <div className="privacy_policy">
            <div>
                <p>These Terms and Conditions govern your use of KnockIT's grocery delivery services. By using our services, you agree to comply with and be bound by the following terms:
</p>
         <div className="logo">

         <img  src={logo} alt="KnockIT" />
         <h1>Terms and Conditions</h1>

          </div>   

            </div>


<h2>1. Account Registration:
</h2>
<p>To use our services, you may be required to create an account with accurate and current information.
<br />
You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
</p>

<h2>2. Ordering and Delivery:
</h2>
<p>You can place orders for groceries through our website or mobile app.
We will make every effort to deliver your orders promptly to the address you provide during checkout.
<br />
KnockIT reserves the right to refuse service, cancel orders, or limit quantities at our discretion.
</p>
<h2>3. Payment:
</h2>
<p>Payment for your orders can be made through the available payment methods on our platform.
<br />
All payments are subject to authorization by the payment provider.
</p>

<h2>4. Product Availability and Substitutions:
</h2>
<p>We make every effort to fulfill your orders as accurately as possible. However, there may be cases of unavailable items.
<br />
We may substitute unavailable items with similar products, and you will only be charged for the items received.
</p>
<h2>5. Cancellation and Refunds:
</h2>
<p>You can cancel an order before it is processed by contacting our customer support.

<br />Refunds for cancelled orders or defective products will be issued in accordance with our refund policy.
</p>

<h2>6. User Conduct:
</h2>
<p>You agree not to use our services for any unlawful or prohibited purpose.
<br />You are responsible for your interactions with other users and third parties while using our services.
</p>
<h2>7. Privacy:
</h2>
<p>Your use of our services is subject to our Privacy Policy, which outlines how we collect, use, and protect your personal information.
</p>
<h2>8. Intellectual Property:
</h2>
<p>All content and materials on our platform are the property of KnockIT and are protected by copyright, trademark, and other intellectual property laws.
</p>

<h2>9. Termination:
</h2>
<p>KnockIT reserves the right to terminate or suspend your account and access to our services at our discretion.
</p>
<h2>10. Disclaimers:
</h2>
<p>We do not guarantee the accuracy, completeness, or reliability of any content on our platform.
<br />KnockIT is not liable for any damages resulting from the use of our services.
</p>

<h2>11. Changes to Terms and Conditions:
</h2>
<p>We may update these Terms and Conditions at any time. It is your responsibility to review them periodically.
</p>

<h2>Contact Us
</h2>
     <p>If you have questions or concerns about your privacy, please contact us at:
</p>
<p>KnockIT Grocery Delivery
</p>

<p>+91 0000000000</p>
<p>KnockITonline@gmail.com</p>
<p>By using our services, you agree to the terms outlined in this Privacy Policy. </p>
<p>Last updated:09/11/2023</p>



        </div>

    </div>
  )
}

export default Terms_conditions