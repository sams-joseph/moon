import Image from "next/image";
import React from "react";
import flameIcon from "@moon/assets/images/flame--icon.png";
import { useSelector } from "react-redux";
import Wallet from "@moon/features/Wallet";
import profits from "@moon/assets/images/profits--icon.png";
import SignupModal from "@moon/features/Auth/components/SignupModal";

const Aside = (props) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="w-[290px] xl:w-[350px] hidden lg:flex flex-col h-screen sticky top-0 bottom-0">
      {user ? (
        <Wallet user={user} />
      ) : (
        <div className="p-4 flex-1">
          <div className="p-4 rounded-lg bg-slate-200 dark:bg-slate-800 flex flex-col items-center">
            <div className="relative h-20 w-20 mb-8">
              <Image
                src={profits}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                alt="profile"
              />
            </div>
            <p className="mb-8">
              Signup now to start tracking your coins and transactions
            </p>
            <SignupModal />
          </div>
        </div>
      )}
      <footer className="px-4 py-8">
        <p className="text-sm">Attributions</p>
        <a
          className="block text-xs text-black/50 dark:text-white/50 underline"
          href="https://www.flaticon.com/free-icons/growth"
          title="growth icons"
        >
          Growth icons created by Freepik - Flaticon
        </a>
        <a
          className="block text-xs text-black/50 dark:text-white/50 underline"
          href="https://www.flaticon.com/free-icons/flames"
          title="flames icons"
        >
          Flames icons created by Flat Icons - Flaticon
        </a>
        <a
          className="block text-xs text-black/50 dark:text-white/50 underline"
          href="https://www.flaticon.com/free-icons/decrease"
          title="decrease icons"
        >
          Decrease icons created by Arzu C. - Flaticon
        </a>
        <a
          className="block text-xs text-black/50 dark:text-white/50 underline"
          href="https://www.flaticon.com/free-icons/increase"
          title="increase icons"
        >
          Increase icons created by Arzu C. - Flaticon
        </a>
        <a
          className="block text-xs text-black/50 dark:text-white/50 underline"
          href="https://www.flaticon.com/free-icons/money"
          title="money icons"
        >
          Money icons created by Freepik - Flaticon
        </a>
      </footer>
    </div>
  );
};

export default Aside;
