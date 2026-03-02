import type { InputHTMLAttributes } from "react";

interface Iprops extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ ...rest }: Iprops) => {
  return (
    <div className="flex flex-col p-1  ">
      <input className="border-2 p-2 "></input>
    </div>
  );
};

export default Input;
