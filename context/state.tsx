import React, { useState } from "react";
import { fetchEntries } from "../contentful/utils";

// type Posts = {};

export type Tag = {
  fields: { name: string; url: string };
  sys: { id: string };
};

type Image = { fields: { file: { fileName: string; url: string } } };
export type Author = {
  fields: {
    name: string;
    url: string;
    avatar: {
      fields: {
        file: {
          url: string;
        };
      };
    };
  };
};

export type Post = {
  date: string;
  url: string;
  title: string;
  description: string;
  tags: Tag[];
  image?: Image;
  video?: string;
  contentPost?: string;
  author?: Author;
  tableOfContents?: string;
};
export const PostsContext = React.createContext<Post[]>([]);
export default function AppWrapper({ children }) {
  const [posts, setPosts] = useState<Post[]>([]);

  React.useEffect(() => {
    const fetch = async () => {
      const entries = await fetchEntries("blogPost", 9);

      if (entries.items.length) {
        const dataPosts = entries.items.map(({ fields }): Post => {
          const {
            date,
            url,
            title,
            description,
            tags: rawTags,
            image: rawImage,
          } = fields;

          const tags = rawTags?.map((item): Tag => {
            const {
              fields: { name, url },
              sys: { id },
            } = item;

            return { fields: { name, url }, sys: { id } };
          });

          return {
            date,
            url,
            title,
            description,
            tags,
            image: {
              fields: {
                file: {
                  fileName: rawImage?.fields?.file?.fileName,
                  url: rawImage?.fields?.file?.url,
                },
              },
            },
          };
        });
        setPosts(dataPosts);
      }
    };
    fetch();
  }, []);

  return (
    <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
  );
}
