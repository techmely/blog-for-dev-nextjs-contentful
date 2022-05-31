import React from "react";
import Style from "./Discuss.module.scss";
import { BsFillLockFill } from "react-icons/bs";
import Image from "next/image";
export default function DiscussSection() {
  return (
    <section className={Style["discuss-section"]}>
      <h1 className={Style["header-title"]}>
        Các bạn có thể thảo luận các vấn đề về Front-end tại group này{" "}
        <span role="img" aria-label="smile">
          😁
        </span>
      </h1>
      <div className={Style["group-info"]}>
        <div className={Style.image}>
          <a
            href="https://www.facebook.com/groups/congdongfrontend.techmely"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              loading="lazy"
              src="https://www.facebook.com/images/groups/groups-default-cover-photo-2x.png"
              alt="https://www.facebook.com/groups/congdongfrontend.techmely"
              className="thumbnail-group"
              layout="fill"
            />
          </a>
        </div>
        <div className={Style["footer-content"]}>
          <div className={Style.group}>
            <div className={Style.name}>
              <h1>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.facebook.com/groups/congdongfrontend.techmely"
                >
                  TechMely - Hi Front-end <br /> Developer
                </a>
                <span role="img" aria-label="rocket">
                  🚀
                </span>{" "}
              </h1>
            </div>
            <div className="icon">
              <BsFillLockFill />
              <span>Nhóm riêng tư</span>
            </div>
          </div>
          <div className={Style["join-link"]}>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.facebook.com/groups/congdongfrontend.techmely"
            >
              <h2>
                Join{" "}
                <span role="img" aria-label="fire">
                  🔥
                </span>
              </h2>
            </a>
          </div>
        </div>
      </div>
      {/* end group */}
      <div className={Style["page-info"]}>
        <p>
          Ngoài ra, mình có lập một{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.facebook.com/techmely/"
            className="link"
          >
            Page
          </a>{" "}
          nho nhỏ về front-end{" "}
          <span role="img" aria-label="smile">
            😁
          </span>
          .
        </p>
        <p>
          Các bạn có thể like page để theo dõi các bài tutorial hay về Front-end
          nhé{" "}
          <span role="img" aria-label="fire">
            🔥
          </span>
        </p>
      </div>
    </section>
  );
}
