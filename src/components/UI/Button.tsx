import { type ReactNode, type ButtonHTMLAttributes, memo } from "react";

interface Iprops extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  width?: "w-full" | "w-fit";
}

const Button = ({ children, className, width, ...rest }: Iprops) => {
  return (
    <button
      className={`${className}  ${width} p-2  text-white rounded-lg`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default memo(Button);
