import React, { memo } from "react";
import Style from "./InfoHeader.module.scss";

type InfoHeaderProps = {
  title: string;
  subtitle?: string;
};
export default memo(InfoHeader);
function InfoHeader({ title, subtitle }: InfoHeaderProps) {
  const element = subtitle && <span>{subtitle}</span>;
  return (
    <header className={Style["header-content"]}>
      <div className={Style["header-content__info"]}>
        <h1>
          {element} {title}
        </h1>
      </div>
    </header>
  );
}
