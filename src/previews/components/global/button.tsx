"use client";

import { type CSSProperties, forwardRef } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

const variantStyle = {
  vanilla: "text-gray-600 disabled:text-gray-400 disabled:bg-gray-50",
  solid:
    "bg-primary-400 hover:bg-primary-500 text-white active:bg-primary-600 disabled:bg-gray-300 disabled:bg-gray-600",
  outline:
    "border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 text-gray-600 disabled:bg-gray-100 disabled:text-gray-400",
  destructive:
    "border-2 border-red bg-red opacity-95 hover:opacity-100 text-white",
};

type ButtonProps = {
  id?: string;
  ref?: React.MutableRefObject<HTMLButtonElement | null>;
  variant: keyof typeof variantStyle;
  type: "button" | "reset" | "submit";
  tooltip?: string;
  text?: string;
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  loading?: boolean;
  style?: CSSProperties;
  className?: string;
};

export const Button = forwardRef<unknown, ButtonProps>(
  (
    {
      id,
      ref,
      variant,
      type,
      onClick,
      tooltip,
      icon,
      text,
      loading = false,
      disabled = false,
      style,
      className,
    },
    _
  ) => {
    const baseButton = (
      <button
        id={id}
        ref={ref}
        type={type}
        style={style}
        onClick={(e) => (onClick && !(loading || disabled) ? onClick(e) : null)}
        disabled={disabled}
        className={`w-fit whitespace-nowrap min-w-fit flex-center disabled:cursor-not-allowed ${
          icon && text ? "space-x-1" : "space-x-0"
        } cursor-pointer rounded-md text-center select-none px-3 py-2 ${
          variantStyle[variant]
        } ${className}`}
      >
        {icon}
        <span>{text}</span>
      </button>
    );

    return tooltip ? (
      <Tooltip.Provider>
        <Tooltip.Root delayDuration={200} disableHoverableContent>
          <Tooltip.Trigger asChild>{baseButton}</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className="TooltipContent select-none p-3 border rounded-md bg-white shadow-md text-sm font-medium"
              sideOffset={5}
            >
              {tooltip}
              <Tooltip.Arrow className="fill-white" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    ) : (
      baseButton
    );
  }
);
