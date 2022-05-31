import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Style from "./categories.module.scss";
import Layout from "../../components/Layout/Layout.component";
import Sidebar from "../../components/Sidebar/Sidebar.component";
import InfoHeader from "../../components/InfoHeader/InfoHeader.component";
import PostComponent from "../../components/Post/Post.component";
import { client, Posts, Tags } from "../../contentful/utils";
import { Post } from "../../context/state";

export default function CategoriesPage({
  entries,
  category,
}: {
  entries: Posts;
  category: Tags;
}) {
  const nameTag = category.items[0].fields.name;
  const posts = entries.items.map((post): Post => {
    const { title, url, date, description, tags } = post.fields;
    return { title, url, date, description, tags };
  });

  return (
    <Layout>
      {/* <Seo title={nameTag} /> */}
      <div className={Style["category-section"]}>
        <div className={Style.wrapper}>
          <InfoHeader title={nameTag} subtitle="TAGGED POSTS" />
          <div className={Style.posts}>
            {posts.map((post, i) => (
              <PostComponent className={Style.post} key={i} post={post} />
            ))}
          </div>
        </div>
      </div>
      <Sidebar hideTags={true} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const entries: Tags = await client.getEntries({ content_type: "category" });

  const paths = entries.items.map((category) => {
    return {
      params: { category: category.fields.url },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category: Tags = await client.getEntries({
    content_type: "tag",
    "fields.url": params.category,
    limit: 1,
  });
  const entries: Posts = await client.getEntries({
    links_to_entry: category.items[0].sys.id,
    content_type: "posts",
  });

  return { props: { entries, category } };
};
