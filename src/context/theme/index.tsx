import React, { useState } from "react";

type ThemeContextProviderProps = {
  children: JSX.Element;
};

export const ThemeContext = React.createContext(null);

export default function ThemeContextProvider({
  children,
}: ThemeContextProviderProps) {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  return <ThemeContext.Provider value={null}>{children}</ThemeContext.Provider>;
}
