import React from "react";
import Navbar from "../../component/Navbar";
import Footer from "../Footer";
import logo from "../../Images/logo.jpg";
import "../../CSS/Policy/Privacy.css";

const Refund = () => {

  return (
    <div>

     
      <div className="privacy_policy">
        <div>
          <p>
            At KnockIT, we are committed to providing you with high-quality
            grocery delivery services. However, we understand that there may be
            situations where you need a refund. This Refund Policy outlines the
            circumstances under which refunds will be issued:
          </p>
          <div className="logo">
          <img  src={logo} alt="KnockIT" />

          <h1>Refund Policy</h1>
          </div>
        </div>
        <h2>1. Order Cancellation:</h2>
        <p>
          If you wish to cancel an order before it has been processed and
          delivered, you may be eligible for a full refund. Please contact our
          customer support team to initiate the cancellation and refund process.
        </p>

        <h2>2. Defective or Damaged Products:</h2>

        <p>
          If you receive products that are defective or damaged, please inform
          us immediately. We will arrange for a refund or replacement of the
          affected items. In some cases, we may request photographic evidence of
          the damage.
        </p>
        <h2>3. Incorrect Items Received:</h2>
        <p>
          If you receive items that are different from what you ordered, please
          contact us as soon as possible. We will either refund the cost of the
          incorrect items or arrange for their replacement.
        </p>
        <h2>4. Out-of-Stock Items and Substitutions:</h2>
        <p>
          In the event that an item you ordered is out of stock, we may
          substitute it with a similar product of equal or higher value. You
          will only be charged for the items received. If you are not satisfied
          with the substitution, please contact us, and we will issue a refund
          for the substituted item.
        </p>
        <h2>5. Refund Process:</h2>

        <p>
          Refunds will be processed within a reasonable timeframe, and the
          method of refund may vary depending on the original payment method.
          Please allow a few business days for the refund to reflect in your
          account, as processing times may differ among financial institutions.
        </p>
        <h2>6. Non-Refundable Items:</h2>
        <p>Some items, such as gift cards, are non-refundable.</p>
        <h2>7. Contact Us:</h2>

        <p>
          If you believe you are eligible for a refund, please contact our
          customer support team by [contact information] with the following
          details: Your order number. A description of the issue. Relevant
          photographs (if applicable).
        </p>

        <h2>8. Change of Mind:</h2>
        <p>
          We do not offer refunds for returns due to a change of mind or
          personal preference. Please review your order carefully before
          completing the purchase.
        </p>

        <h2>9. Dispute Resolution:</h2>
        <p>
          If you are unsatisfied with the resolution provided by KnockIT,
          you may contact the relevant consumer protection authorities in your
          jurisdiction.
        </p>
        <h2>10. Policy Updates:</h2>
        <p>
          We reserve the right to update and amend this Refund Policy as
          necessary. Please review this policy periodically for any changes.
        </p>
        <p>
          By using our grocery delivery services, you agree to adhere to the
          terms of this Refund Policy. If you have any questions or concerns
          regarding refunds, please do not hesitate to contact us. Last updated:09/11/2023
        </p>
      </div>
  
    </div>
  );
};

export default Refund;
