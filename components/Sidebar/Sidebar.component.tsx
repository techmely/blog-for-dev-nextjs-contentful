import React, { ReactChild, ReactChildren, useEffect, useState } from "react";
import Style from "./Sidebar.module.scss";
import Link from "next/link";
import TagComponent from "../Tag/Tag.component";
import Image from "next/image";
import { client, Tags } from "../../contentful/utils";
import { Post, Tag } from "../../context/state";
import TopPosts from "../TopPosts/TopPosts.component";
import SubcribeYoutube from "../../public/svg/SubcribeYoutube";

type SidebarProps = {
  children?: ReactChild | ReactChildren;
  hideTags?: boolean;
  recentPosts?: Post[];
};
export default function Sidebar({
  children,
  recentPosts = [],
  hideTags = false,
}: SidebarProps) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const entries: Tags = await client.getEntries({
        content_type: "tag",
        limit: 20,
      });

      if (entries.items.length) {
        const tags = entries.items.map((tag): Tag => {
          return {
            fields: { name: tag.fields.name, url: tag.fields.url },
            sys: { id: tag.sys.id },
          };
        });

        setTags(tags);
      }
    };
    fetch();
  }, []);

  const posts = recentPosts.length ? recentPosts.slice(0, 2) : [];

  return (
    <aside className={Style.sidebar}>
      {posts.length > 0 && (
        <div className={Style.sidebar__item}>
          <div className={Style.sidebar__title}>New posts</div>
          <div className={Style["latest-posts"]}>
            {posts.map((post, id) => {
              const { title, image, url } = post;

              return (
                <article key={id} className={Style.post}>
                  <Link href={`/${url}/`}>
                    {image?.fields?.file?.url && (
                      <a className={Style.image}>
                        <Image
                          src={"https:" + image.fields.file.url}
                          alt={title}
                          className="next-img"
                          layout="fill"
                        />
                      </a>
                    )}
                  </Link>

                  <Link href={`/${url}/`}>
                    <a className={Style.title}>{title}</a>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      )}

      <div className={Style.sidebar__item}>
        <h2 className={`${Style.sidebar__title} line`}>Posts you should read</h2>
        <TopPosts />
      </div>

      {!hideTags && (
        <div className={Style.sidebar__item}>
          <h2 className={`${Style.sidebar__title} line`}>Tags</h2>
          <div className={Style.sidebar__tags}>
            {tags?.map((tag, i) => (
              <TagComponent key={i} tag={tag} />
            ))}
          </div>
        </div>
      )}

      <div className={Style.sidebar__item}>
        <div className={`${Style.sidebar__title} line`}>Youtube channel</div>
        <div className={Style["yt-container"]}>
          <div className={Style["yt-channel"]}>
            <div className={Style["summary"]}>
              Gồm các tutorial về Front-end giúp các bạn học hiệu quả hơn. Đăng
              kí để theo dõi các video mới nhất nhé.
            </div>
            <div className={Style["container"]}>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.youtube.com/c/TechMely?sub_confirmation=1"
              >
                <SubcribeYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={`${Style.sidebar__item} ${Style.sticky}`}>
        {/* <Banner className="ads-wrapper" /> */}
        {children}
      </div>
    </aside>
  );
}
