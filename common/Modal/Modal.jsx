import {
  forwardRef,
  useImperativeHandle,
  Fragment,
  cloneElement,
  useState,
} from "react";
import PropTypes from "prop-types";
import { Dialog, Transition } from "@headlessui/react";

const Modal = forwardRef(({ title, subtext, trigger, children }, ref) => {
  let [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  useImperativeHandle(ref, () => ({
    close: () => {
      setIsOpen(false);
    },
  }));

  return (
    <>
      {cloneElement(trigger, {
        onClick: handleOpen,
      })}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="z-20 fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="z-30 fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-6 text-left align-middle shadow-xl transition-all">
                  {title && (
                    <Dialog.Title className="text-black dark:text-white text-lg">
                      {title}
                    </Dialog.Title>
                  )}
                  {subtext && (
                    <Dialog.Description className="text-black dark:text-white text-sm">
                      {subtext}
                    </Dialog.Description>
                  )}
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
});

Modal.displayName = "Modal";

const { string, element } = PropTypes;
Modal.propTypes = {
  title: string,
  subtext: string,
  trigger: element.isRequired,
};

export default Modal;
