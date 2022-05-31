import React from "react";
import Layout from "../components/Layout/Layout.component";
import TagSection from "../components/Tag/TagSection.component";
import { GetStaticProps } from "next";
import { client, Tags } from "../contentful/utils";
import { Tag } from "../context/state";

export default function TagsPage({ tags }) {
  return (
    <Layout>
      <TagSection tags={tags} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const entries: Tags = await client.getEntries({
    content_type: "tag",
    limit: 20,
  });

  const tags: Tag[] = entries.items.map((tag): Tag => {
    return {
      fields: { name: tag.fields.name, url: tag.fields.url },
      sys: { id: tag.sys.id },
    };
  });

  return { props: { tags } };
};
