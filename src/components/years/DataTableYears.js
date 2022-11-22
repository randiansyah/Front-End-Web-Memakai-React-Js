import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Spinner,
  Input,
} from "reactstrap";
import DataTable from "react-data-table-component";
import moment from "moment";
import localization from "moment/locale/id";
import { Search } from "react-feather";

const CustomHeader = (props) => {
  return (
    <div className="w-100 d-flex flex-wrap justify-content-between">
      <div className="add-new">
        <Button.Ripple
          color="primary"
          onClick={() => props.setOpenPostModal(true)}
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

const DataTableYears = ({ ...props }) => {
  const {
    isLoading,
    years,
    setOpenPostModal,
    setOpenEditModal,
    setOpenDeleteModal,
    setOpenPutActiveModal,
    setData,
  } = props;

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
        name: "Tahun Ajaran",
        selector: "year",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="d-flex flex-column">
              <p className="text-bold-500 text-truncate mb-0">{row.year}</p>
            </div>
          </div>
        ),
      },
      {
        name: "Tanggal dibuat",
        selector: "created_at",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="d-flex flex-column">
              <p className="text-bold-500 text-truncate mb-0">
                {moment(row.created_at)
                  .locale("id", localization)
                  .format("LLL")}
              </p>
            </div>
          </div>
        ),
      },
      {
        name: "Tanggal diperbarui",
        selector: "updated_at",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="d-flex flex-column">
              <p className="text-bold-500 text-truncate mb-0">
                {moment(row.updated_at)
                  .locale("id", localization)
                  .format("LLL")}
              </p>
            </div>
          </div>
        ),
      },
      {
        name: "Status",
        selector: "is_active",
        sortable: true,
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
            {row.is_active === 0 ? (
              <div className="">
                <Badge
                  color="light-info"
                  onClick={() => {
                    setOpenPutActiveModal(true);
                    setData(row);
                  }}
                  style={{ cursor: "pointer" }}
                  pill
                >
                  Aktifkan
                </Badge>
              </div>
            ) : null}
            <div className={`${row.is_active === 0 ? "ml-1" : ""}`}>
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
    ],
    data: [],
    filteredData: [],
    value: "",
  });

  useEffect(() => {
    setState((state) => {
      return { ...state, data: years };
    });
  }, [years]);

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
          item.year.toLowerCase().startsWith(value.toLowerCase()) ||
          moment(item.created_at)
            .locale("id", localization)
            .format("LLL")
            .toLowerCase()
            .startsWith(value.toLowerCase()) ||
          moment(item.updated_at)
            .locale("id", localization)
            .format("LLL")
            .toLowerCase()
            .startsWith(value.toLowerCase());

        let includesCondition =
          item.year.toLowerCase().startsWith(value.toLowerCase()) ||
          moment(item.created_at)
            .locale("id", localization)
            .format("LLL")
            .toLowerCase()
            .startsWith(value.toLowerCase()) ||
          moment(item.updated_at)
            .locale("id", localization)
            .format("LLL")
            .toLowerCase()
            .startsWith(value.toLowerCase());

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
      ) : null}
      {isLoading ? null : (
        <Card>
          <CardHeader>
            <CardTitle>Data Tahun Ajaran</CardTitle>
          </CardHeader>
          <CardBody className="rdt_Wrapper">
            <DataTable
              className="dataTable-custom"
              data={value.length ? filteredData : data}
              columns={columns}
              subHeader
              noHeader
              pagination
              noDataComponent={data.length < 1 ? "Data tidak ditemukan" : null}
              subHeaderComponent={
                <CustomHeader
                  value={value}
                  handleFilter={handleFilter}
                  setOpenPostModal={setOpenPostModal}
                />
              }
            />
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default DataTableYears;
