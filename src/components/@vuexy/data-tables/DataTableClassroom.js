import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Badge,
  Spinner,
  Button,
} from "reactstrap";
import DataTable from "react-data-table-component";
import { useHistory } from "react-router";

const CustomHeader = (props) => {
  return (
    <div className="w-100 d-flex flex-wrap justify-content-between">
      <div className="add-new">
        <Button.Ripple
          color="primary"
          onClick={() => props.setOpenPostModal(true)}
        >
          Tambah Kelas
        </Button.Ripple>
      </div>
    </div>
  );
};

const DataTableClassrooms = ({ ...props }) => {
  const {
    classrooms,
    isLoading,
    setOpenPostModal,
    setOpenEditModal,
    setOpenDeleteModal,
    setDataToModal,
  } = props;

  const history = useHistory();

  const [state, setState] = useState({
    columns: [
      {
        name: "No.",
        selector: "number",
        sortable: true,
        maxWidth: "50px",
        minWidth: "50px",
        cell: (row, i) => (
          <div className="">
            <p className="text-bold-500 mb-0">{++i}</p>
          </div>
        ),
      },
      {
        name: "Wali Kelas",
        selector: "account.fullname",
        sortable: true,
        // minWidth: "100px",
        cell: (row) => (
          <div className="d-flex flex-column text-truncate">
            <p className="text-bold-500 text-truncate mb-0">
              {row.account.fullname}
            </p>
          </div>
        ),
      },
      {
        name: "Nama Kelas",
        selector: "name",
        // minWidth: "0px",
        sortable: true,
        cell: (row) => (
          <div className="d-flex flex-column">
            <p className="text-bold-500 text-truncate mb-0">{row.name}</p>
          </div>
        ),
      },
      {
        name: "Nama Jurusan",
        selector: "majors_name",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <div className="d-flex flex-column text-truncate">
            <p className="text-bold-500 text-truncate mb-0">
              {row.major ? row.major.name : null}
            </p>
          </div>
        ),
      },
      {
        name: "Nama Ruangan",
        selector: "room_name",
        sortable: true,
        minWidth: "150px",
        cell: (row) => (
          <div className="d-flex flex-column">
            <p className="text-bold-500 text-truncate mb-0">
              {row.room === null ? "Masih null" : row.room.room_name}
            </p>
          </div>
        ),
      },
      {
        name: "Status",
        selector: "is_active",
        sortable: true,
        maxWidth: "100px",
        minWidth: "100px",
        cell: (row) => (
          <div className="d-flex flex-column">
            {row.is_active === 1 ? (
              <Badge color="light-success" pill>
                Aktif
              </Badge>
            ) : null}
            {row.is_active === 0 ? (
              <Badge color="light-danger" pill>
                Nonaktif
              </Badge>
            ) : null}
          </div>
        ),
      },
      {
        name: "Aksi",
        selector: "",
        sortable: true,
        cell: (row) => (
          <div className="d-flex">
            <div className="">
              <Badge
                color="light-warning"
                onClick={() => {
                  setOpenEditModal(true);
                  setDataToModal(row);
                }}
                style={{ cursor: "pointer" }}
                pill
              >
                Edit
              </Badge>
            </div>
            <div className="ml-1">
              <Badge
                color="light-danger"
                onClick={() => {
                  setOpenDeleteModal(true);
                  setDataToModal(row);
                }}
                style={{ cursor: "pointer" }}
                pill
              >
                Hapus
              </Badge>
            </div>
          </div>
        ),
      },
      {
        name: "",
        selector: "detail",
        sortable: true,
        cell: (row) => (
          <div
            className="d-flex flex-column"
            onClick={() => history.push(`/classrooms/${row.id}`)}
          >
            <p
              className="text-bold-500 text-truncate mb-0"
              style={{ cursor: "pointer" }}
            >
              Lihat Detail
            </p>
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
      return { ...state, data: classrooms };
    });
  }, [classrooms]);

  let { data, columns } = state;

  return (
    <>
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "70vh" }}
        >
          <Spinner style={{ width: "3rem", height: "3rem" }} color="success" />
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Data Kelas</CardTitle>
          </CardHeader>
          <CardBody className="rdt_Wrapper">
            <DataTable
              className="dataTable-custom"
              data={data}
              columns={columns}
              pagination
              subHeader
              noHeader
              noDataComponent={data.length < 1 ? "Data tidak ditemukan" : null}
              subHeaderComponent={
                <CustomHeader setOpenPostModal={setOpenPostModal} />
              }
            />
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default DataTableClassrooms;
