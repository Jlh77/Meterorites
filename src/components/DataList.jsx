import { useState, useEffect } from "react";

const DataList = ({ startYear, endYear, setMeteroriteData, meteoriteData }) => {
  useEffect(() => {
    fetch(
      `https://data.nasa.gov/resource/gh4g-9sfh.json?$where=year between '${startYear}-01-10T12:00:00' and '${endYear}-01-10T14:00:00' and fall='Fell' order by year asc`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMeteroriteData(data);
      });
  }, [startYear, endYear]);

  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Place</th>
            <th>Year</th>
            <th>Mass(kg)</th>
          </tr>
        </thead>
        <tbody>
          {meteoriteData.map((meterorite) => {
            const year = new Date(meterorite.year);
            const mass = meterorite.mass ? meterorite.mass / 1000 : "Unknown";
            return (
              <tr key={meterorite.id}>
                <td>{meterorite.name}</td>
                <td>{year.getFullYear()}</td>
                <td>{mass}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default DataList;
