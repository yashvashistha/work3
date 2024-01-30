import React from "react";
import { Link } from "react-router-dom";
import "./Pagination.css";

export default function Pagination({
  postsPerPage,
  totalPosts,
  currentpage,
  indexoffirstrow,
  indexoflastrow,
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
    <div
      style={{
        width: "100%",
        height: "10%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <p style={{ textWrap: "wrap" }}>
          Showing {indexoffirstrow + 1} to{" "}
          {indexoflastrow > totalPosts ? totalPosts : indexoflastrow} of total{" "}
          {totalPosts} entries
        </p>
      </div>
      <div className="pagination">
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
      </div>
    </div>
  );
}
