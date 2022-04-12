import Header from './components/Header.jsx';
import DataList from './components/DataList.jsx';
// import MapDisplay from './components/MapDisplay.jsx';
import './App.css';
import { useState } from 'react';
import PopupExample from './components/MapLeaflet.jsx';

function App() {
  const [startYear, setStartYear] = useState(1880);
  const [endYear, setEndYear] = useState(2022);
  const [meteoriteData, setMeteroriteData] = useState([]);
  return (
    <div className='App'>
      <Header
        startYear={startYear}
        endYear={endYear}
        setStartYear={setStartYear}
        setEndYear={setEndYear}
      />
      {/* <MapDisplay meteoriteData={meteoriteData} /> */}
      <PopupExample />
      <DataList
        startYear={startYear}
        endYear={endYear}
        meteoriteData={meteoriteData}
        setMeteroriteData={setMeteroriteData}
      />
    </div>
  );
}

export default App;
