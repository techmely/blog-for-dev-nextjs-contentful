import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import AuthorComponent from "../../components/Author/Author.component";
import Layout from "../../components/Layout/Layout.component";
import Sidebar from "../../components/Sidebar/Sidebar.component";
import { fetchEntries, fetchEntry } from "../../contentful/utils";
import { Posts } from "../../contentful/utils";
import Style from "./blogPost.module.scss";
import { Post, PostsContext } from "../../context/state";
import html from "remark-html";
import prism from "remark-prism";
import { remark } from "remark";

const Blog = ({ postData }: { postData: Posts }) => {
  const { title, video, tags, date, tableOfContents, contentPost, author } =
    postData.items[0].fields;

  const posts = useContext<Post[]>(PostsContext);

  const [content, setContent] = useState(contentPost);

  useEffect(() => {
    let data = contentPost.replace(
      /<a href/g,
      `<a target="_blank" class="link" href`
    );

    const imgReg = /<img.+alt="video-box">/g;
    const videoArr = data.match(imgReg);
    if (videoArr) {
      videoArr.forEach((video) => {
        const srcReg = /src=".+webm"/;
        const src = video.match(srcReg);
        const videoStr = `<video class="vd-content" controls><source ${src}></video>`;
        data = data.replace(/<img.+alt="video-box">/, videoStr);
      });
    }

    remark()
      // .use(prism)
      .use(html)
      .process(data)
      .then((data) => {
        setContent(data.toString());
      });
  }, [contentPost]);

  return (
    <Layout TOC={tableOfContents}>
      <div className={Style["content-article"]}>
        {video && (
          <div className={Style["video-wrapper"]}>
            <div className={Style.content}>
              <iframe
                title="Watch video"
                width="100%"
                height="523"
                src={`https://www.youtube.com/embed/${video}?rel=0`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={Style["video-iframe"]}
              ></iframe>
            </div>
          </div>
        )}
        <div className={Style["content-article__main"]}>
          {/* <HorizontalBanner /> */}
          <div className={Style["content-header"]}>
            <div className={Style["post-info"]}>
              <div className={Style.tags}>
                {tags?.map((tag) => (
                  <Link key={tag.sys.id} href={`/tags/${tag.fields.url}/`}>
                    {tag.fields.url}
                  </Link>
                ))}
              </div>
              <h1 className={Style["post-title"]}>{title}</h1>
              <div className={Style["post-description"]}>
                <Link href="/creator/">
                  <a className="author">{author?.fields?.name}</a>
                </Link>
                <span className="datetime">{date}</span>
              </div>
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        </div>
        <AuthorComponent author={author} />
      </div>
      <Sidebar recentPosts={posts} hideTags={true} />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await fetchEntries("blogPost", 1000);

  const paths = entries.items.map((entry) => {
    return {
      params: { blog: entry.fields.url },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params.blog.toString();
  const entry: Posts = await fetchEntry(id);
  return {
    props: { postData: entry },
  };
};

export default Blog;
