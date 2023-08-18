import React from 'react';

const Button: React.FC<JSX.IntrinsicElements['button']> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={
        'px-2 py-1 bg-zinc-200 hover:bg-zinc-100 text-zinc-800 font-semibold text-sm cursor-pointer rounded-md border border-zinc-300' +
        ' ' +
        className
      }
    >
      {children}
    </button>
  );
};

export default Button;
