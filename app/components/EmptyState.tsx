"use client";

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./buttons/Button";

interface EmptyStateProps {
  title?: string;
  subTitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches",
  subTitle = "Try changing or removing some of your filters.",
  showReset
}) => {
  const router = useRouter();
  return (
    <div
      className="
        h-[60vh]
        flex 
        flex-col 
        gap-2
        items-center
        justify-center
      "
    >
      <Heading center title={title} subtitle={subTitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            onClick={() => router.push("/")}
            outline
            actionLabel="Remove all filters"
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
