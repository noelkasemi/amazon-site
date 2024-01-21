import { Popover, Transition } from "@headlessui/react";

export default function Tooltip({
  buttonChildren,
  children,
  buttonStyle,
  onClick,
  panelStyle,
  onMouseEnter,
  onMouseLeave,
  show,
}) {
  return (
    <Popover className="relative">
      <Popover.Button
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`outline-none ${buttonStyle}`}
      >
        {buttonChildren}
      </Popover.Button>
      <Transition
        show={show}
        as="div"
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel static className={`${panelStyle} `}>
          {children}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}