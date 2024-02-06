import React from "react";
import { JSONEditor } from "react-json-editor-viewer";
import data from "./tempdata.json";

function TempPage() {
  const onJsonChange = (key, value, parent, data) => {
    console.log(key, value, parent, data);
  };
  return (
    <main style={{ overflow: "scroll" }}>
      <h1>Hello</h1>
      <JSONEditor collapsible data={data} onChange={onJsonChange} />
    </main>
  );
}

export default TempPage;
