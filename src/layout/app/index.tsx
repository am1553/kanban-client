import { Header } from "./components";

function AppLayout({ children }: { children: JSX.Element }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

export default AppLayout;
