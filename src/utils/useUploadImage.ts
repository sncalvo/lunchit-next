import { useCallback } from "react";

type Mutation = (values: {
  key: string;
}) => Promise<{ url: string; fields: { key: string } }>;

const useUploadImage = (mutation: Mutation) => {
  const uploadImage = useCallback(
    async (data: { image?: File | string }) => {
      if (data.image === undefined || typeof data.image === "string") {
        delete data.image;
        return;
      }

      const file = data.image;
      const { url, fields } = await mutation({
        key: "menu-variants",
      });
      const imageData = {
        ...fields,
        "Content-Type": file.type,
        file,
      };

      const formData = new FormData();
      for (const key in imageData) {
        formData.append(key, imageData[key as keyof typeof imageData]);
      }

      await fetch(url, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });

      data.image = url + "/" + fields.key;
    },
    [mutation]
  );

  return uploadImage;
};

export default useUploadImage;
