import "@/components/input.scss";

type InputType = {
  id: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  size?: "normal" | "full";
  imageUrl?: string;
};

const Input = ({ id, type = "text", placeholder, size = "full", imageUrl, ...rest }: InputType): JSX.Element => {
  return <input id={id} type={type} placeholder={placeholder} className={size} {...rest} />;
};

export default Input;
