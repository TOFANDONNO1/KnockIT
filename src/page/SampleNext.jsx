import React from "react";
import { FaChevronRight } from "react-icons/fa";

const SampleNext = (props) => {
  const { className, style, onClick } = props;
  return (
    <FaChevronRight
      onClick={onClick}
      className={className}
      style={{ color: "#048ED5" }}
    />
    // <h
    //   className={className}
    //   style={{   background: "red",borderRadius:"50%" }}
    //   onClick={onClick}
    // >

    // </h>
  );
};

export default SampleNext;
