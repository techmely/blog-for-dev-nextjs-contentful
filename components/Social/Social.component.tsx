import React from "react";
import Style from "./social.module.scss";
import Youtube from "../../public/svg/youtube";
import Github from "../../public/svg/github";
import Facebook from "../../public/svg/facebook";

function Social() {
  return (
    <div className={Style["social-box"]}>
      <ul className={Style.socials}>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.youtube.com/techmely"
          className={Style.social}
        >
          <Youtube />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.facebook.com/techmely/"
          className={Style.social}
        >
          <Facebook />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/techmely"
          className={Style.social}
        >
          <Github />
        </a>
      </ul>
    </div>
  );
}

export default Social;
