import { forwardRef, memo } from "react";
import { type InputHTMLAttributes } from "react";

type Iprops = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, Iprops>(({ ...rest }, ref) => {
  return (
    <div className="flex flex-col p-1  ">
      <input
        ref={ref}
        className="border-2 p-2 border-b-slate-500  focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-lg px-3 py-3 text-md "
        {...rest}
      ></input>
    </div>
  );
});

export default memo(Input);
