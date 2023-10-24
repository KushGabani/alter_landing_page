import { type CSSProperties } from "react";

type Props = {
  text: string;
  onClick?: () => void;
  style?: CSSProperties;
  className?: string;
};

export const Tag = ({ text, onClick, className, style }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`min-w-fit px-2 py-[0.3rem] rounded-md text-xs font-normal ${className}`}
      style={style}
    >
      {text}
    </div>
  );
};
