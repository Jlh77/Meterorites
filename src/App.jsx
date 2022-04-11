import Header from "./components/Header.jsx";
import DataList from "./components/DataList.jsx";
import "./App.css";
import { useState } from "react";

function App() {
  const [startYear, setStartYear] = useState(1880);
  const [endYear, setEndYear] = useState(2022);
  return (
    <div className="App">
      <Header
        startYear={startYear}
        endYear={endYear}
        setStartYear={setStartYear}
        setEndYear={setEndYear}
      />
      <DataList startYear={startYear} endYear={endYear} />
    </div>
  );
}

export default App;
