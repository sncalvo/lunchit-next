import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  type?: "regular" | "image-full" | "card-side";
  background?: string;
  pulse?: boolean;
};

function Card({
  children,
  type = "regular",
  background = "bg-base-100",
  pulse = false,
}: Props) {
  return (
    <div
      className={clsx(`card ${type} ${background} shadow-xl`, {
        "animate-pulse": pulse,
      })}
    >
      {children}
    </div>
  );
}

export default Card;
