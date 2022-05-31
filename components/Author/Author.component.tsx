import React from "react";
import Style from "./Author.module.scss";
import Image from "next/image";
import { Author } from "../../context/state";

type AuthorProps = Author;

export default function AuthorComponent({ author }: { author: AuthorProps }) {
  return (
    <div className={Style["author-content"]}>
      <div className={Style["about-author"]}>
        {author?.fields?.avatar?.fields?.file?.url && (
          <div className={Style["info-author"]}>
            <Image
              src={"https:" + author?.fields?.avatar?.fields?.file?.url}
              layout="fill"
              alt={author.fields.name}
            />
          </div>
        )}
        <div className={Style.summary}>
          <div className={Style["summary__title"]}>About Me</div>
          <p>
            Hi, I&apos;m <b className={Style.nickname}>{author.fields.name}</b>.
            Một người thích chia sẻ kiến thức, đặc biệt là về&nbsp;
            <b className={Style["frontend-text"]}>Frontend</b> 🚀. Trang web này
            được tạo ra nhằm giúp các bạn học&nbsp;
            <b className={Style["frontend-text"]}>Frontend</b>&nbsp;hiệu quả hơn
            🎉😄.
          </p>
          <p>Chúc các bạn tìm được kiến thức hữu ích trong blog này 😁😁.</p>
        </div>
      </div>
    </div>
  );
}
