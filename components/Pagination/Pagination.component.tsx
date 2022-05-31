import React, { memo } from "react";
import Style from "./Pagination.module.scss";
import Link from "next/link";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

type PaginationProps = {
  currentPage: number;
  numPages: number;
};
function Pagination({ currentPage, numPages }: PaginationProps) {
  const nextPage = currentPage + 1;
  const prevPage = currentPage - 1;
  return (
    <div className={Style.pagination}>
      {prevPage === 0 ? (
        <span className={Style["prev-page"]}>
          <span className={Style["line-through"]}></span>
          <MdKeyboardArrowLeft />
        </span>
      ) : (
        // <Link href={prevPage === 1 ? `/posts/` : `/posts/${prevPage}`}>
        <Link href={`/posts/${prevPage}`}>
          <a className={Style["prev-page"]}>
            <MdKeyboardArrowLeft />
          </a>
        </Link>
      )}
      <span className={Style["info-page"]}>
        {currentPage} of {numPages}
      </span>
      {nextPage > numPages ? (
        <span className="">That&apos;s all</span>
      ) : (
        <Link href={`/posts/${nextPage}`}>
          <a className={Style["next-page"]}>
            <MdKeyboardArrowRight />
          </a>
        </Link>
      )}
    </div>
  );
}
export default memo(Pagination);
