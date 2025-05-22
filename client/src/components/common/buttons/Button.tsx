import type { ButtonType } from "../../../types/components/common/buttons";
import { cn } from "../../../utils";

const Button = ({ content, className, func, type }: ButtonType) => {
  return (
    <button
      onClick={() => func && func()}
      type={type || "button"}
      className={cn("py-2 bg-orange rounded-md px-4 text-white font-semibold", className)}
    >
      {content}
    </button>
  );
};

export default Button;
