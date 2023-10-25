import React, { createContext, useContext, useEffect, useState } from "react";
import { useForm, type FieldValues, type DefaultValues } from "react-hook-form";

type DialogFormContextType<T extends FieldValues> = {
  isOpen?: boolean;
  toggleDialog: (open?: boolean) => void;
  formMethods: ReturnType<typeof useForm<T>>;
  resetForm: () => void;
};

const DialogFormContext = createContext<DialogFormContextType<any> | undefined>(
  undefined
);

type ProviderProps<T extends FieldValues> = {
  children: React.ReactNode;
  defaultValues?: DefaultValues<T>;
};

export function DialogFormProvider<T extends FieldValues>({
  children,
  defaultValues,
}: ProviderProps<T>) {
  const [isOpen, setIsOpen] = useState<boolean | undefined>(undefined);
  const formMethods = useForm<T>({ defaultValues });

  const toggleDialog = (open?: boolean) => {
    open !== undefined ? setIsOpen(open) : setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!isOpen) resetForm();
  }, [isOpen]);

  const resetForm = () => {
    formMethods.reset(undefined, { keepDefaultValues: true });
  };

  const contextValue: DialogFormContextType<T> = {
    isOpen,
    toggleDialog,
    formMethods,
    resetForm,
  };

  return (
    <DialogFormContext.Provider value={contextValue}>
      {children}
    </DialogFormContext.Provider>
  );
}

export function useDialogForm<T extends FieldValues>() {
  const context = useContext(DialogFormContext) as DialogFormContextType<T>;
  if (!context) {
    throw new Error("useDialogForm must be used within a DialogFormProvider");
  }
  return context;
}
