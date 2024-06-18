import React from "react";

const Button = ({ name, styles, disabled, type }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`button-shadow  yellowBg ${styles} text-white px-5 py-2 rounded-md flxColCenter`}
    >
      {name}
    </button>
  );
};

export default Button;
