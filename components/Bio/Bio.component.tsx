import React from "react";
import Style from "./Bio.module.scss";
import Image from "next/image";

type Bio = {
  photo: string;
};
export default function Bio({ photo }: Bio) {
  return (
    <section className={Style["bio-section"]}>
      <div className={Style.profile}>
        {photo && (
          <div className={Style["profile-image"]}>
            <Image src={"https:" + photo} layout="fill" alt="techmely" />
          </div>
        )}

        <div className={Style.summary}>
          <h1 className={Style.title}>
            <span role="img" aria-label="fire">
              🔥
            </span>{" "}
            Bio
          </h1>
          <p>
            <span role="img" aria-label="smile">
              😁😁
            </span>
            Hi, I&apos;m @thaycacac. Một người thích chia sẻ kiến thức, đặc biệt
            là về Front-end 🚀.
          </p>
          <div className={Style["social-box"]}>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.youtube.com/techmely"
            >
              Youtube
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.facebook.com/techmely/"
            >
              Facebook
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/techmely"
            >
              Github
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
