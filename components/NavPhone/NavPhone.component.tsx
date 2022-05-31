import React, { useState } from "react";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { HiHome } from "react-icons/hi";
import { BsCardText, BsTag, BsChatQuote } from "react-icons/bs";
import { IoLogoJavascript } from "react-icons/io";
import Style from "./NavPhone.module.scss";

export default function NavPhone() {
  const [isOpen, showMenu] = useState(false);

  const handleShowMenu = () => {
    showMenu(!isOpen);
  };
  return (
    <>
      <div className={Style["nav-phone"]}>
        <div className={Style["nav-button"]}>
          <FiMenu onClick={handleShowMenu} />
        </div>
      </div>
      <div
        role="presentation"
        className={
          isOpen
            ? `${Style["wrapper-menu"]} active`
            : `${Style["wrapper-menu"]}`
        }
        onClick={handleShowMenu}
      >
        <div className={Style["nav-list"]}>
          <div className={Style["header-nav"]}>
            <span>TECHMELY</span>
          </div>
          <ul>
            <li className={Style["nav-item"]}>
              <Link href="/">
                <a className={Style.item}>
                  <HiHome />
                  <span className={Style.tag}>Home</span>
                </a>
              </Link>
            </li>
            <li className={Style["nav-item"]}>
              <Link href="/posts/1">
                <a className={Style.item}>
                  <BsCardText />
                  <span className={Style.tag}>Posts</span>
                </a>
              </Link>
            </li>
            <li className={Style["nav-item"]}>
              <Link href="/javascript-projects-for-beginners/">
                <a className={Style.item}>
                  <IoLogoJavascript />
                  <span className={Style.tag}>30 days of JavaScript</span>
                </a>
              </Link>
            </li>
            <li className={Style["nav-item"]}>
              <Link href="/tags">
                <a className={Style.item}>
                  <BsTag />
                  <span className={Style.tag}>Tags</span>
                </a>
              </Link>
            </li>
            <li className={Style["nav-item"]}>
              <Link href="/discuss">
                <a className={Style.item}>
                  <BsChatQuote />
                  <span className={Style.tag}>Discuss</span>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
