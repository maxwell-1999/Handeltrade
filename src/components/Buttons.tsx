import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
}

const PrimaryBtn: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={twMerge(
        'bg-brand text-md font-bold text-white min-w-full py-[10px] rounded-[10px] shrink-0',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
const SecondaryBtn: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={twMerge(
        ' bg-lightBrand text-md font-bold text-brand  py-[10px] rounded-[10px] shrink-0',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export { PrimaryBtn, SecondaryBtn };
