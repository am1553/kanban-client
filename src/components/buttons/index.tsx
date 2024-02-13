interface BtnProps {
  onClick?: () => void;
  children?: JSX.Element;
  type?: "button" | "submit" | "reset";
  size?: "large" | "medium" | "small";
  disabled?: boolean;
}

export const PrimaryBtn = (props: BtnProps) => {
  const { onClick, children, type = "button", size, disabled } = props;
  const height =
    size === "small" ? "32px" : size === "medium" ? "40px" : "48px";
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full rounded-full bg-main-purple text-white capitalize text-m hover:bg-main-purple-hover transition-colors`}
      style={{ height }}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const SecondaryBtn = (props: BtnProps) => {
  const { onClick, children, type = "button" } = props;

  return (
    <button
      onClick={onClick}
      type={type}
      className="w-full h-10 rounded-full bg-main-purple bg-opacity-10 hover:bg-opacity-25 text-main-purple transition-colors text-m"
    >
      {children}
    </button>
  );
};

export const DestructiveBtn = (props: BtnProps) => {
  const { onClick, children, type = "button" } = props;

  return (
    <button
      onClick={onClick}
      type={type}
      className="w-full h-10 rounded-full bg-red hover:bg-red-hover transition-colors text-white text-m"
    >
      {children}
    </button>
  );
};

export const ToggleBtn = ({
  onClick,
  position,
}: {
  onClick: () => void;
  position: "left" | "right";
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-main-purple h-5 w-10 rounded-full relative"
    >
      <div
        className={`h-[14px] w-[14px] rounded-full bg-white absolute top-2/4 -translate-y-2/4 transition-transform ${
          position === "left" ? "translate-x-[4px]" : "translate-x-[22px]"
        }`}
      ></div>
    </button>
  );
};
