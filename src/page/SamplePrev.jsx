import React from 'react'
import { FaChevronLeft } from 'react-icons/fa';

const SamplePrev = (props) => {
  const { className, style, onClick } = props;

  return (
    <FaChevronLeft
      onClick={onClick}
      className={className}
      style={{ color: "#048ED5" }}
    />
    // <div
    //   className={className}
    //   style={{ ...style, display: "block", background: "green" ,borderRadius:"50%"}}
    //   onClick={onClick}
    // ></div>
  );
}

export default SamplePrev;