"use client";
import { IconType } from "react-icons";

interface CategoryInputProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
            rounded-xl
            border-2
            gap-3
            p-4
            flex
            flex-col
            hover:border-black
            transition
            cursor-pointer
            ${selected ? "border-black" : "border-neutral-200"}
      `}
    >
      <Icon size={24} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
