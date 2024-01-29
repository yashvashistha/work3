import React from "react";
import { Link } from "react-router-dom";
import "./Pagination.css";

export default function Pagination({
  postsPerPage,
  totalPosts,
  currentpage,
  paginate,
}) {
  const checkfunc = (selectedpage) => {
    if (
      selectedpage >= 1 &&
      selectedpage <= Math.ceil(totalPosts / postsPerPage)
    ) {
      paginate(selectedpage);
    }
  };
  return (
    <div className="pagination">
      {/* <div
        onClick={() => {
          checkfunc(1);
        }}
      >
        <span>First</span>
      </div> */}
      <div
        onClick={() => {
          checkfunc(currentpage - 1);
        }}
      >
        <sapn>Previous</sapn>
      </div>
      <div
        onClick={() => {
          checkfunc(currentpage);
        }}
      >
        <span>{currentpage}</span>
      </div>
      <div
        onClick={() => {
          checkfunc(currentpage + 1);
        }}
      >
        <sapn>Next</sapn>
      </div>
      {/* <div
        onClick={() => {
          checkfunc(Math.ceil(totalPosts / postsPerPage));
        }}
      >
        <span>Last</span>
      </div> */}
    </div>
  );
}
