import { HTMLProps } from 'react';

function Button({ children, ...props }: HTMLProps<HTMLButtonElement>) {
  return (
    <button
      {...props}
      type="button"
      className="m-2 flex items-center justify-center rounded-md bg-second p-2 text-white transition-colors hover:bg-second-dark active:bg-opacity-40"
    >
      {children}
    </button>
  );
}

export default Button;
