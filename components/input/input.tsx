import React, { forwardRef } from "react";
import "@/components/input/input.scss";

interface InputType {
  id: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  size?: "normal" | "full";
  imageUrl?: string;
}

const Input = forwardRef<HTMLInputElement, InputType>(
  ({ id, type = "text", placeholder, size = "full", imageUrl, ...rest }, ref) => {
    return <input id={id} type={type} placeholder={placeholder} className={size} ref={ref} {...rest} />;
  },
);

export default Input;
