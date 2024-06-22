import React from "react";
import styles from "./index.module.scss";

const NavFooter: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div>
        <a href="#" target="_blank" rel="noreferrer">
          陈炳翰主页
        </a>
        <span className="gutter">|</span>
        <a href="#" target="_blank" rel="noreferrer">
          陈哥牛逼
        </a>
        <span className="gutter">|</span>
        <a href="#" target="_blank" rel="noreferrer">
          React 通用后端管理系统模板
        </a>
      </div>
      <div>Copyright ©2024 Bug Dancing All Rights Reserved.</div>
    </div>
  );
};

export default NavFooter;
