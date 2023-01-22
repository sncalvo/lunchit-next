import clsx from "clsx";

type ButtonProps = Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick" | "id"
> & {
  children: React.ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "glass"
    | "ghost";
  outline?: boolean;
  size?: "sm" | "md" | "xs" | "wide" | "block";
  disabled?: boolean;
  circle?: boolean;
  spacing?: 0 | 1 | 2 | 3 | 4;
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  id,
  variant = "primary",
  outline = false,
  size = "md",
  disabled = false,
  circle = false,
  spacing,
  loading = false,
  ...props
}) => (
  <button
    className={clsx(
      "btn",
      `btn-${variant}`,
      `btn-${size}`,
      { "btn-outline": outline },
      { "btn-circle": circle },
      { "btn-disabled": disabled },
      { "btn-loading": loading },
      spacing !== undefined && `gap-${spacing}`
    )}
    disabled={disabled}
    id={id}
    {...props}
  >
    {children}
  </button>
);

export default Button;
