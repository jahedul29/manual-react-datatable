import React, { useState } from "react";
import { Table } from "react-bootstrap";

const Datatable = ({ data }) => {
  const columns = data[0] && Object.keys(data[0]);

  return (
    <Table striped hover>
      <thead>{data[0] && columns.map((column) => <th>{column}</th>)}</thead>
      <tbody>
        {data[0] &&
          data.map((details) => (
            <tr>
              {columns.map((column) => (
                <td>{details[column]}</td>
              ))}
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default Datatable;
