import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Badge,
  Input,
  Spinner,
  Button,
} from "reactstrap";
import DataTable from "react-data-table-component";
import { Search } from "react-feather";

const CustomHeader = (props) => {
  return (
    <div className="w-100 d-flex flex-wrap justify-content-between">
      <div className="add-new">
        <Button.Ripple onClick={() => props.setPostModal(true)} color="primary">
          Tambah Menu
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

const DataTableMenu = ({ ...props }) => {
  const {
    menus,
    isLoading,
    setPostModal,
    setEditModal,
    setDataToModal,
    setDeleteModal,
  } = props;

  const [state, setState] = useState({
    columns: [
      {
        name: "Nama",
        selector: "name",
        minWidth: "200px",
        sortable: true,
        cell: (row) => (
          <div className="d-flex flex-column">
            <p className="text-bold-500 text-truncate mb-0">{row.name}</p>
          </div>
        ),
      },
      {
        name: "Url",
        selector: "url",
        minWidth: "200px",
        sortable: true,
        cell: (row) => (
          <div className="d-flex flex-column">
            <p className="text-bold-500 text-truncate mb-0">{row.url}</p>
          </div>
        ),
      },
      {
        name: "Induk",
        selector: "parent_id",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <div className="d-flex flex-column">
            <p className="text-bold-500 text-truncate mb-0">{row.parent_id}</p>
          </div>
        ),
      },
      {
        name: "Sequence",
        selector: "sequence",
        sortable: true,
        cell: (row) => (
          <div className="d-flex flex-column">
            <p className="text-bold-500 text-truncate mb-0">{row.sequence}</p>
          </div>
        ),
      },
      {
        name: "Icon",
        selector: "icon",
        sortable: true,
        cell: (row) => (
          <div className="d-flex flex-column">
            {row.icon === "icon" ? (
              row.icon
            ) : (
              <i
                className={`fa ${row.icon} icon-table`}
                style={{ margin: "0 !important" }}
                aria-hidden="true"
              ></i>
            )}
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
                onClick={() => {
                  setEditModal(true);
                  setDataToModal(row);
                }}
                color="light-warning"
                style={{ cursor: "pointer" }}
                pill
              >
                Edit
              </Badge>
            </div>
            <div className="ml-1">
              <Badge
                onClick={() => {
                  setDeleteModal(true);
                  setDataToModal(row);
                }}
                color="light-danger"
                style={{ cursor: "pointer" }}
                pill
              >
                Hapus
              </Badge>
            </div>
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
      return { ...state, data: menus };
    });
  }, [menus]);

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
          item.name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.url.toLowerCase().startsWith(value.toLowerCase());

        let includesCondition =
          item.name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.url.toLowerCase().startsWith(value.toLowerCase());

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
            <CardTitle>Data Menu</CardTitle>
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
                  handleFilter={handleFilter}
                  setPostModal={setPostModal}
                />
              }
            />
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default DataTableMenu;
