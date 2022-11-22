import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Badge,
  Input,
  Button,
  Spinner,
} from "reactstrap";
import DataTable from "react-data-table-component";
import { Search, Check } from "react-feather";
import { useHistory } from "react-router-dom";
import moment from "moment";
import localization from "moment/locale/id";

const CustomHeader = (props) => {
  return (
    <div className="w-100 d-flex flex-wrap justify-content-between">
      <div className="add-new">
        <Button.Ripple color="primary">Add New</Button.Ripple>
      </div>
      <div className="position-relative has-icon-left mb-1">
        <Input value={props.value} onChange={(e) => props.handleFilter(e)} />
        <div className="form-control-position">
          <Search size="15" />
        </div>
      </div>
    </div>
  );
};

const DataTableUsers = ({ ...props }) => {
  const { users, isLoading, setData, setOpenModalPost, fromDashboard } = props;

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
                onError={(e) => {
                  return (e.target.src =
                    "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png");
                }}
                src={row.avatar}
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
            <p className="text-bold-500 text-truncate mb-0">
              {moment(row.created).locale("id", localization).format("LL")}
            </p>
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
        name: `${fromDashboard ? "" : "Aksi"}`,
        selector: "",
        sortable: true,
        cell: (row) => (
          <div className="d-flex">
            {state.isFromDashboard ? null : row.is_deleted === 1 ? null : (
              <div className="ml-1">
                <Badge
                  onClick={() => {
                    setOpenModalPost(true);
                    setData(row);
                  }}
                  className="cursor-pointer"
                  color="light-info"
                  pill
                >
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
    isFromDashboard: fromDashboard ? true : false,
  });

  useEffect(() => {
    setState((state) => {
      return { ...state, data: users };
    });
  }, [users]);

  const handleFilter = (e) => {
    let value = e.target.value;
    let data = state.data;
    let filteredData = state.filteredData;
    setState((state) => {
      return { ...state, value };
    });

    if (value.length) {
      filteredData = data.filter((item) => {
        let startsWithCondition =
          item.fullname.toLowerCase().startsWith(value.toLowerCase()) ||
          item.created.toLowerCase().startsWith(value.toLowerCase()) ||
          item.email.toLowerCase().startsWith(value.toLowerCase());

        let includesCondition =
          item.fullname.toLowerCase().startsWith(value.toLowerCase()) ||
          item.created.toLowerCase().startsWith(value.toLowerCase()) ||
          item.email.toLowerCase().startsWith(value.toLowerCase());

        if (startsWithCondition) {
          return startsWithCondition;
        } else if (!startsWithCondition && includesCondition) {
          return includesCondition;
        } else return null;
      });
      setState((state) => {
        return { ...state, filteredData };
      });
    }
  };

  let { data, columns, value, filteredData } = state;

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
            <CardTitle>Data Pengguna</CardTitle>
          </CardHeader>
          <CardBody className="rdt_Wrapper">
            <DataTable
              className="dataTable-custom"
              data={value.length ? filteredData : data}
              columns={columns}
              noHeader
              pagination
              noDataComponent={data.length < 1 ? "Data tidak ditemukan" : null}
              subHeaderComponent={
                <CustomHeader value={value} handleFilter={handleFilter} />
              }
            />
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default DataTableUsers;
