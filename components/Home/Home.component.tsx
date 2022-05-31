import React from "react";
import Style from "./Home.module.scss";
import Link from "next/link";
import PostComponent from "../Post/Post.component";
import { Post } from "../../context/state";
import PostStyle from "../Post/Post.module.scss";
// import VideoList from "../VideoList/VideoList.component";

type HomeProps = {
  posts: Post[];
};
export default function Home({ posts }: HomeProps) {
  if (!posts) return null;

  const [newPost, ...recentPosts] = posts;

  return (
    <main className="main">
      <div className={Style.homepage}>
        {/* <HorizontalBanner /> */}
        <h2 className={`${Style.title} line"`}>New posts</h2>
        <PostComponent className={PostStyle["default-style"]} post={newPost} />
        {/* <ArticleAds className="article-ads" /> */}

        <h2 className={`${Style.title} line"`}>Recent posts</h2>
        <div className={Style.posts}>
          {recentPosts.map((post, id) => (
            <PostComponent key={id} post={post} className={Style.post} />
          ))}
        </div>

        <div className={Style.button}>
          <Link href="/posts/1">Read more</Link>
        </div>
      </div>
    </main>
  );
}
