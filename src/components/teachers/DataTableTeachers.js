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
import { Search } from "react-feather";
import { useHistory } from "react-router-dom";

const CustomHeader = (props) => {
  return (
    <div className="w-100 d-flex flex-wrap justify-content-between">
      <div className="add-new">
        <Button.Ripple
          onClick={() => props.history.push("/teachers/create")}
          color="primary"
        >
          Tambah Data
        </Button.Ripple>
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

const DataTableTeachers = ({ ...props }) => {
  const {
    teachers,
    isLoading,
    setOpenDeleteModal,
    setPutActiveModal,
    setData,
  } = props;

  const history = useHistory();

  const [state, setState] = useState({
    columns: [
      {
        name: "Nama Lengkap",
        selector: "fullname",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-img ml-xl-0 ml-2">
              <img
                className="img-fluid rounded-circle"
                height="36"
                width="36"
                src={row.photos}
                onError={(e) => {
                  return (e.target.src =
                    "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png");
                }}
                alt={row.photos}
              />
            </div>
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.fullname}
                className="d-block text-bold-500 mb-0 text-truncate"
              >
                {row.fullname}{" "}
              </span>
              <small title={row.nik}>NIK : {row.nik}</small>
            </div>
          </div>
        ),
      },
      {
        name: "NIP",
        selector: "nip",
        sortable: true,
        minWidth: "100px",
        cell: (row) => (
          <div className="d-flex flex-column">
            <p className="text-bold-500 text-truncate mb-0">{row.nip}</p>
          </div>
        ),
      },
      {
        name: "Tipe PTK",
        selector: "ptk_type.name",
        sortable: true,
        minWidth: "100px",
        cell: (row) => (
          <div className="d-flex flex-column">
            <p className="text-bold-500 text-truncate mb-0">
              {row.ptk_type.name}
            </p>
          </div>
        ),
      },
      {
        name: "Jenis Kelamin",
        selector: "gender",
        sortable: true,
        minWidth: "100px",
        cell: (row) => (
          <div className="d-flex flex-column">
            <p className="text-bold-500 text-truncate mb-0">{row.gender}</p>
          </div>
        ),
      },
      {
        name: "Nomor Telp.",
        selector: "phone_number",
        sortable: true,
        minWidth: "100px",
        cell: (row) => (
          <div className="d-flex flex-column">
            <p className="text-bold-500 text-truncate mb-0">
              {row.phone_number}
            </p>
          </div>
        ),
      },
      {
        name: "Aksi",
        selector: "",
        sortable: true,
        minWidth: "100px",
        cell: (row) => (
          <div className="d-flex">
            {row.is_active === 0 ? (
              <div>
                <Badge
                  onClick={() => {
                    setPutActiveModal(true);
                    setData(row);
                  }}
                  className="cursor-pointer"
                  color="light-info"
                  pill
                >
                  Aktifkan
                </Badge>
              </div>
            ) : null}
            <div className={`${row.is_active === 0 ? "ml-1" : ""}`}>
              <Badge
                onClick={() => {
                  history.push(`/teachers/${row.id}/update`);
                }}
                className="cursor-pointer"
                color="light-warning"
                pill
              >
                Edit
              </Badge>
            </div>
            <div className="ml-1">
              <Badge
                onClick={() => {
                  setOpenDeleteModal(true);
                  setData(row);
                }}
                className="cursor-pointer"
                color="light-danger"
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
            onClick={() => history.push(`/teachers/${row.id}`)}
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
      return { ...state, data: teachers };
    });
  }, [teachers]);

  const handleFilter = (e) => {
    let value = e.target.value;
    let data = state.data;
    let filteredData = state.filteredData;
    setState((state) => {
      return { ...state, value };
    });

    console.log(data);

    if (value.length) {
      filteredData = data.filter((item) => {
        let startsWithCondition =
          item.fullname.toLowerCase().startsWith(value.toLowerCase()) ||
          item.nip.toLowerCase().startsWith(value.toLowerCase()) ||
          item.nik.toLowerCase().startsWith(value.toLowerCase()) ||
          item.phone_number.toLowerCase().startsWith(value.toLowerCase()) ||
          item.gender.toLowerCase().startsWith(value.toLowerCase()) ||
          item.email.toLowerCase().startsWith(value.toLowerCase());

        let includesCondition =
          item.fullname.toLowerCase().startsWith(value.toLowerCase()) ||
          item.nip.toLowerCase().startsWith(value.toLowerCase()) ||
          item.nik.toLowerCase().startsWith(value.toLowerCase()) ||
          item.phone_number.toLowerCase().startsWith(value.toLowerCase()) ||
          item.gender.toLowerCase().startsWith(value.toLowerCase()) ||
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
            <CardTitle>Data Guru</CardTitle>
          </CardHeader>
          <CardBody className="rdt_Wrapper">
            <DataTable
              className="dataTable-custom"
              data={value.length ? filteredData : data}
              columns={columns}
              noHeader
              pagination
              subHeader
              noDataComponent={data.length < 1 ? "Data tidak ditemukan" : null}
              subHeaderComponent={
                <CustomHeader
                  value={value}
                  handleFilter={handleFilter}
                  history={history}
                />
              }
            />
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default DataTableTeachers;
