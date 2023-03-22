interface Props {
  active: boolean;
  text: string;
  onClick?: () => void;
}

export default function Card({ active, text, onClick }: Props) {
  return (
    <button
      className={`m-2 rounded-md border-2 border-primary/40 px-3 py-2 text-left transition-colors dark:text-white ${
        active ? 'bg-primary/40' : 'bg-primary/10'
      }`}
      onClick={onClick}
    >
      <p className="text-xl font-bold">{text}</p>
    </button>
  );
}
