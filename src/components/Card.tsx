interface Props {
  active: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function Card({ children, active, onClick }: Props) {
  return (
    <button
      className={`m-2 rounded-md px-4 py-3 text-left transition-colors dark:text-white ${
        active ? 'bg-primary/40' : 'bg-primary/10'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
