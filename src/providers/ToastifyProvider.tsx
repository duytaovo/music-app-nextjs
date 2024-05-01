"use client";
import { Zoom, ToastContainer } from "react-toastify";
interface ToastProviderProps {
  children: React.ReactNode;
}
const ToastifyProvider = ({ children }: ToastProviderProps) => {
  return (
    <>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={1000}
        closeOnClick
        theme="light"
        transition={Zoom}
        draggable={false}
        limit={2}
        pauseOnFocusLoss={false}
        style={{ fontSize: "14px" }}
      />
    </>
  );
};
export default ToastifyProvider;

