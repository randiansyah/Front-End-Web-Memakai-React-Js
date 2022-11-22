import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Badge,
  Button,
} from "reactstrap";
import DataTable from "react-data-table-component";
import { Check } from "react-feather";
import { useHistory } from "react-router-dom";

const CustomHeader = (props) => {
  return (
    <div className="w-100 d-flex flex-wrap justify-content-between">
      <div className="add-new">
        <Button.Ripple color="primary">Add New</Button.Ripple>
      </div>
    </div>
  );
};

const DataTableAdmin = ({ ...props }) => {
  const { admin, flag } = props;

  const history = useHistory();

  const [state, setState] = useState({
    columns: [
      {
        name: "Nama Lengkap",
        selector: "fullname",
        sortable: true,
        minWidth: "300px",
        cell: (row) => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-img ml-xl-0 ml-2">
              <img
                className="img-fluid rounded-circle"
                height="36"
                width="36"
                src="https://material-ui.com/static/images/avatar/1.jpg"
                alt={row.fullname}
              />
            </div>
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span title={row.fullname} className="d-block text-bold-500 mb-0">
                {row.fullname}{" "}
                {row.verified ? (
                  <span>
                    <Check size={22} style={{ color: "#81c784" }} />
                  </span>
                ) : null}
              </span>
              <small title={row.email}>{row.email}</small>
            </div>
          </div>
        ),
      },
      {
        name: "Peran",
        selector: "role",
        sortable: true,
        cell: (row) => (
          <div className="d-flex flex-column">
            <p className="text-bold-500 text-truncate mb-0">{row.role}</p>
            <Badge color="light-warning" pill>
              <small>NIS/NIK : {row.nisornik}</small>
            </Badge>
          </div>
        ),
      },
      {
        name: "Terdaftar",
        selector: "created",
        sortable: true,
        cell: (row) => (
          <div className="d-flex flex-column">
            <p className="text-bold-500 text-truncate mb-0">{row.created}</p>
            <Badge
              color={row.is_deleted ? "light-success" : "light-danger"}
              pill
            >
              <small>Status : {row.is_deleted ? "Aktif" : "Non Aktif"}</small>
            </Badge>
          </div>
        ),
      },
      {
        name: "Aksi",
        selector: "",
        sortable: true,
        cell: (row) => (
          <div className="d-flex">
            {row.is_deleted === 0 ? null : (
              <div>
                <Badge className="cursor-pointer" color="light-danger" pill>
                  Nonaktifkan
                </Badge>
              </div>
            )}
            {row.is_deleted === 1 ? null : (
              <div className="ml-1">
                <Badge className="cursor-pointer" color="light-info" pill>
                  Aktifkan
                </Badge>
              </div>
            )}
          </div>
        ),
      },
      {
        name: "",
        selector: "",
        sortable: true,
        cell: (row) => (
          <p
            onClick={() => history.push(`/users/${row.id}`)}
            className="text-bold-600 cursor-pointer text-truncate mb-0 ml-sm-4 ml-2"
          >
            Detail
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
      return { ...state, data: admin };
    });
  }, [admin]);

  let { data, columns, value } = state;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{flag ? flag : "Data Admin"}</CardTitle>
        </CardHeader>
        <CardBody className="rdt_Wrapper">
          <DataTable
            className="dataTable-custom"
            data={data}
            columns={columns}
            noHeader
            pagination
            subHeaderComponent={<CustomHeader value={value} />}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default DataTableAdmin;
