import { useEffect } from "react";
type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearInterval(timer);
  }, [onClose]);

  const toastStyles =
    type === "SUCCESS"
      ? "fixed top-4 right-4 z-50 p-4 rounded-md bg-green-600 text-white max-w-md"
      : "fixed top-4 right-4 z-50 p-4 rounded-md bg-red-600 text-white max-w-md";

  return (
    <div className={toastStyles}>
      <div className="flex justify-center items-center gap-3">
        <span className="text-lg font-semibold">{message}</span>
        <span className="px-1 py-1 text-lg rounded-md hover:bg-gray-500 hover:cursor-pointer" onClick={()=>onClose()}>X</span>
      </div>
    </div>
  );
};
export default Toast;
