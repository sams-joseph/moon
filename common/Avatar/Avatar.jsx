import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { coinsSelectors } from "@moon/features/Coins/coinsSlice";
import clsx from "clsx";

const Avatar = ({ symbol, height, width, gutterRight }) => {
  const meta = useSelector((state) => coinsSelectors.selectById(state, symbol));

  const classNames = clsx(
    "relative rounded-full bg-white border border-white",
    `h-${height} w-${width}`,
    gutterRight && "mr-4"
  );

  return (
    <div className={classNames}>
      {meta && (
        <Image
          src={meta.logo}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt="profile"
          className="rounded-full"
        />
      )}
    </div>
  );
};

Avatar.defaultProps = {
  height: "8",
  width: "8",
};

export default Avatar;
