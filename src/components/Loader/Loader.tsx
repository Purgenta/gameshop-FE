import React from "react";
import style from "./Loader.module.css";
type LoaderProps = {
  className?: string;
};
const Loader = ({ className }: LoaderProps) => {
  return (
    <div className={`${style["spinner-wrapper"]} ${className || ""}`}>
      <div className={style["spinner"]}>
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
