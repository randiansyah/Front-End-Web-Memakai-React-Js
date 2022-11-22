import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Button } from "reactstrap";
import DataTable from "react-data-table-component";
import PostModalComponent from "../../privileges/edit-modal/edit-modal";
import { useHistory } from "react-router";

const DataTablePrivileges = ({ ...props }) => {
  const { data, functions, roleByID } = props;

  const [open, setOpen] = useState(false);
  const [dataToModal, setDataToModal] = useState([]);
  const history = useHistory();

  const [state, setState] = useState({
    columns: [
      {
        name: "Menu",
        selector: "name",
        minWidth: "200px",
        sortable: true,
        cell: (row) => (
          <div className="d-flex flex-column">
            <p className="text-bold-500 text-truncate mb-0">
              {row ? row.menu.name : "Loading..."}
            </p>
          </div>
        ),
      },
      {
        name: "Fungsi",
        selector: "",
        cell: (row) => (
          <div className="d-flex flex-column">
            <Button.Ripple
              size="sm"
              color="primary"
              onClick={() => {
                setOpen(true);
                setDataToModal(row);
              }}
            >
              Pilih Fungsi
            </Button.Ripple>
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
      return { ...state, data };
    });
  }, [data]);

  let { data: stateData, columns } = state;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            Data Privileges {roleByID.name && `${roleByID.name}`.toUpperCase()}
          </CardTitle>
        </CardHeader>
        <CardBody className="rdt_Wrapper">
          <DataTable
            className="dataTable-custom"
            data={stateData}
            columns={columns}
            pagination
            noHeader
          />
        </CardBody>
      </Card>
      <Button.Ripple
        color="primary"
        style={{ display: stateData.length > 0 ? "flex" : "none" }}
        onClick={() => history.push("/privileges")}
      >
        Kembali
      </Button.Ripple>
      <PostModalComponent
        modal={open}
        toggle={setOpen}
        functions={functions}
        dataToModal={dataToModal}
        roleByID={roleByID}
      />
    </>
  );
};

export default DataTablePrivileges;
