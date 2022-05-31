import { GetStaticProps } from "next";
import React from "react";
import Bio from "../components/Bio/Bio.component";
import Layout from "../components/Layout/Layout.component";
import { client } from "../contentful/utils";
// import Seo from '../component/seo';

export default function creator({ author }) {
  //   console.log(author);
  const { items } = author;
  const {
    fields: {
      avatar: {
        fields: {
          file: { url },
        },
      },
    },
  } = items[0];
  return (
    <Layout>
      {/* <Seo titleSample={true} title="About Author" /> */}
      <Bio photo={url} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const entry = await client.getEntries({ content_type: "author", limit: 1 });
  // console.log(entry);

  return { props: { author: entry } };
};
