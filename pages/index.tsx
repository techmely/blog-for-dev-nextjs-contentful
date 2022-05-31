import Head from "next/head";
import { useContext } from "react";
import Home from "../components/Home/Home.component";
import Layout from "../components/Layout/Layout.component";
import Sidebar from "../components/Sidebar/Sidebar.component";
import { PostsContext } from "../context/state";

export default function Index() {
  const posts = useContext(PostsContext);

  if (!posts.length) return null;
  return (
    <Layout>
      <Home posts={posts} />
      <Sidebar />
    </Layout>
  );
}
