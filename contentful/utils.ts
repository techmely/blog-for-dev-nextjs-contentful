import { createClient, EntryCollection } from "contentful";
import { Post, Tag } from "../context/state";

const space: string = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken: string = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
export const client = createClient({ space, accessToken });

export type Posts = {
  items: { fields: Post }[];
  total: number;
};

export type Categories = {
  items: { fields: any }[];
  total: number;
};
export type Tags = { items: Tag[] };

export async function fetchEntries(
  content_type: string,
  limit: number
): Promise<Posts> {
  const entries: Posts = await client.getEntries({
    content_type,
    limit,
  });

  return entries;
  // if (entries.items) return entries.items;
}

export async function fetchEntry(id: string) {
  const entry: Posts = await client.getEntries({
    content_type: "blogPost",
    "fields.url[match]": id,
    limit: 1,
  });
  return entry;
}
