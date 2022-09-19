import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import AuthorComponent from "../../components/Author/Author.component";
import Layout from "../../components/Layout/Layout.component";
import Sidebar from "../../components/Sidebar/Sidebar.component";
import { fetchEntries, fetchEntry } from "../../contentful/utils";
import { Posts } from "../../contentful/utils";
import Style from "./blogPost.module.scss";
import {Post, PostsContext} from "../../context/state";
import Toc from "../../components/TOC/TOC.component";
import {Remarkable} from 'remarkable';
import {addIDToAllMarkdownHeaders} from 'remarkable-auto-heading-links';
import hljs from 'highlight.js';
import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "../../components/Loading/Loading.component";

export type HeadingInfo = {
  id: string,
  text: string,
  level: number
}

const Blog = () => {
  const router = useRouter();
  const {data, error} = useSWR(router.query.blog, fetchEntry);
  const {title, tags, date, contentPost, author, url} = data?.items[0].fields || {};
  const posts = useContext<Post[]>(PostsContext);
  const [content, setContent] = useState(null);
  const [tableOfContents, setTableOfContents] = useState<HeadingInfo[]>([]);

  const dateDisplay = new Date(date);

  useEffect(() => {
    const test = new Remarkable({
      highlight: function (str, lang) {
        try {
          if (lang && hljs.getLanguage(lang)) return hljs.highlight(lang, str).value;
          return hljs.highlightAuto(str).value;
        } catch (err) {
          return '';
        }
      }
    }).use(addIDToAllMarkdownHeaders);
    setContent(test.render(contentPost));
  }, [contentPost]);

  useEffect(() => {
    if (!content || !data) return;
    const contentContainer = document.getElementById("content-container");
    if (contentContainer) {
      const headings = Array.from(contentContainer.querySelectorAll("h1, h2, h3, h4, h5, h6"))
        .filter((element) => element.id)
        .map((element) => ({
          id: element.id,
          text: element.textContent ?? "",
          level: Number(element.tagName.substring(1))
        }));

      // Open external links in new tab
      let allLinks = contentContainer.querySelectorAll('a');
      for (let i = 0; i < allLinks.length; i++){
        let a = allLinks[i];
        if(a.hostname != location.hostname) {
          a.rel = 'noopener';
          a.target = '_blank';
        }
      }
      setTableOfContents(headings);
    }
  }, [content]);

  return (
    <Layout>
      { !data ? <Loading/> :
        <React.Fragment>
          <Toc content={tableOfContents} />
          <div className={Style["content-article"]}>
            <div className={Style["content-article__main"]}>
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
                    <span className="datetime">{dateDisplay?.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div dangerouslySetInnerHTML={{ __html: content }} id={"content-container"}/>
            </div>

            <AuthorComponent author={author} />
          </div>
        </React.Fragment>
      }
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
