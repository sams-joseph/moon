import React, { useMemo } from "react";
import Avatar from "@moon/common/Avatar";

const AvatarGroup = ({ symbols, max }) => {
  const remaining = useMemo(() => {
    const numAvatars = symbols.length;
    if (numAvatars > max) {
      return numAvatars - max;
    } else {
      return 0;
    }
  }, [symbols, max]);

  return (
    <div className="flex -space-x-4">
      {symbols.slice(0, max).map((symbol, index) => (
        <Avatar key={index} symbol={symbol} />
      ))}
      {remaining > 0 && (
        <div className="relative inline-block">
          <div
            className={`w-8 h-8 rounded-full border border-slate-500 dark:border-white bg-slate-300 dark:bg-slate-700 flex items-center justify-center text-xs`}
          >
            + {remaining}
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
