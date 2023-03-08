/* eslint-disable @next/next/no-img-element */
import { PlusCircleIcon } from "@heroicons/react/24/solid";

import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import type { ControllerRenderProps, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

import Image from "next/image";

const NestedImageInput = ({
  field: { onChange, name, value },
}: {
  field: ControllerRenderProps<FieldValues, string>;
}) => {
  const [image, setImage] = useState<string | undefined>(undefined);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result as string);
      };

      onChange(file);
    }
  };

  useEffect(() => {
    if (value && typeof value === "string") {
      setImage(value);
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center">
      <label
        htmlFor={name}
        className="relative flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded bg-gray-100"
      >
        {image ? (
          <Image
            src={image}
            alt="avatar"
            className="overflow-hidden rounded object-cover"
            fill
          />
        ) : (
          <PlusCircleIcon className="text-primary-500 h-24 w-24" />
        )}
        <input
          id={name}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

type ImageInputProp = {
  name: string;
};

function ImageInput({ name }: ImageInputProp) {
  return <Controller render={NestedImageInput} name={name} />;
}

export default ImageInput;
