import React from "react";
import About from "../components/About/About.component";
import Layout from "../components/Layout/Layout.component";
// import Seo from "../component/seo";
import Sidebar from "../components/Sidebar/Sidebar.component";
export default function about() {
  return (
    <Layout>
      {/* <Seo titleSample={true} title="About" /> */}
      <About />
      <Sidebar />
    </Layout>
  );
}
