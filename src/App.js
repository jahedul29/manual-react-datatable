import "./App.css";
import { useEffect, useState } from "react";
import { Container, Form, FormControl } from "react-bootstrap";
import Datatable from "./Datatable/Datatable";

function App() {
  const [loadedData, setLoadedDate] = useState([]);
  const [query, setQuery] = useState("");
  const [searchColumn, setSearchColumn] = useState([]);
  const [maxPageIndex, setMaxPageIndex] = useState(1);

  useEffect(() => {
    fetch("https://devmentor.live/api/examples/contacts.json?api_key=c59a746f")
      .then((res) => res.json())
      .then((data) => {
        setLoadedDate(data);
      });
  }, []);

  const searchQuery = (rows) => {
    if (searchColumn.length === 0) {
      return rows;
    }
    return rows.filter((row) =>
      searchColumn.some((column) => {
        return (
          row[column].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        );
      })
    );
  };

  const checkboxChange = (e) => {
    setSearchColumn((columns) =>
      e.target.checked
        ? [...searchColumn, e.target.name]
        : searchColumn.filter((sc) => sc !== e.target.name)
    );
  };

  return (
    <Container fluid>
      <h3 className="text-center text-info my-3">React DataTable</h3>
      <div className="w-25 float-left my-4">
        <Form>
          <Form.Control
            value={query}
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          ></Form.Control>
        </Form>
      </div>
      <div className="w-75 text-center float-right my-4">
        <Form>
          <Form.Check
            inline
            name="firstName"
            type="checkbox"
            label="First Name"
            onChange={checkboxChange}
          />
          <Form.Check
            inline
            name="emailAddress"
            type="checkbox"
            label="Email"
            onChange={checkboxChange}
          />
          <Form.Check
            inline
            name="phoneNumber"
            type="checkbox"
            label="Phone"
            onChange={checkboxChange}
          />
          <Form.Check
            inline
            name="postalCode"
            type="checkbox"
            label="Postal Code"
            onChange={checkboxChange}
          />
        </Form>
      </div>

      {loadedData && <Datatable data={searchQuery(loadedData)}></Datatable>}
    </Container>
  );
}

export default App;
