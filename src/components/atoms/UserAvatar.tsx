import clsx from "clsx";
import Image from "next/image";

import Me from "../../../public/images/me.png";

type Props = {
  src?: string | null;
  alt: string;
  size?: "xxs" | "xs" | "sm" | "md" | "lg";
};

const UserAvatar: React.FC<Props> = ({ src, alt, size = "md" }) => {
  return (
    <div className="avatar">
      <div
        className={clsx("mask mask-hexagon relative", {
          "w-8": size === "xxs",
          "w-16": size === "xs",
          "w-24": size === "sm",
          "w-32": size === "md",
          "w-40": size === "lg",
        })}
      >
        <Image
          src={src || Me}
          alt={alt}
          fill
          sizes="100%"
          style={{
            objectFit: "cover",
            backgroundColor: "white",
          }}
          placeholder="blur"
        />
      </div>
    </div>
  );
};

export default UserAvatar;
