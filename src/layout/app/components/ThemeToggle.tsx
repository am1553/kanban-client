import { useTheme } from "../../../hooks";
import { DarkTheme, LightTheme } from "../../../assets";
import { ToggleBtn } from "../../../components/buttons";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`h-12 w-full  rounded-md flex items-center justify-center gap-4 ${
        theme === "light" ? "bg-light-grey-bg" : "bg-very-dark-grey"
      }`}
    >
      <img src={LightTheme} alt="" />
      <ToggleBtn
        onClick={toggleTheme}
        position={theme === "light" ? "left" : "right"}
      />
      <img src={DarkTheme} alt="" />
    </div>
  );
}

export default ThemeToggle;
