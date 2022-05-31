import React, { useEffect, useState } from "react";
import Style from "./TagSection.module.scss";
import InfoHeader from "../InfoHeader/InfoHeader.component";
import TagComponent from "./Tag.component";
import { Tag } from "../../context/state";

type TagProps = {
  tags: Tag[];
};
export default function TagSection({ tags }: TagProps) {
  const [rand, setRand] = useState([]);
  function random() {
    return Math.floor(Math.random() * 3) + 1;
  }

  useEffect(() => {
    const size = [];
    tags.forEach((_) => {
      size.push("tag-" + random());
      setRand(size);
    });
  }, [tags]);

  return (
    <section className={Style["tag-section"]}>
      <InfoHeader title={"Tags"} />
      <ul className="tags tag-page">
        {tags?.map((tag, i) => (
          <li key={tag.sys.id}>
            <TagComponent tag={tag} className={Style[`${rand[i]}`]} />
          </li>
        ))}
      </ul>
    </section>
  );
}
