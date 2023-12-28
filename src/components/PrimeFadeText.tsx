import React from 'react';

const PrimeFadeText: React.FC<{ children: React.ReactNode; classname?: string; style?: { [key: string]: any; }; }> = ({ children, classname, style }) => {
  return (
    <span className={` text-[#8F95A4] text-[13] font-bold ${classname}`}
      style={{
        fontFamily: "Poppins",
        lineHeight: "21px",
        letterSpacing: "0em",
        textAlign: "left",
        ...style
      }}
    >
      {children}
    </span>
  );
};

export default PrimeFadeText;