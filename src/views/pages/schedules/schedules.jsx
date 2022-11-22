import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Badge, Button, Card, FormGroup, Label, Input } from "reactstrap";
import DataTableExpandableRows from "../../../components/@vuexy/data-tables/DataTableExpandable";

const SchedulesPages = (props) => {
  const [data, setData] = useState({
    data: [
      {
        year: "2020",
        class: "Rekayasa Perangkat Lunak",
        status: (
          <Badge color="light-success" pill>
            Aktif
          </Badge>
        ),
        Job_title: "Clinical Specialist",
        salary: "$7024.06",
        address: "7421 Ilene Way",
        city: "Cruz Alta",
      },
      {
        year: "2021",
        class: "Teknik Keamanan Jaringan",
        status: (
          <Badge color="light-success" pill>
            Aktif
          </Badge>
        ),
        Job_title: "Financial Advisor",
        salary: "$2666.37",
        address: "410 Hallows Lane",
        city: "Wonopringgo",
      },
      {
        year: "2022",
        class: "Multimedia",
        status: (
          <Badge color="light-danger" pill>
            Nonaktif
          </Badge>
        ),
        Job_title: "Desktop Support Technician",
        salary: "$7603.07",
        address: "5 Hagan Plaza",
        city: "Daishan",
      },
    ],
    filteredData: [],
    isFiltered: false,
  });

  const handleFilter = (val) => {
    const { class: classData, year, status } = val;
    let dataToFilter = data.data;
    let filteredData = data.filteredData;

    filteredData = dataToFilter.filter((data) => {
      const startWith =
        data.class.toLowerCase().startsWith(classData.toLowerCase()) &&
        data.year.toLowerCase().startsWith(year.toString().toLowerCase()) &&
        data.status.props.children
          .toLowerCase()
          .startsWith(status.toLowerCase());

      const includeCondition =
        data.class.toLowerCase().includes(classData.toLowerCase()) &&
        data.year.toLowerCase().includes(year.toString().toLowerCase()) &&
        data.status.props.children.toLowerCase().includes(status.toLowerCase());

      if (startWith) {
        return startWith;
      } else if (!startWith && includeCondition) {
        return includeCondition;
      } else {
        return null;
      }
    });

    setData({ ...data, isFiltered: true, filteredData });
  };

  return (
    <div>
      <Helmet>
        <title>Akademik - Jadwal Pelajaran</title>
      </Helmet>
      <h4>Filter Pencarian</h4>
      <hr />
      <>
        <Card>
          <div className="p-2">
            <Formik
              initialValues={{
                class: "",
                year: "",
                status: "",
              }}
              onSubmit={(values) => {
                handleFilter(values);
              }}
            >
              {({ handleChange, values, resetForm }) => (
                <Form>
                  <div className="container">
                    <div className="row">
                      <div className="col-md-4">
                        <FormGroup>
                          <Label for="class">
                            <b>Kelas</b>
                          </Label>
                          <Input
                            type="text"
                            id="class"
                            name="class"
                            value={values.class}
                            onChange={handleChange}
                            placeholder="Ketik Kelas Disini"
                          />
                        </FormGroup>
                      </div>
                      <div className="col-md-4">
                        <FormGroup>
                          <Label for="year">
                            <b>Tahun Ajaran</b>
                          </Label>
                          <Input
                            type="text"
                            id="year"
                            name="year"
                            value={values.year}
                            onChange={handleChange}
                            placeholder="Ketik Tahun Ajaran Disini"
                          />
                        </FormGroup>
                      </div>
                      <div className="col-md-4">
                        <FormGroup>
                          <Label for="exampleSelect">
                            <b>Pilih Status</b>
                          </Label>
                          <Input
                            type="select"
                            id="status"
                            name="status"
                            value={values.status}
                            onChange={handleChange}
                          >
                            <option value="" disabled>
                              --
                            </option>
                            <option value="Nonaktif" style={{ width: "100%" }}>
                              Nonaktif
                            </option>
                            <option value="Aktif" style={{ width: "100%" }}>
                              Aktif
                            </option>
                          </Input>
                        </FormGroup>
                      </div>
                    </div>
                    <div className="d-flex mt-2">
                      <div className="mr-1">
                        <Button.Ripple
                          color="warning"
                          onClick={() => {
                            setData({
                              ...data,
                              isFiltered: false,
                              filteredData: [],
                            });
                            resetForm();
                          }}
                        >
                          Reset
                        </Button.Ripple>
                      </div>
                      <div>
                        <Button.Ripple color="primary" type="submit">
                          Temukan
                        </Button.Ripple>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </>
      <DataTableExpandableRows
        data={data.isFiltered ? data.filteredData : data.data}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SchedulesPages);
