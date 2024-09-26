import React from "react";
import { Oval } from "react-loader-spinner";
import cx from "classnames";

export const SIZE = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
};

export const VARIANT = {
  CONTAINED: "contained",
  OUTLINED: "outlined",
  TEXT: "text",
};

export const COLOR_SCHEME = {
  PRIMARY: "primary",
  DANGER: "danger",
};

const Button = ({
  onClick,
  size = SIZE.MEDIUM,
  variant = VARIANT.CONTAINED,
  disabled = false,
  isLoading = false,
  icon,
  iconPosition = "left",
  className,
  children,
  title,
  type = "button",
  fluid = false,
  active = false,
  colorScheme = COLOR_SCHEME.PRIMARY,
  ...restProps
}) => {
  const rootClassNames = cx(
    "flex justify-center rounded transition duration-200 px-4 py-2 cursor-pointer",
    {
      "w-full": fluid,
      "opacity-50 cursor-not-allowed": disabled,
      "bg-primary-btn-color text-primary-text-color hover:bg-primary-btn-hover-color":
        variant === VARIANT.CONTAINED && colorScheme === COLOR_SCHEME.PRIMARY,
      "bg-white border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white":
        variant === VARIANT.OUTLINED && colorScheme === COLOR_SCHEME.PRIMARY,
      "text-blue-500 hover:text-blue-600":
        variant === VARIANT.TEXT && colorScheme === COLOR_SCHEME.PRIMARY,
      "bg-red-500 text-white hover:bg-red-600":
        variant === VARIANT.CONTAINED && colorScheme === COLOR_SCHEME.DANGER,
      "bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white":
        variant === VARIANT.OUTLINED && colorScheme === COLOR_SCHEME.DANGER,
      "text-red-500 hover:text-red-600":
        variant === VARIANT.TEXT && colorScheme === COLOR_SCHEME.DANGER,
      "text-gray-400": isLoading || disabled,
    },
    className
  );

  const contentNode = isLoading ? (
    <Oval height={20} width={20} color="#ffffff" ariaLabel="loading" />
  ) : (
    children
  );

  return (
    <button
      className={rootClassNames}
      onClick={onClick}
      disabled={disabled || isLoading}
      title={title || ""}
      type={type}
      {...restProps}
    >
      {iconPosition === "left" && icon && <span className="mr-2">{icon}</span>}
      {contentNode}
      {iconPosition === "right" && icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;
