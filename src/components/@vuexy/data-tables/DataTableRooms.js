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
          color="primary"
          onClick={() => props.setOpenPostModal(true)}
        >
          Tambah Ruangan
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

const DataTableRooms = ({ ...props }) => {
  const {
    rooms,
    isLoading,
    setOpenPostModal,
    setOpenDeleteModal,
    setOpenEditModal,
    setData,
  } = props;

  const history = useHistory();

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
        name: "Nama Ruangan",
        selector: "room_name",
        sortable: true,
        cell: (row) => (
          <div className="d-flex flex-column">
            <p className="text-bold-500 text-truncate mb-0">{row.room_name}</p>
          </div>
        ),
      },
      {
        name: "Kapasitas",
        selector: "capacity",
        sortable: true,
        cell: (row) => (
          <div className="d-flex flex-column">
            <p className="text-bold-500 text-truncate mb-0">{row.capacity}</p>
          </div>
        ),
      },
      {
        name: "Status Ruangan",
        selector: "",
        sortable: true,
        cell: (row) => (
          <div className="d-flex flex-column">
            {row.is_active === 1 ? (
              <Badge color="light-success" pill>
                <small>Aktif</small>
              </Badge>
            ) : null}
            {row.is_active === 0 ? (
              <Badge color="light-danger" pill>
                <small>Nonaktif</small>
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
                  setData(row);
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
            onClick={() => history.push(`/rooms/${row.id}`)}
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
      return { ...state, data: rooms };
    });
  }, [rooms]);

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
          item.room_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.capacity.toLowerCase().startsWith(value.toLowerCase());

        let includesCondition =
          item.room_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.capacity.toLowerCase().startsWith(value.toLowerCase());

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
            <CardTitle>Data Ruangan</CardTitle>
          </CardHeader>
          <CardBody className="rdt_Wrapper">
            <DataTable
              className="dataTable-custom"
              data={value.length ? filteredData : data}
              columns={columns}
              pagination
              subHeader
              noHeader
              noDataComponent={data.length < 1 ? "Data tidak ditemukan" : null}
              subHeaderComponent={
                <CustomHeader
                  value={value}
                  setOpenPostModal={setOpenPostModal}
                  handleFilter={handleFilter}
                />
              }
            />
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default DataTableRooms;
