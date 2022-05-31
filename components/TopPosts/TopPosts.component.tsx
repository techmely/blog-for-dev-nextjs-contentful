import React, { useEffect, useState } from "react";
import Link from "next/link";
import Style from "./TopPosts.module.scss";
import PostStyle from "../Post/Post.module.scss";
import { client } from "../../contentful/utils";
import { Post } from "../../context/state";
// import TextAds from '../GAdsense/TextAds';

export default function TopPosts() {
  const [topPosts, setTopPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const entries = await client.getEntries({
        content_type: "blogPost",
        limit: 5,
        "fields.highlight": true,
      });

      if (entries?.items?.length) {
        const posts = entries.items?.map((post: any) => {
          return post?.fields;
        });
        const post: Post = entries.items[0]?.fields as Post;

        setTopPosts(posts);
      }
    };
    fetch();
  }, []);

  return (
    <div className={Style["top-posts"]}>
      {topPosts?.map((post, i) => {
        if (i === 0 || i === 3) {
          return [
            // <TextAds key={post.id + i} className="post cnt" />,
            <article
              key={i}
              className={`${Style.post} ${Style.cnt} ${PostStyle.post}`}
            >
              <h3 className={`${PostStyle.title} ${Style.title}`}>
                <Link href={`/${post.url}/`}>{post.title}</Link>
              </h3>
            </article>,
          ];
        }
        return (
          <article
            key={i}
            className={`${Style.post} ${Style.cnt} ${PostStyle.post}`}
          >
            <h3 className={`${PostStyle.title} ${Style.title}`}>
              <Link href={`/${post.url}/`}>{post.title}</Link>
            </h3>
          </article>
        );
      })}
    </div>
  );
}
