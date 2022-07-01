import React from "react";
import Sidebar from "@moon/common/Sidebar";
import Aside from "@moon/common/Aside";

const Layout = ({ children }) => {
  return (
    <div className="bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white min-h-screen flex">
      <Sidebar />
      <main className="flex grow-[2] md:grow shrink w-full sm:w-auto relative">
        {children}
        <Aside />
      </main>
    </div>
  );
};

export default Layout;
