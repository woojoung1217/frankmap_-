"use client";

import { ReactNode } from "react";
import "@/components/button.scss";

type ButtonType = {
  children: ReactNode;
  type?: "button" | "submit";
  size?: string;
  color?: string;
  imgUrl?: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button = ({ children, type = "button", size = "normal", color = "primary", imgUrl, handleClick }: ButtonType) => {
  return (
    <button type={type} onClick={handleClick} className={`${size}-${color}`}>
      {imgUrl && <img src={imgUrl} />}
      {children}
    </button>
  );
};

export default Button;
