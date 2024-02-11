function AuthLayout({ children }: { children: JSX.Element }) {
  return (
    <div className="h-full w-full flex items-center justify-center">
      {children}
    </div>
  );
}

export default AuthLayout;
