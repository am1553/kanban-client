import React, { SetStateAction, useState } from "react";
type ThemeContextProviderProps = {
  children: JSX.Element;
};

type Theme = "light" | "dark";
export type ThemeValues = {
  theme: Theme;
  setTheme: React.Dispatch<SetStateAction<Theme>>;
  toggleTheme: () => void;
};

const defaultThemeContext: ThemeValues = {
  theme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
};

export const ThemeContext = React.createContext<ThemeValues>(
  defaultThemeContext!
);

export default function ThemeContextProvider({
  children,
}: ThemeContextProviderProps) {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const values: ThemeValues = {
    theme,
    setTheme,
    toggleTheme,
  };
  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
}
