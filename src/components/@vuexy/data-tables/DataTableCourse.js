import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import DataTable from "react-data-table-component";

const DataTableCourse = ({ ...props }) => {
  const { course } = props;

  const [state, setState] = useState({
    columns: [
      {
        name: "No.",
        selector: "number",
        sortable: true,
        maxWidth: "50px",
        cell: (row, i) => (
          <div className="">
            <p className="text-bold-500 mb-0">{++i}</p>
          </div>
        ),
      },
      {
        name: "Kode Pelajaran",
        selector: "course_code",
        sortable: true,
        cell: (row) => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="d-flex flex-column">
              <p className="text-bold-500 text-truncate mb-0">
                {row.course_code}
              </p>
            </div>
          </div>
        ),
      },
      {
        name: "Nama Pelajaran",
        selector: "course_name",
        sortable: true,
        cell: (row) => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="d-flex flex-column">
              <p className="text-bold-500 text-truncate mb-0">
                {row.course_name}
              </p>
            </div>
          </div>
        ),
      },
      {
        name: "Jenjang",
        selector: "stages",
        sortable: true,
        cell: (row) => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="d-flex flex-column">
              <p className="text-bold-500 text-truncate mb-0">{row.stages}</p>
            </div>
          </div>
        ),
      },
      {
        name: "Status",
        selector: "status",
        sortable: true,
        cell: (row) => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            {row.status}
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
      return { ...state, data: course };
    });
  }, [course]);

  let { data, columns } = state;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Data Pelajaran</CardTitle>
        </CardHeader>
        <CardBody className="rdt_Wrapper">
          <DataTable
            className="dataTable-custom"
            data={data}
            columns={columns}
            noHeader
            noDataComponent={data.length < 1 ? "Data tidak ditemukan" : null}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default DataTableCourse;
