import React from "react";
import Sidebar from "@moon/common/Sidebar";
import Aside from "@moon/common/Aside";
import Flash from "@moon/features/Flash";

const Layout = ({ children }) => {
  return (
    <>
      <div className="bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white min-h-screen flex">
        <Sidebar />
        <main className="flex grow-[2] md:grow shrink w-full sm:w-auto relative">
          <div className="w-full sm:w-[600px] border-x border-slate-300 dark:border-slate-700 min-h-full">
            <Flash />
            {children}
          </div>
          <Aside />
        </main>
      </div>
    </>
  );
};

export default Layout;
