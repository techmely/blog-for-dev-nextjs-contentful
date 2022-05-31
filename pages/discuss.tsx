import React from "react";
import Layout from "../components/Layout/Layout.component";
// import Seo from '../component/seo';

import DiscussSection from "../components/Discuss/Discuss.component";
import Sidebar from "../components/Sidebar/Sidebar.component";
export default function Discuss() {
  return (
    <Layout>
      {/* <Seo titleSample={true} title="Discuss" /> */}
      <DiscussSection />
      <Sidebar />
    </Layout>
  );
}
