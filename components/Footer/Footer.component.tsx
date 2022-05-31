import React, { useContext, memo } from "react";
import Style from "./Footer.module.scss";
import Link from "next/link";
import Image from "next/image";
import { PostsContext } from "../../context/state";
const Footer = memo(() => {
  const year = new Date().getFullYear();
  const posts = useContext(PostsContext);

  const recentPosts = posts ? posts.slice(0, 3) : [];

  return (
    <footer className={Style.footer}>
      <div className={Style.container}>
        <div className={Style.col}>
          <div className={Style["footer-top"]}>
            <div className={Style.logo}>
              <h2>TechMely</h2>
            </div>
            <p>Thank for reading my blog!</p>
          </div>
        </div>
        <div className={Style.col}>
          <h2>Contact with me:</h2>
          <p>techmely.creation@gmail.com</p>
          <a
            href="https://www.facebook.com/techmely"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.facebook.com/groups/congdongfrontend.techmely"
          >
            Cộng đồng Frontend
          </a>
        </div>
        <div className={`${Style["recent-post"]} ${Style.col}`}>
          <h2>Recent Post</h2>
          {recentPosts.map((post, i) => {
            return (
              <div key={i}>
                {post.image.fields.file.url && (
                  <Link href={`/${post.url}/`}>
                    <a className={Style["next-img"]}>
                      <Image
                        src={"https:" + post.image.fields.file.url}
                        alt={post.title}
                        layout="fill"
                      />
                    </a>
                  </Link>
                )}
                <Link href={`/${post.url}/`}>
                  <a className={Style.title}>{post.title}</a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className={Style["about-page"]}>
        <div className="text">
          © <span className="year">2020 - {year}</span> TECHMELY. All Rights
          Reserved.
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
