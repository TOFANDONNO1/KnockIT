import React from 'react'
import Navbar from '../../component/Navbar'
import Footer from '../Footer'
import "../../CSS/Policy/Privacy.css"
import logo from "../../Images/logo.jpg";

const Shipping = () => {
  return (
    <div>

           <div className="privacy_policy">
            <div>
                <p>At KnockIT, we are dedicated to providing efficient and reliable grocery delivery services. Our Shipping Policy outlines the terms and procedures related to the delivery of your orders:</p>
                <div className="logo">

                <img  src={logo} alt="KnockIT" />
                <h1>Shipping Policy</h1>

                </div>
            </div>
<h2>1. Delivery Service Area:
</h2>
<p>KnockIT provides grocery delivery services within Hanamkonda ,Warangal ,Kazipet. Please check our platform to ensure that your delivery address falls within our service area.
</p>

<h2>2. Delivery Times:
</h2>
<p>We offer scheduled delivery slots for your convenience. During the checkout process, you can choose a delivery window that suits your preferences.
</p>

<h2>3. Order Processing:
</h2>
<p>Your order will be processed promptly after successful payment. Our team will pick and pack your items to ensure their quality and freshness.
</p>

<h2>4. Delivery Charges:
</h2>
<p>The cost of delivery will be clearly displayed during the checkout process. It may vary depending on factors such as order value and delivery location.
</p>
<h2>5. Delivery Confirmation:
</h2>

<p>You will receive an order confirmation email with the details of your purchase and delivery time. Additionally, you will be notified when your order is out for delivery.
</p>
<h2>6. Delivery Attempts:
</h2>
<p>In case you are not available to receive your delivery during the chosen time slot, our delivery personnel will make reasonable attempts to contact you and complete the delivery. If unsuccessful, the order may be returned to our facility, and additional charges may apply for redelivery.
</p>

<h2>7. Special Instructions:
</h2>
<p>During the checkout process, you can provide specific delivery instructions, such as gate codes or preferred drop-off locations, to assist our delivery team in ensuring a smooth delivery experience.
</p>


<h2>8. Contactless Delivery:
</h2>
<p>We offer contactless delivery to maintain safety and hygiene. Our delivery personnel will leave your order at the specified location, and you will be notified upon delivery</p>


<h2>9. Product Quality:
</h2>

<p>KnockIT takes utmost care in handling and delivering your groceries to maintain their quality and freshness. If you receive products that do not meet your expectations, please refer to our Refund Policy for resolution.
</p>


<h2>10. Delays and Force Majeure:
</h2>
<p>While we strive to ensure timely deliveries, there may be unforeseen circumstances such as extreme weather, traffic, or other factors that could cause delays. In such cases, we will make every effort to inform you of the delay and complete the delivery as soon as possible.
</p>



<h2>11. Policy Updates:
</h2>
<p>KnockIT reserves the right to update and amend this Shipping Policy as necessary. Please review this policy periodically for any changes.
</p>
<p>By using our grocery delivery services, you agree to adhere to the terms of this Shipping Policy. If you have any questions or concerns regarding delivery, please do not hesitate to contact us. Last updated:09/11/2023</p>
        </div>
   
    </div>
  )
}

export default Shipping