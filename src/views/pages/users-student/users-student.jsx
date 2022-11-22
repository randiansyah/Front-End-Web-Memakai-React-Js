import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Button, Card, FormGroup, Label, Input } from "reactstrap";
import DataTableAdmin from "../../../components/@vuexy/data-tables/DataTableAdmin";

const UsersStudentPage = (props) => {
  const [student, setStudent] = useState({
    data: [
      {
        fullname: "Andi",
        verified: true,
        email: "andi@gmail.com",
        role: "Siswa",
        nisornik: "123456",
        created: "21 Desember 2000",
        is_deleted: 0,
      },
      {
        fullname: "Iqbal",
        verified: true,
        email: "iqbal@gmail.com",
        role: "Siswa",
        nisornik: "1234567",
        created: "21 Desember 2001",
        is_deleted: 1,
      },
    ],
    isFiltered: false,
    filteredData: [],
    flag: "Data Siswa",
  });

  const handleFilter = (val) => {
    const { fullname, email, nisornik, is_deleted } = val;
    let dataToFilter = student.data;
    let filteredData = student.filteredData;

    filteredData = dataToFilter.filter((data) => {
      const startWith =
        data.fullname.toLowerCase().startsWith(fullname.toLowerCase()) &&
        data.email.toLowerCase().startsWith(email.toLowerCase()) &&
        data.nisornik.toLowerCase().startsWith(nisornik.toLowerCase()) &&
        data.is_deleted
          .toString()
          .toLowerCase()
          .startsWith(is_deleted.toLowerCase());

      const includeCondition =
        data.fullname.toLowerCase().includes(fullname.toLowerCase()) &&
        data.email.toLowerCase().includes(email.toLowerCase()) &&
        data.nisornik.toLowerCase().includes(nisornik.toLowerCase()) &&
        data.is_deleted
          .toString()
          .toLowerCase()
          .includes(is_deleted.toLowerCase());

      if (startWith) {
        return startWith;
      } else if (!startWith && includeCondition) {
        return includeCondition;
      } else {
        return null;
      }
    });

    setStudent({ ...student, isFiltered: true, filteredData });
  };

  return (
    <div>
      <Helmet>
        <title>Akademik - Admin</title>
      </Helmet>
      <Card>
        <div className="p-2">
          <Formik
            initialValues={{
              fullname: "",
              email: "",
              nisornik: "",
              is_deleted: "",
            }}
            onSubmit={(values) => {
              handleFilter(values);
            }}
          >
            {({ handleChange, values, resetForm }) => (
              <Form>
                <div className="container">
                  <div className="row">
                    <div className="col-md-3">
                      <FormGroup>
                        <Label for="fullname">
                          <b>Nama Lengkap</b>
                        </Label>
                        <Input
                          type="text"
                          id="fullname"
                          name="fullname"
                          value={values.fullname}
                          onChange={handleChange}
                          placeholder="Ketik Nama Lengkap Disini"
                        />
                      </FormGroup>
                    </div>
                    <div className="col-md-3">
                      <FormGroup>
                        <Label for="email">
                          <b>Email</b>
                        </Label>
                        <Input
                          type="text"
                          id="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          placeholder="Ketik Email Disini"
                        />
                      </FormGroup>
                    </div>
                    <div className="col-md-3">
                      <FormGroup>
                        <Label for="nisornik">
                          <b>NIS/NIK</b>
                        </Label>
                        <Input
                          type="text"
                          id="nisornik"
                          name="nisornik"
                          value={values.nisornik}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </div>
                    <div className="col-md-3">
                      <FormGroup>
                        <Label for="is_deleted">
                          <b>Pilih Status</b>
                        </Label>
                        <Input
                          type="select"
                          id="is_deleted"
                          name="is_deleted"
                          value={values.is_deleted}
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            --
                          </option>
                          <option value="0" style={{ width: "100%" }}>
                            Nonaktif
                          </option>
                          <option value="1" style={{ width: "100%" }}>
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
                          setStudent({
                            ...student,
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
      <DataTableAdmin
        admin={student.isFiltered ? student.filteredData : student.data}
        flag={student.flag}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UsersStudentPage);
