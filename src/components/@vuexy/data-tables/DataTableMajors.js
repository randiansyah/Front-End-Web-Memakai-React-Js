import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import DataTable from "react-data-table-component";

const DataTableMajors = ({ ...props }) => {
  const { datas } = props;

  const [state, setState] = useState({
    columns: [
      {
        name: "Nama Jurusan",
        selector: "majors",
        minWidth: "200px",
        sortable: true,
        cell: (row) => (
          <div className="d-flex flex-column">
            <p className="text-bold-500 text-truncate mb-0">{row.majors}</p>
          </div>
        ),
      },
    ],
    data: [],
    filteredData: [],
    value: "",
  });

  useEffect(() => {
    setState((state) => {
      return { ...state, data: datas };
    });
  }, [datas]);

  let { data, columns } = state;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Data Jurusan</CardTitle>
        </CardHeader>
        <CardBody className="rdt_Wrapper">
          <DataTable
            className="dataTable-custom"
            data={data}
            columns={columns}
            noDataComponent={data.length < 1 ? "Data tidak ditemukan" : null}
            pagination
          />
        </CardBody>
      </Card>
    </>
  );
};

export default DataTableMajors;
