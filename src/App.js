import React, { useEffect, useState } from "react";
import { createMemo } from "utils/utils";
import Header from "components/Header";
import Table from "components/Table";
import "./App.css";

function App() {
  const [blocksMemo, setBlocksMemo] = useState([]);
  useEffect(() => {
    setBlocksMemo(createMemo());
  }, []);
  return (
    <div data-testid="app" className="App">
      <Header />
      <Table blocks={blocksMemo} />
    </div>
  );
}

export default App;
