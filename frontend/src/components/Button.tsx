import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";


type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant? : "default" | "gray";
};

const Button = ({children, variant="default", className, ...props} : ButtonProps) => {
    const baseStyles = "w-full font-semibold py-2 px-4 rounded-md transition";
    const variantStyles = {
        default :  "bg-green-600 hover:bg-green-700 text-white",
        gray : "bg-gray-200 hover:bg-gray-300 text-gray-800",
    };

    return (
     <button
      className={clsx(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button