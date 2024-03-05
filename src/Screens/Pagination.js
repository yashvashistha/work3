import React from "react";

export default function Pagination({
  postsPerPage,
  totalPosts,
  currentpage,
  paginate,
  cssstyle,
  text,
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
    <div className="Pagination" style={cssstyle}>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ textWrap: "wrap" }}>{text}</p>
      </div>
      <div className="paginationbtn">
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
