import type { HTMLAttributes } from "react";

interface Iprops extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}

const Colors = ({ color, ...rest }: Iprops) => {
  return (
    <span
      className={`block w-5 h-5 rounded-full  cursor-pointer `}
      style={{ background: color }}
      {...rest}
    />
  );
};

export default Colors;
// tailwind => Bulid Time
