import React from 'react';

const Button: React.FC<JSX.IntrinsicElements['button']> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={
        className + ' ' + 'px-3 py-1 font-semibold text-xs cursor-pointer rounded-full transition-colors duration-200'
      }
    >
      {children}
    </button>
  );
};

export default Button;
