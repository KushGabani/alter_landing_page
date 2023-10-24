import { type HTMLInputTypeAttribute, useEffect, useRef } from "react";
import { type UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  label: string;
  type?: HTMLInputTypeAttribute;
  value?: string;
  inputProps?: UseFormRegisterReturn;
  placeholder?: string;
  icon?: JSX.Element;
  className?: string;
  suffix?: JSX.Element;
  focusOnMount?: boolean;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  icon,
  value,
  placeholder,
  inputProps,
  className,
  focusOnMount,
  suffix,
  error,
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="text-xs text-gray-500 whitespace-nowrap">{label}</label>
      <div className="flex-start bg-white rounded-md shadow-sm border focus-within:ring-1 focus-within:ring-primary-600">
        {icon && (
          <div className="px-3 border-r-[1px] border-gray-300">{icon}</div>
        )}
        <input
          aria-invalid={error ? "true" : "false"}
          {...inputProps}
          autoFocus={focusOnMount}
          type={type}
          value={value}
          className="block w-full focus:outline-none bg-transparent h-10 px-3 text-primary-800  disabled:bg-gray-100 disabled:border-gray-600 rounded-md sm:text-sm"
          placeholder={placeholder}
        />
        {suffix}
      </div>
      {error && (
        <div role="alert" className="flex text-red text-xs space-x-1">
          <span>*</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
