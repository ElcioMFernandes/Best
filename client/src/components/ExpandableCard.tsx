import { useState } from "react";

interface ExpandableCardProps {
  resumedContent: React.ReactNode;
  expandedContent: React.ReactNode;
}

const ExpandableCard = ({
  resumedContent,
  expandedContent,
}: ExpandableCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className="p-4 w-full rounded-md
      bg-transparent shadow-md
    dark:bg-stone-700 dark:shadow-2xl"
    >
      <div className="flex items-center justify-between select-none">
        <div className="flex flex-grow justify-around" onClick={toggleExpand}>
          {resumedContent}
        </div>
        <svg
          onClick={toggleExpand}
          className={`w-6 h-6 text-gray-800 dark:text-white cursor-pointer transform transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 9-7 7-7-7"
          />
        </svg>
      </div>
      {isExpanded && (
        <div className="mt-4 border-t border-stone-600 pt-4">
          {expandedContent}
        </div>
      )}
    </div>
  );
};

export default ExpandableCard;
