import React from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Spinner,
  Table,
} from "reactstrap";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Nama",
    selector: "name",
    sortable: true,
  },
  {
    name: "Url",
    selector: "url",
    sortable: true,
  },
  {
    name: "Induk",
    selector: "data_parent",
    sortable: true,
  },
  {
    name: "Sequence",
    selector: "sequence",
    sortable: true,
  },
  {
    name: "Icon",
    selector: "icon",
  },
  {
    name: "Aksi",
    selector: "actions",
  },
];

const CustomHeader = (props) => {
  return (
    <div className="w-100 d-flex flex-wrap justify-content-between">
      <div className="add-new">
        <Button.Ripple onClick={() => props.setPostModal(true)} color="primary">
          Tambah Menu
        </Button.Ripple>
      </div>
    </div>
  );
};

const ExpandableTable = ({
  data,
  setEditModal,
  setDeleteModal,
  setDataToModal,
}) => {
  return (
    <Table responsive striped>
      {data.children ? (
        data.children.map((d, idx) => (
          <React.Fragment key={idx}>
            <thead>
              <tr>
                <th>Sub Menu {++idx}</th>
                <th>Url</th>
                <th>Sub Dari</th>
                <th>Sequence</th>
                <th>Icon</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{d.name}</td>
                <td>{d.url}</td>
                <td>{data.name}</td>
                <td>{d.sequence}</td>
                <td>
                  <i
                    className={`fa ${d.icon} icon-table`}
                    aria-hidden="true"
                  ></i>
                </td>
                <td>
                  <div className="d-flex">
                    <div className="">
                      <Badge
                        onClick={() => {
                          setEditModal(true);
                          setDataToModal(d);
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
                          setDataToModal(d);
                        }}
                        color="light-danger"
                        style={{ cursor: "pointer" }}
                        pill
                      >
                        Hapus
                      </Badge>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </React.Fragment>
        ))
      ) : (
        <thead>
          <tr>
            <th>
              <div className="d-flex justify-content-center p-1">
                <h4>Sub Menu Kosong</h4>
              </div>
            </th>
          </tr>
        </thead>
      )}
    </Table>
  );
};

class DataTableExpandableMenus extends React.Component {
  render() {
    const temp = [];

    this.props.data.map((data) => {
      return temp.push({
        ...data,
        data_parent:
          data.parent_id === "1" || data.parent_id === 1 ? "Root" : null,
        icon: <i className={`fa ${data.icon}`} aria-hidden="true"></i>,
        actions: (
          <div className="d-flex">
            <div className="">
              <Badge
                onClick={() => {
                  this.props.setEditModal(true);
                  this.props.setDataToModal(data);
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
                  this.props.setDeleteModal(true);
                  this.props.setDataToModal(data);
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
      });
    });

    return this.props.isLoading ? (
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
        <CardBody>
          <DataTable
            data={temp}
            columns={columns}
            noHeader
            subHeader
            subHeaderComponent={
              <CustomHeader setPostModal={this.props.setPostModal} />
            }
            expandableRows
            expandOnRowClicked
            expandableRowsComponent={
              <ExpandableTable
                data={this.props.data}
                setEditModal={this.props.setEditModal}
                setDeleteModal={this.props.setDeleteModal}
                setDataToModal={this.props.setDataToModal}
              />
            }
          />
        </CardBody>
      </Card>
    );
  }
}

export default DataTableExpandableMenus;
