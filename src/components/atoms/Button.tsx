import clsx from "clsx";

type ButtonProps = Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick" | "id" | "type"
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
  type = "button",
  ...props
}) => (
  <button
    className={clsx(
      "btn",
      {
        "btn-primary": variant === "primary",
        "btn-secondary": variant === "secondary",
        "btn-tertiary": variant === "tertiary",
        "btn-info": variant === "info",
        "btn-success": variant === "success",
        "btn-warning": variant === "warning",
        "btn-error": variant === "error",
        "btn-glass": variant === "glass",
        "btn-ghost": variant === "ghost",
      },
      {
        "btn-sm": size === "sm",
        "btn-md": size === "md",
        "btn-xs": size === "xs",
        "btn-wide": size === "wide",
        "btn-block": size === "block",
      },
      { "btn-outline": outline },
      { "btn-circle": circle },
      { "btn-disabled": disabled },
      { "btn-loading": loading },
      spacing !== undefined && {
        "gap-0": spacing === 0,
        "gap-1": spacing === 1,
        "gap-2": spacing === 2,
        "gap-3": spacing === 3,
        "gap-4": spacing === 4,
      }
    )}
    disabled={disabled}
    id={id}
    type={type}
    {...props}
  >
    {children}
  </button>
);

export default Button;
