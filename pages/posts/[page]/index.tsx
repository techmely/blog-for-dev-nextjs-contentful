import { GetStaticPaths, GetStaticProps } from "next";
import React, { useContext } from "react";
import InfoHeader from "../../../components/InfoHeader/InfoHeader.component";
import Layout from "../../../components/Layout/Layout.component";
import Pagination from "../../../components/Pagination/Pagination.component";
import PostComponent from "../../../components/Post/Post.component";
import { client, Posts } from "../../../contentful/utils";
import Style from "./Posts.module.scss";
import PostStyle from "../../../components/Post/Post.module.scss";
import { PostsContext } from "../../../context/state";
import Sidebar from "../../../components/Sidebar/Sidebar.component";

export default function PostsPage({
  posts,
  currentPage,
  numPages,
}: {
  posts: Posts;
  currentPage: number;
  numPages: number;
}) {
  const recentPosts = useContext(PostsContext);

  return (
    <Layout>
      <div className={Style["article-section"]}>
        <div className={Style["article-section__main"]}>
          <InfoHeader title="Posts" />
          <Pagination currentPage={currentPage} numPages={numPages} />
          <div className={Style.posts}>
            {posts.items.map((data, i) => {
              const { fields: post } = data;
              return (
                <PostComponent
                  className={PostStyle["default-style"]}
                  key={i}
                  post={post}
                />
              );
            })}
          </div>
          <Pagination currentPage={currentPage} numPages={numPages} />
        </div>
      </div>

      <Sidebar recentPosts={recentPosts} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await client.getEntries<Posts>({
    content_type: "blogPost",
    limit: 10,
  });

  const numPages = Math.ceil(entries.total / entries.limit);
  const paths = Array.from({ length: numPages }).map((_, i) => {
    const currentPage = i + 1;
    return {
      params: { page: currentPage.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { page: currentPage } = params;
  const page = currentPage.toString();
  const skip = (parseInt(page) - 1) * 10;
  const entries = await client.getEntries<Posts>({
    content_type: "blogPost",
    limit: 10,
    skip,
  });
  const numPages = Math.ceil(entries.total / entries.limit);

  return {
    props: {
      posts: entries,
      currentPage: parseInt(page),
      numPages,
    },
  };
};
