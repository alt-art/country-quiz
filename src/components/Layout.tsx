import Header from './Header';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100vh-5.3rem)] flex-col items-center justify-center">
        {children}
      </main>
    </>
  );
}
