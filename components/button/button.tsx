"use client";

import { ReactNode } from "react";
import "@/components/button/button.scss";

interface ButtonType {
  children: ReactNode;
  type?: "button" | "submit";
  size?: "normal" | "large" | "full";
  color?: "primary" | "secondary";
  imgUrl?: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  children,
  type = "button",
  size = "normal",
  color = "primary",
  imgUrl,
  handleClick,
}: ButtonType): JSX.Element => {
  return (
    <button type={type} onClick={handleClick} className={`${size}-${color}`}>
      {imgUrl && <img src={imgUrl} alt="버튼 이미지" />}
      {children}
    </button>
  );
};

export default Button;
