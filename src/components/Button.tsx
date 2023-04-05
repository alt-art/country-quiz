import { HTMLProps } from 'react';

function Button({ children, ...props }: HTMLProps<HTMLButtonElement>) {
  return (
    <button
      {...props}
      type="button"
      className="m-2 flex w-fit items-center justify-center rounded-md bg-secondary p-2 text-white transition-colors hover:bg-secondary-dark active:bg-opacity-40 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  );
}

export default Button;
