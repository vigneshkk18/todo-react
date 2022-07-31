import classes from "./IconButton.module.css";

interface IconButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: any;
}

const IconButton = ({ className, children, ...restProps }: IconButtonProps) => {
  return (
    <button
      className={`${classes["icon-button"]} ${className ?? ""}`}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default IconButton;
