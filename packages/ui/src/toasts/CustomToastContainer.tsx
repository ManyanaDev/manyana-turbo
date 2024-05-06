import { ToastOptions } from "react-toastify";

export function CustomToastContainer({
  title,
  message,
}: {
  title: string;
  message: string;
} & ToastOptions) {
  return (
    <div>
      <div className="text-lg font-bold">{title}</div>
      <div>{message}</div>
    </div>
  );
}
