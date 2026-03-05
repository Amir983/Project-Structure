import type { InputHTMLAttributes } from "react";

interface Iprops extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ ...rest }: Iprops) => {
  return (
    <div className="flex flex-col p-1  ">
      <input
        className="border-2 p-2 border-b-slate-500  focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-lg px-3 py-3 text-md "
        {...rest}
      ></input>
    </div>
  );
};

export default Input;
