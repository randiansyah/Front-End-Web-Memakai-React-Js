import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Spinner,
} from "reactstrap";
import DataTable from "react-data-table-component";
import moment from "moment";
import localization from "moment/locale/id";
import { useHistory } from "react-router";

const CustomHeader = (props) => {
  return (
    <div className="w-100 d-flex flex-wrap justify-content-between">
      <div className="add-new">
        <Button.Ripple
          color="primary"
          onClick={() => props.history.push("/course/create")}
        >
          Tambah Data
        </Button.Ripple>
      </div>
    </div>
  );
};

const DataTableCourse = ({ ...props }) => {
  const { isLoading, course, setOpenDeleteModal, setData } = props;

  const history = useHistory();

  const [state, setState] = useState({
    columns: [
      {
        name: "Kode Pelajaran",
        selector: "course_code",
        sortable: true,
        minWidth: "100px",
        maxWidth: "145px",
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
        selector: "name",
        sortable: true,
        minWidth: "180px",
        maxWidth: "180px",
        cell: (row) => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center text-truncate align-items-start py-xl-0 py-1">
            <div className="d-flex flex-column text-truncate">
              <p className="text-bold-500 text-truncate mb-0">{row.name}</p>
            </div>
          </div>
        ),
      },
      {
        name: "Tanggal dibuat",
        selector: "created_at",
        sortable: true,
        minWidth: "160px",
        cell: (row) => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="d-flex flex-column">
              <p className="text-bold-500 text-truncate mb-0">
                {moment(row.created_at).locale("id", localization).format("LL")}
              </p>
            </div>
          </div>
        ),
      },
      {
        name: "Tanggal diperbarui",
        selector: "updated_at",
        sortable: true,
        minWidth: "170px",
        cell: (row) => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="d-flex flex-column">
              <p className="text-bold-500 text-truncate mb-0">
                {moment(row.updated_at).locale("id", localization).format("LL")}
              </p>
            </div>
          </div>
        ),
      },
      {
        name: "Status",
        selector: "is_active",
        sortable: true,
        maxWidth: "100px",
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
                  history.push(`/course/${row.id}/update`);
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
                  setData(row);
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
        selector: "",
        sortable: true,
        cell: (row) => (
          <p
            onClick={() => history.push(`/course/${row.id}`)}
            className="text-bold-600 cursor-pointer text-truncate mb-0"
          >
            Lihat Detail
          </p>
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
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "70vh" }}
        >
          <Spinner style={{ width: "3rem", height: "3rem" }} color="success" />
        </div>
      ) : null}
      {isLoading ? null : (
        <Card>
          <CardHeader>
            <CardTitle>Data Pelajaran</CardTitle>
          </CardHeader>
          <CardBody className="rdt_Wrapper">
            <DataTable
              className="dataTable-custom"
              data={data}
              columns={columns}
              subHeader
              noHeader
              pagination
              noDataComponent={data.length < 1 ? "Data tidak ditemukan" : null}
              subHeaderComponent={<CustomHeader history={history} />}
            />
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default DataTableCourse;
