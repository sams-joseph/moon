import React, { useState } from "react";
import { usePopper } from "react-popper";
import { CogIcon, LogoutIcon, UserCircleIcon } from "@heroicons/react/solid";
import { LoginIcon } from "@heroicons/react/outline";
import { Popover } from "@headlessui/react";
import { useRouter } from "next/router";

const Menu = (props) => {
  const user = null;
  const router = useRouter();
  const [referenceElement, setReferenceElement] = useState();
  const [popperElement, setPopperElement] = useState();
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "top-start",
    modifiers: [{ name: "offset", options: { offset: [0, 20] } }],
  });

  const handleLogout = () => {
    router.push("/auth");
    logout();
  };

  return (
    <footer className="p-2 xl:p-4 flex items-center justify-center xl:justify-start mb-4">
      {user ? (
        <>
          <Popover className="xl:w-full">
            {({ open }) => (
              <>
                <Popover.Button
                  ref={setReferenceElement}
                  className={`${
                    open ? "" : "text-opacity-90"
                  } xl:w-full justify-center xl:justify-start group flex flex-1 items-center bg-slate-200 dark:bg-slate-800 rounded-full p-2 text-base font-medium hover:text-opacity-100 focus:outline-none`}
                >
                  {user ? (
                    <>
                      <UserCircleIcon className="h-8 w-8" />
                      <div className="hidden xl:block ml-2">
                        {user?.displayName}
                      </div>
                    </>
                  ) : (
                    <>
                      <CogIcon className="h-8 w-8 p-1" />
                      <div className="hidden xl:block ml-2">Settings</div>
                    </>
                  )}
                </Popover.Button>
                <Popover.Panel
                  ref={setPopperElement}
                  style={styles.popper}
                  {...attributes.popper}
                >
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="bg-white dark:bg-slate-700 w-[200px] p-2">
                      {user ? (
                        <>
                          <button
                            className="w-full text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors p-2 rounded-full flex items-center"
                            onClick={handleLogout}
                          >
                            <LogoutIcon className="h-6 w-6 mr-4 text-slate-400" />
                            Sign out
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="w-full text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors p-2 rounded-full flex items-center"
                            onClick={handleLogout}
                          >
                            <LoginIcon className="h-6 w-6 mr-4 text-slate-400" />
                            Sign In
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </Popover.Panel>
              </>
            )}
          </Popover>
        </>
      ) : (
        <button className="w-full text-left bg-purple-700 hover:bg-purple-800 transition-colors py-2 px-4 rounded-full flex items-center mb-8 text-white">
          <LoginIcon className="h-6 w-6 mr-4 text-white/75" />
          Sign In
        </button>
      )}
    </footer>
  );
};

Menu.propTypes = {};

export default Menu;
