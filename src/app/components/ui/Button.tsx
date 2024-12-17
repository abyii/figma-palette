import React from 'react';

const Button: React.FC<JSX.IntrinsicElements['button']> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={
        'px-2 py-1 font-semibold text-xs cursor-pointer rounded-full transition-colors duration-200' + ' ' + className
      }
    >
      {children}
    </button>
  );
};

export default Button;
