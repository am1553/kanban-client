import { useContext } from "react";
import { ThemeContext, ThemeValues } from "../context/theme";

export default function useTheme(): ThemeValues {
  const { theme, setTheme, toggleTheme } = useContext(ThemeContext);

  return { theme, setTheme, toggleTheme };
}
