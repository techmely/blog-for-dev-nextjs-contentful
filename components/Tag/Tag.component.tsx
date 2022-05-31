import React from "react";
import Link from "next/link";
import Style from "./Tag.module.scss";
import { Tag } from "../../context/state";

type TagProps = {
  tag: Tag;
  className?: string;
};
export default function TagComponent({ tag, className = "" }: TagProps) {
  return (
    <Link key={tag.sys.id} href={`/tags/${tag.fields.url}/`}>
      <a className={`tag ${Style[`tag-${tag.fields.url}`]} ${className}`}>
        {tag.fields.name}
      </a>
    </Link>
  );
}
