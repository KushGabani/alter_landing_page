import { useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { type FieldValues, type Path, FormProvider } from "react-hook-form";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "./";
import { useDialogForm } from "../../hooks/use_dialog_form";

type Props<T> = {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  className?: string;
  title: string;
  description?: string;
  disabled?: boolean;
  triggerClassName?: string;
};

export function BaseDialogForm<T extends FieldValues>({
  trigger,
  children,
  className,
  title,
  description,
  disabled,
  triggerClassName,
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
    <Dialog.Root open={isOpen} onOpenChange={toggleDialog}>
      {trigger && (
        <Dialog.Trigger disabled={disabled} className={triggerClassName}>
          {trigger}
        </Dialog.Trigger>
      )}
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className={`DialogContent ${className}`}>
          <div className={`space-y-6 ${className}`}>
            <div className="flex-between">
              <div className="space-y-1">
                <Dialog.Title className="DialogTitle">{title}</Dialog.Title>
                <Dialog.Description className="DialogDescription">
                  {description}
                </Dialog.Description>
              </div>
              <Dialog.Close
                tabIndex={-1}
                className="hover:bg-primary-100 hover:text-primary-400 p-2 flex-center rounded-full"
                aria-label="close"
              >
                <XMarkIcon width={"20px"} height={"20px"} />
              </Dialog.Close>
            </div>

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
                    type="button"
                    variant="solid"
                    onClick={() => toggleDialog()}
                    className="w-full"
                    text="Done"
                  />
                </div>
              </form>
            </FormProvider>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
