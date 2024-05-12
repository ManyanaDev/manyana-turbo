/* eslint-disable no-unused-vars */
import classNames from "classnames";
import { CustomToastContainer } from "./CustomToastContainer";
import { FaExclamationCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { BiCheckCircle } from "react-icons/bi";
import { AxiosError } from "axios";

interface ToastText {
  title: string;
  message: string;
  callback?: Function;
}

export async function toastPromise({
  func,
  pending,
  success,
  error,
}: {
  func: (...args: any[]) => Promise<unknown>;
  pending: ToastText;
  success: ToastText;
  error: ToastText;
}) {
  toast.promise(func, {
    pending: pending.title,
    success: {
      className(props) {
        return classNames("!bg-success", props?.defaultClassName);
      },
      icon() {
        return <BiCheckCircle className="text-white" size={20} />;
      },
      render(props) {
        console.log("props :>> ", props);
        // console.log("success.callback :>> ", success.callback);
        // success.callback?.();

        return (
          <CustomToastContainer
            title={success.title}
            message={success.message}
            {...props}
          />
        );
      },
    },
    error: {
      className(props) {
        return classNames("!bg-error", props?.defaultClassName);
      },
      icon() {
        return <FaExclamationCircle className="text-white" size={20} />;
      },

      render(props) {
        if (props.data instanceof Error) {
          console.log("props.data :>> ", props.data);
          return (
            <CustomToastContainer
              title={error.title}
              message={props.data.message || error.message}
              {...props}
            />
          );
        }
        let message = "Registration failed";

        if (
          typeof props === "object" &&
          "error" in props &&
          props?.error &&
          typeof props.error === "object" &&
          "message" in props.error &&
          typeof props.error.message === "string"
        ) {
          message = props.error.message;
        }

        return (
          <CustomToastContainer
            title={error.title}
            message={message || error.message}
            {...props}
          />
        );
      },
    },
  });
}
