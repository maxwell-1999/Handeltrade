import { ReactNode } from 'react';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
  disable?: string | false;
}
const className = 'bg-brand bg-[grey]';

const PrimaryBtn: React.FC<ButtonProps> = ({
  children,
  className,
  disable,
  ...props
}) => {
  console.log(`Buttons-disable: `, disable);

  return (
    <button
      className={twMerge(
        `${!disable ? 'bg-[#3C32A3]' : 'bg-[grey]  cursor-not-allowed'
        } text-md font-bold text-white min-w-full py-[10px] rounded-[10px] shrink-0`,
        className
      )}
      {...props}
      onClick={disable ? () => toast(disable) : props.onClick}
    // disabled={disable ? true : false}
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
        ' bg-lightBrand text-md font-bold text-[#3C32A3]  py-[10px] rounded-[10px] shrink-0',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export { PrimaryBtn, SecondaryBtn };
