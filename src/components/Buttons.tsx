import { ReactNode } from 'react';
import toast from 'react-hot-toast';
import { twJoin, twMerge } from 'tailwind-merge';

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
        `${
          !disable ? 'bg-brand' : 'bg-[grey]  cursor-not-allowed'
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
const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  className,
  disable,
  ...props
}) => {
  console.log(`Buttons-disable: `, disable);

  return (
    <button
      className={twJoin(
        `${
          !disable ? 'bg-brand' : 'bg-[grey]  cursor-not-allowed'
        } text-f10 px-2 py-1 font-bold text-white  rounded-[5px] `,
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
const UnderlineButton: React.FC<ButtonProps> = ({
  children,
  className,
  disable,
  ...props
}) => {
  console.log(`Buttons-disable: `, disable);

  return (
    <button
      className={twJoin(` text-brand `, className)}
      {...props}
      onClick={disable ? () => toast(disable) : props.onClick}
      // disabled={disable ? true : false}
    >
      {children}
    </button>
  );
};
const SecondaryButton: React.FC<ButtonProps> = ({
  children,
  className,
  disable,
  ...props
}) => {
  console.log(`Buttons-disable: `, disable);

  return (
    <button
      className={twJoin(
        `${
          !disable ? ' bg-lightBrand' : 'bg-[grey]  cursor-not-allowed'
        } text-f10 px-2 py-1 font-bold outline-none text-brand  rounded-[5px] `,
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
        ' bg-lightBrand text-md font-bold text-brand  py-[10px] rounded-[10px] shrink-0',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export {
  PrimaryBtn,
  UnderlineButton,
  SecondaryBtn,
  PrimaryButton,
  SecondaryButton,
};
