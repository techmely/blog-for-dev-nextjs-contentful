import React from "react";
import Link from "next/link";
import Image from "next/image";
import Youtube from "../../public/svg/youtube";
import { Post } from "../../context/state";
import Style from "./Post.module.scss";

type PostProps = {
  post: Post;
  hideDescription?: boolean;
  className?: string;
};
export default function PostComponent({
  post,
  hideDescription = false,
  className = "",
}: PostProps) {
  const { title, tags, description, image, url, video: videoLink } = post;

  return (
    <article className={`${Style.post} ${className}`}>
      {image && (
        <Link href={`/${url}/`}>
          <a className={Style["image-wrapper"]}>
            {videoLink && <Youtube className={Style["tag-video"]} />}
            {image?.fields?.file?.url && (
              <Image
                src={"https:" + image?.fields?.file?.url}
                alt={title}
                layout="fill"
                objectFit="cover"
              />
            )}
          </a>
        </Link>
      )}

      <div className={Style.content}>
        <div className={Style.tags}>
          {tags?.map((tag) => (
            <Link key={tag.sys.id} href={`/categories/${tag.fields.url}/`}>
              <a className={Style.tag}>{tag.fields.url}</a>
            </Link>
          ))}
        </div>
        <h3 className={Style.title}>
          <Link href={`/${url}/`}>
            <a className="truncate">{title}</a>
          </Link>
        </h3>
        {!hideDescription && (
          <span className={Style.summary + " truncate"}>{description}</span>
        )}
      </div>
    </article>
  );
}
