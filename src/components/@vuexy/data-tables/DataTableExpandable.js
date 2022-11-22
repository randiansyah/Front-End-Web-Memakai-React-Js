import React from "react";
import { Card, CardBody, CardHeader, CardTitle, Table } from "reactstrap";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Kelas",
    selector: "class",
    sortable: true,
  },
  {
    name: "Tahun Ajaran",
    selector: "year",
    sortable: true,
  },
  {
    name: "Status",
    selector: "status",
    sortable: true,
  },
];

const ExpandableTable = ({ data }) => {
  return (
    <Table responsive striped>
      <thead>
        <tr>
          <th>Property</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Nama Kelas</td>
          <td>{data.class}</td>
        </tr>
        <tr>
          <td>Tahun Pelajaran</td>
          <td>{data.year}</td>
        </tr>
        <tr>
          <td>Status</td>
          <td>{data.status}</td>
        </tr>
        <tr>
          <td>Senin</td>
          <td>07.00</td>
        </tr>
        <tr>
          <td>Selasa</td>
          <td>07.00</td>
        </tr>
        <tr>
          <td>Rabu</td>
          <td>07.00</td>
        </tr>
      </tbody>
    </Table>
  );
};

class DataTableExpandableRows extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Data Jadwal Pelajaran</CardTitle>
        </CardHeader>
        <CardBody>
          <DataTable
            data={this.props.data}
            columns={columns}
            noHeader
            expandableRows
            expandOnRowClicked
            expandableRowsComponent={<ExpandableTable data={this.props.data} />}
          />
        </CardBody>
      </Card>
    );
  }
}

export default DataTableExpandableRows;
