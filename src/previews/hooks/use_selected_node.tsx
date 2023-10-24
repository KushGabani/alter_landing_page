"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useForm, type FieldValues, type DefaultValues } from "react-hook-form";

type SelectedNodeContextType<T extends FieldValues> = {
  selectedId: number;
  setSelectedId: React.Dispatch<React.SetStateAction<number>>;
};

const SelectedNodeContext = createContext<
  SelectedNodeContextType<any> | undefined
>(undefined);

type ProviderProps<T extends FieldValues> = {
  children: React.ReactNode;
  defaultValues?: DefaultValues<T>;
};

export function SelectedNodeProvider<T extends FieldValues>({
  children,
  defaultValues,
}: ProviderProps<T>) {
  const [selectedId, setSelectedId] = useState<number>(2);

  const contextValue: SelectedNodeContextType<T> = {
    selectedId,
    setSelectedId,
  };

  return (
    <SelectedNodeContext.Provider value={contextValue}>
      {children}
    </SelectedNodeContext.Provider>
  );
}

export function useSelectedNode<T extends FieldValues>() {
  const context = useContext(SelectedNodeContext) as SelectedNodeContextType<T>;
  if (!context) {
    throw new Error(
      "useSelectedNode must be used within a SelectedNodeProvider"
    );
  }
  return context;
}
