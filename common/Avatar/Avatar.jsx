import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { coinsSelectors } from "@moon/features/Coins/coinsSlice";

const Avatar = ({ symbol }) => {
  const meta = useSelector((state) => coinsSelectors.selectById(state, symbol));

  return (
    <div className="relative h-8 w-8 rounded-full">
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

export default Avatar;
