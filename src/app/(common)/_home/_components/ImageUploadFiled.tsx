import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import Button from "@/components/Button";
import { FormDataType } from "../_hooks/useCreateGathering";

type ImageUploadFieldProps = {
  setValue: UseFormSetValue<FormDataType>;
};

export default function ImageUploadField({ setValue }: ImageUploadFieldProps) {
  const [imageName, setImageName] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageName(file.name);
      setValue("image", file, { shouldValidate: true });
    }
  };

  return (
    <div className="my-3">
      <label className="mb-3 text-base font-semibold">이미지</label>
      <div className="flex">
        <div className="w-full rounded-xl bg-gray-50 px-4 py-2.5 text-sm text-gray-400">
          {imageName || "이미지를 첨부해주세요."}
        </div>
        <input type="file" id="imageUpload" className="hidden" accept=".jpg,.jpeg,.png" onChange={handleImageChange} />
        <Button
          type="button"
          styleType="outline"
          size="sm"
          className="ml-3 w-24"
          onClick={() => document.getElementById("imageUpload")?.click()}
        >
          파일 첨부
        </Button>
      </div>
    </div>
  );
}
