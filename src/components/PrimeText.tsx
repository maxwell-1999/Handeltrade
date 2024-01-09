import React from 'react';

const PrimeText: React.FC<{
  children: React.ReactNode;
  classname?: string;
  style?: any;
}> = ({ children, classname, style }) => {
  return (
    <span
      className={`text-[14px] ${classname}`}
      style={{
        fontFamily: 'Poppins',
        lineHeight: '21px',
        letterSpacing: '0em',
        textAlign: 'left',
        ...style,
      }}
    >
      {children}
    </span>
  );
};

export default PrimeText;
