import React, { useEffect, useState } from "react";
import {
  CurrencyDollarIcon,
  MoonIcon,
  SparklesIcon,
  SunIcon,
} from "@heroicons/react/solid";
import Image from "next/image";

import logo from "@moon/assets/images/logo--icon.png";
import ActiveLink from "@moon/common/ActiveLink";
import Menu from "./components/Menu";
import { Switch } from "@headlessui/react";

const ROUTES = [
  {
    id: "watchlists",
    href: "/",
    icon: <SparklesIcon className="opacity-70 h-6 w-6" />,
    label: "Watchlists",
    activeClassName:
      "bg-gradient-to-r from-purple-700 to-yellow-300 text-white",
  },
  {
    id: "coins",
    href: "/coins",
    icon: <CurrencyDollarIcon className="opacity-70 h-6 w-6" />,
    label: "Coins",
    activeClassName:
      "bg-gradient-to-r from-purple-700 to-yellow-300 text-white",
  },
];

const Sidebar = (props) => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (localStorage) {
      setTheme(localStorage.getItem("color-theme"));
    }
  }, []);

  const handleToggleTheme = () => {
    if (localStorage.getItem("color-theme") === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
      setTheme("dark");
    }
  };

  return (
    <header className="grow flex justify-end relative">
      <div className="w-[68px] sm:w-[88px] xl:w-[275px] flex flex-col relative">
        <div className="w-[68px] sm:w-[88px] xl:w-[275px] flex flex-col fixed h-full top-0">
          <div className="flex flex-col xl:flex-row items-center justify-between">
            <div className="py-4 px-2 xl:px-4 flex justify-center xl:justify-start">
              <div className="relative h-12 w-12 sm:h-14 sm:w-14">
                <Image
                  src={logo}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  alt="profile"
                />
              </div>
            </div>
            <div className="p-1 xl:p-4 flex justify-center xl:justify-start">
              <Switch
                checked={theme === "dark"}
                onChange={handleToggleTheme}
                className="bg-slate-200 dark:bg-slate-600 relative inline-flex h-[24px] w-[52px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                <span className="sr-only">Change Theme</span>
                <span
                  aria-hidden="true"
                  className={`${
                    theme === "dark" ? "translate-x-7" : "translate-x-0"
                  }
      pointer-events-none h-[20px] w-[20px] transform rounded-full bg-purple-600 dark:bg-white shadow-lg ring-0 transition duration-200 ease-in-out inline-flex items-center justify-center`}
                >
                  {theme === "dark" ? (
                    <MoonIcon className="h-4 w-4 text-purple-600" />
                  ) : (
                    <SunIcon className="h-4 w-4 text-white" />
                  )}
                </span>
              </Switch>
            </div>
          </div>
          <nav className="p-4 mt-8 flex-1">
            <ul>
              {ROUTES.map((route) => (
                <li key={route.id}>
                  <ActiveLink
                    activeClassName={route.activeClassName}
                    href={route.href}
                  >
                    <a className="mb-4 p-1 sm:p-2 rounded-lg flex items-center justify-center xl:justify-start">
                      {route.icon}
                      <span className="hidden xl:block ml-4">
                        {route.label}
                      </span>
                    </a>
                  </ActiveLink>
                </li>
              ))}
            </ul>
          </nav>
          <Menu />
        </div>
      </div>
    </header>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
