import React from "react";
import style from "./Styles/CardInfo.module.css";

export default function CardInfo({ children }) {
  return (
    <div className={style.cardInfo}>
      <div className={style.cardHeader}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={style.cardBody}>{children}</div>
    </div>
  );
}
