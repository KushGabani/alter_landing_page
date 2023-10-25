import { useEffect, useRef, type ChangeEvent, useState } from "react";

type Props = {
  label: string;
  selectedDate?: Date;
  error?: string;
  focusOnMount?: boolean;
  onApply: (date?: Date) => void;
};

export const DateField = ({
  label,
  selectedDate,
  focusOnMount,
  onApply,
  error,
}: Props) => {
  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const [localError, setLocalError] = useState<string | undefined>();

  useEffect(() => {
    if (focusOnMount && dayRef.current) dayRef.current.focus();
  }, []);

  useEffect(() => {
    if (!selectedDate) return;
    if (!dayRef.current || !monthRef.current || !yearRef.current) return;

    dayRef.current.value =
      selectedDate.getDate().toString().length > 1
        ? selectedDate.getDate().toString()
        : `0${selectedDate.getDate().toString()}`;
    monthRef.current.value =
      (selectedDate.getMonth() + 1).toString().length > 1
        ? (selectedDate.getMonth() + 1).toString()
        : `0${(selectedDate.getMonth() + 1).toString()}`; // +1 because count starts from 0
    yearRef.current.value = selectedDate.getFullYear().toString();
  }, [selectedDate]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    let maxVal =
      e.target.name === "day" ? 31 : e.target.name === "month" ? 12 : undefined;

    e.target.value = e.target.value.replace(/[^0-9]/g, "");
    const maxLength = parseInt(e.target.getAttribute("maxlength") ?? "2");

    const value = parseInt(e.target.value);
    if (e.target.value.length >= maxLength && maxVal) {
      if (value > maxVal) e.target.value = "0" + value.toString()[0];

      let ref =
        e.target.name === "day"
          ? monthRef
          : e.target.name === "month"
          ? yearRef
          : undefined;

      if (ref) ref.current?.focus();
    }
  };

  const onBlur = () => {
    setLocalError(undefined);
    if (!dayRef.current || !monthRef.current || !yearRef.current) return;
    if (
      !dayRef.current.value.length ||
      !monthRef.current.value.length ||
      !yearRef.current.value.length
    ) {
      onApply(undefined);
      return;
    }

    if (yearRef.current.value.length !== 4) {
      setLocalError("Invalid Year");
      return;
    }

    onApply(
      new Date(
        `${monthRef.current.value}/${dayRef.current.value}/${yearRef.current.value}`
      )
    );
  };

  return (
    <div className="space-y-1">
      <label className="text-xs text-gray-500">{label}</label>
      <div
        className={`group px-3 h-10 flex-center border focus-within:ring-1 focus-within:ring-primary-600 rounded-md bg-white space-x-1 text-sm text-gray-500 shadow-sm`}
      >
        <input
          type="text"
          name="day"
          maxLength={2}
          ref={dayRef}
          onBlur={onBlur}
          onChange={onChange}
          autoComplete="false"
          placeholder="DD"
          className="w-6 text-center focus:outline-none text-gray-600"
        />
        <span>/</span>
        <input
          type="text"
          name="month"
          maxLength={2}
          ref={monthRef}
          onBlur={onBlur}
          onChange={onChange}
          autoComplete="false"
          placeholder="MM"
          onKeyDown={(e) => {
            if (
              monthRef.current &&
              e.key == "Backspace" &&
              monthRef.current.value.length == 0
            ) {
              monthRef.current.value = "";
              dayRef.current?.focus();
            }
          }}
          className="w-6 text-center focus:outline-none text-gray-600"
        />
        <span>/</span>
        <input
          type="text"
          name="year"
          aria-invalid={localError ? "true" : "false"}
          maxLength={4}
          ref={yearRef}
          onBlur={onBlur}
          onChange={onChange}
          autoComplete="false"
          placeholder="YYYY"
          onKeyDown={(e) => {
            if (
              yearRef.current &&
              e.key == "Backspace" &&
              yearRef.current.value.length == 0
            ) {
              yearRef.current.value = "";
              monthRef.current?.focus();
            }
          }}
          className="w-9 focus:outline-none text-gray-600"
        />

        <button type="button" className="hidden" />
      </div>
      {(error || localError) && (
        <div role="alert" className="flex text-red text-xs space-x-1 mt-1">
          <span>*</span>
          <span>{error ?? localError}</span>
        </div>
      )}
    </div>
  );
};
