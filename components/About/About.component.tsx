import Link from "next/link";
import React from "react";
import Style from "./About.module.scss";
import InfoHeader from "../InfoHeader/InfoHeader.component";
// import HorizontalBanner from "../../component/GAdsense/HorizontalBanner";

export default function About() {
  return (
    <section className={Style["about-section"]}>
      <div className={Style["about-wrapper"]}>
        {/* <HorizontalBanner /> */}
        <InfoHeader title="About" />
        <p>
          <span role="img" aria-label="hand">
            👉
          </span>{" "}
          <b>TechMely</b> là blog{" "}
          <Link href="/creator/">
            <a className="link">mình</a>
          </Link>{" "}
          tạo ra với mong muốn giúp các bạn Front-end developer có thể học
          Front-end dễ dàng hơn{" "}
          <span role="img" aria-label="smile">
            😄
          </span>
          .
        </p>
        <h1>
          TechMely Blog có những nội dung gì ?{" "}
          <span role="img" aria-label="fire">
            🔥🔥
          </span>
        </h1>
        <p>
          Blog này có các kiến thức hay ho về Front-end bao gồm các Tips, Tricks
          hay, các Project Javascript, React để các bạn luyện tập,...
        </p>
        <p>
          Các kiến thức này do mình thực hành và đúc kết lại hy vọng sẽ giúp ích
          cho các bạn.
          <br />
          Mỗi bài viết trong blog mình đều cố gắng xử lí thật trau chuốt về nội
          dung, trong mỗi bài viết sẽ có các hình ảnh minh họa giúp các bạn có
          thể hiểu và theo dõi được nội dung tốt hơn.
        </p>
        <p>
          <span role="img" aria-label="firework">
            🎉
          </span>{" "}
          Ngoài ra, mình có tạo ra các video về Front-end trên kênh{" "}
          <span>
            <a
              target="_blank"
              rel="noreferrer"
              className="link"
              href="https://www.youtube.com/techmely"
            >
              Youtube
            </a>
          </span>{" "}
          giúp các bạn có thêm nguồn nội dung để tham khảo và thực hành.
          <span role="img" aria-label="smileandfire">
            😄🔥
          </span>
        </p>
        <p>
          <span role="img" aria-label="">
            ⚡
          </span>{" "}
          Trang web này có thể xuất hiện quảng cáo ở một số vị trí, vì bài viết
          ở blog này là <b>free</b> nên để duy trì website mình đã đặt quảng cáo
          ở trang này. Mong các bạn thông cảm. <br />
          <b>Chúc các bạn học tập tốt </b>{" "}
          <span role="img" aria-label="firework">
            🎉🎉
          </span>
        </p>
      </div>
    </section>
  );
}
