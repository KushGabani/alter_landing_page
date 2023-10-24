'use client';

import * as Tooltip from '@radix-ui/react-tooltip';

const variantStyle = {
  vanilla: 'aria-disabled:bg-gray-50 aria-disabled:text-gray-400',
  solid: 'bg-primary-400 hover:bg-primary-500 text-white',
  outline:
    'border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-400 text-gray-600 aria-disabled:text-gray-400',
};

type TriggerProps = {
  text?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  tooltip?: string;
  children?: React.ReactNode;
  variant?: 'solid' | 'outline' | 'vanilla';
};

export const TriggerButton: React.FC<TriggerProps> = ({
  icon,
  text,
  disabled = false,
  tooltip,
  className,
  children,
  variant = 'outline',
}) => {
  const baseTrigger = (
    <div
      aria-disabled={disabled}
      className={`w-fit text-sm flex-center space-x-2 cursor-pointer rounded-md px-3 py-2 text-center select-none ${
        variantStyle[variant]
      } ${disabled ? 'cursor-not-allowed' : null} ${className}`}
    >
      {icon}
      {text && <span>{text}</span>}
      {children}
    </div>
  );

  return tooltip ? (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={200} disableHoverableContent>
        <Tooltip.Trigger asChild>{baseTrigger}</Tooltip.Trigger>
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
    baseTrigger
  );
};
