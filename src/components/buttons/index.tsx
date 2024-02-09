interface BtnProps {
  onClick?: () => void;
  children?: JSX.Element;
  type?: "button" | "submit" | "reset";
  size?: "large" | "small";
}

export const PrimaryBtn = (props: BtnProps) => {
  const { onClick, children, type = "button", size } = props;
  const height = size === "small" ? "40px" : "48px";
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full rounded-full bg-main-purple text-white capitalize text-m hover:bg-main-purple-hover transition-colors`}
      style={{ height }}
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
