"use client";

import CheckedIcon from "@/images/checkbox_checked.svg";
import UncheckedIcon from "@/images/checkbox_unchecked.svg";
import { cn } from "@/utils/classnames";
import { createContext, useContext, useState, useEffect } from "react";

const CategoryContext = createContext<{
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}>({ selectedCategory: "", setSelectedCategory: () => {} });

type CategoryButtonProps = {
  categories: string[];
  defaultCategory?: string;
  selectedCategory?: string; // 외부에서 상태 변경 가능하게 prop 추가
  setSelectedCategory?: (category: string) => void;
  children: React.ReactNode;
  className?: string;
  setValue?: (value: string) => void;
  onChange?: (value: string) => void;
};

export default function CategoryButton({
  categories,
  defaultCategory,
  selectedCategory: externalSelectedCategory,
  setSelectedCategory: externalSetSelectedCategory,
  children,
  setValue,
  onChange,
  className,
}: CategoryButtonProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory ?? categories[0]);

  useEffect(() => {
    if (externalSelectedCategory !== undefined) {
      setSelectedCategory(externalSelectedCategory); // 외부에서 변경되면 반영
    }
  }, [externalSelectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    externalSetSelectedCategory?.(category);
    setValue?.(category);
    onChange?.(category);
  };

  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory: handleCategoryChange }}>
      <div className={cn("flex flex-wrap gap-3", className)}>{children}</div>
    </CategoryContext.Provider>
  );
}

// CategoryButton.Title 텍스트만 표시
CategoryButton.Title = function Title({ category }: { category: string }) {
  const { selectedCategory, setSelectedCategory } = useContext(CategoryContext);

  return (
    <button
      onClick={() => {
        setSelectedCategory(category);
      }}
      className={`h-10 w-auto rounded-xl border p-2.5 px-4 text-sm font-medium ${selectedCategory === category ? "bg-gray-900 text-white" : "bg-gray-200"}`}
    >
      {category}
    </button>
  );
};

type CheckboxProps = {
  category: string;
  label?: string; // 보여질 라벨(한글)
  subText: string;
};

CategoryButton.Checkbox = function Checkbox({ category, label, subText }: CheckboxProps) {
  const { selectedCategory, setSelectedCategory } = useContext(CategoryContext);
  const isSelected = selectedCategory === subText;

  return (
    <button
      type="button"
      onClick={() => {
        if (isSelected) {
          setSelectedCategory("");
        } else {
          setSelectedCategory(subText);
        }
      }}
      className={`flex h-[70px] flex-col items-start justify-center rounded-lg border p-2.5 px-4 text-sm font-medium ${
        isSelected ? "bg-gray-900 text-white" : "bg-gray-200"
      }`}
    >
      <div className="flex items-center gap-2">
        {isSelected ? <CheckedIcon /> : <UncheckedIcon />}
        <div className="flex flex-col p-1">
          <span className="justify-start font-bold">{category}</span>

          <span className={`text-xs ${isSelected ? "bg-gray-900 text-white" : "bg-gray-200"}`}>
            {subText ? (label === "워케이션" ? "" : label) : ""}
          </span>
        </div>
      </div>
    </button>
  );
};
