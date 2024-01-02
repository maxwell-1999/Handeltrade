import React from 'react';

const PrimeText: React.FC<{
  children: React.ReactNode;
  classname?: string;
  style?: any;
}> = ({ children, classname, style }) => {
  return (
    <span
      className={`${classname}`}
      style={{
        fontFamily: 'Poppins',
        fontSize: '14px',
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
