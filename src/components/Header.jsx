const Header = ({ startYear, endYear, setStartYear, setEndYear }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value, e.target[1].value);
    setStartYear(e.target[0].value);
    setEndYear(e.target[1].value);
  };

  return (
    <header>
      <h1>Meteorite stuff</h1>
      <p>Input two dates between 1880 and 2022</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="start-year">Start year:</label>
        <input
          type="number"
          name="start-year"
          id="start-year"
          min="1880"
          max="2022"
        />
        <label htmlFor="end-year">End year:</label>
        <input
          type="number"
          name="end-year"
          id="end-year"
          min="1880"
          max="2022"
        />
        <button>Search</button>
      </form>
    </header>
  );
};

export default Header;
