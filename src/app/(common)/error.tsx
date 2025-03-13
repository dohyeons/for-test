"use client";

import { useEffect } from "react";
import Button from "@/components/Button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[70vh] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-mono-8">페이지를 찾을 수 없습니다!</h2>
        <Button styleType={"outline"} onClick={() => reset()} className="w-[120px]">
          다시 시도하기
        </Button>
      </div>
    </div>
  );
}
