import React, { Component, PureComponent, useState, useEffect } from "react";

export default function Browse() {
  const [page, setPage] = useState(1);
  const [gallery_content, setGallery] = useState([]);
  console.log("yo");

  const setNextPage = () => {
    setPage(page + 1);
  };

  const setPrevPage = () => {
    setPage(page - 1);
  };

  const setNewPage = new_page => {
    setPage(new_page);
  };

  return (
    <div style={{ backgroundColor: "white", fontColor: "black" }}>
      <div>{page}</div>
      <div>Next Page</div>
      <div>Prev Page</div>
    </div>
  );
}
