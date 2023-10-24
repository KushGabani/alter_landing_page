"use client";

import { useEffect } from "react";
import { type FieldValues, FormProvider, type Path } from "react-hook-form";
import { Button } from "../global";
import { useDialogForm } from "../../hooks/use_dialog_form";
import * as Popover from "@radix-ui/react-popover";

type Props<T> = {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  className?: string;
};

export function BasePopoverForm<T extends FieldValues>({
  trigger,
  children,
  className,
}: Props<T>) {
  const { formMethods, isOpen, toggleDialog } = useDialogForm<T>();

  useEffect(() => {
    if (!isOpen) return;
    const inputFields: Path<T>[] = Object.keys(
      formMethods.getValues()
    ) as Path<T>[];
    for (const fieldName of inputFields) {
      const value = formMethods.getValues(fieldName);
      if (!value) {
        formMethods.setFocus(fieldName);
        break;
      }
    }
  }, [formMethods, isOpen]);

  return (
    <Popover.Root>
      {trigger && <Popover.Trigger>{trigger}</Popover.Trigger>}
      <Popover.Portal>
        <Popover.Content
          align="end"
          className={`PopoverContent p-5 ${className}`}
          sideOffset={5}
        >
          <FormProvider {...formMethods}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toggleDialog();
              }}
              className="w-full space-y-4"
              autoComplete="off"
            >
              {children}
              <div className="flex-between space-x-6 pt-3">
                <Button
                  type="submit"
                  variant="solid"
                  className="w-full hidden"
                  text="Done"
                />
              </div>
            </form>
          </FormProvider>

          <Popover.Arrow className="PopoverArrow fill-white stroke-gray-200" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
