import { Header, Sidebar } from "./components";

function AppLayout({ children }: { children: JSX.Element }) {
  return (
    <div className="md:grid grid-cols-[auto_1fr] h-full">
      <Sidebar />
      <div className="flex flex-col h-full overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-auto">{children}</main>
      </div>
    </div>
  );
}

export default AppLayout;
