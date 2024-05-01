import { useEffect, useRef, useState } from "react";

const usePopup = () => {
  let enterTimeout: any, leaveTimeout: any;
  const timeoutDuration = 400;
  const buttonRef = useRef(null);

  const onClose = (open: boolean, close: () => void) => {
    if (enterTimeout) clearTimeout(enterTimeout);
    leaveTimeout = setTimeout(() => {
      if (!open) clearTimeout(leaveTimeout);
      close();
    }, timeoutDuration);
  };
  const onOpen = (open: boolean) => {
    if (leaveTimeout) clearTimeout(leaveTimeout);
    enterTimeout = setTimeout(() => {
      if (!open)
        //@ts-ignore
        buttonRef?.current?.click();
    }, timeoutDuration);
  };
  return { buttonRef, onClose, onOpen };
};
export default usePopup;

