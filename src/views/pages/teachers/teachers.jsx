import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import {
  fetchAllTeachers,
  searchFilterTeachers,
  teachersFetchEmployeeStatus,
  teachersFetchPtkTypes,
} from "../../../redux/actions/teachers/teachersActions";
import DataTableTeachers from "../../../components/teachers/DataTableTeachers";
import DeleteModalComponent from "../../../components/teachers/delete-modal/delete-modal";
import PutActiveModalComponent from "../../../components/teachers/put-active-modal/put-active-modal";
import { Form, Formik } from "formik";
import { Button, Card, FormGroup, Input, Label } from "reactstrap";

const TeachersPage = ({ ...props }) => {
  const {
    fetchAllTeachers,
    teachersData,
    isLoading,
    employeesStatusData,
    ptktypesData,
    teachersFetchPtkTypes,
    teachersFetchEmployeeStatus,
    searchFilterTeachers,
  } = props;

  const [dataToModal, setDataToModal] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openPutActiveModal, setOpenPutActiveModal] = useState(false);

  useEffect(() => {
    fetchAllTeachers();
    teachersFetchPtkTypes();
    teachersFetchEmployeeStatus();

    return () => {
      fetchAllTeachers();
      teachersFetchPtkTypes();
      teachersFetchEmployeeStatus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Helmet>
        <title>Akademik - Guru</title>
      </Helmet>
      <Card className="">
        <div className="p-2">
          <div className="w-100">
            <Formik
              initialValues={{
                nip: "",
                nik: "",
                nuptk: "",
                ptk_type_id: "",
                employe_status_id: "",
                is_active: "",
              }}
              enableReinitialize={true}
              onSubmit={(values) => {
                console.log(values);
                searchFilterTeachers(values);
              }}
            >
              {({ handleChange, values, resetForm }) => (
                <Form>
                  <div className="row">
                    <div className="col-md-3">
                      <FormGroup>
                        <Label for="nip">
                          <b>NIP</b>
                        </Label>
                        <Input
                          type="text"
                          id="nip"
                          name="nip"
                          value={values.nip}
                          onChange={handleChange}
                          placeholder="Ketik NIP disini"
                        />
                      </FormGroup>
                    </div>
                    <div className="col-md-3">
                      <FormGroup>
                        <Label for="nik">
                          <b>NIK</b>
                        </Label>
                        <Input
                          type="text"
                          id="nik"
                          name="nik"
                          value={values.nik}
                          onChange={handleChange}
                          placeholder="Ketik NIK disini"
                        />
                      </FormGroup>
                    </div>
                    <div className="col-md-3">
                      <FormGroup>
                        <Label for="nisornik">
                          <b>NUPTK</b>
                        </Label>
                        <Input
                          type="text"
                          id="nuptk"
                          name="nuptk"
                          value={values.nuptk}
                          onChange={handleChange}
                          placeholder="Ketik NUPTK disini"
                        />
                      </FormGroup>
                    </div>
                    <div className="col-md-3">
                      <FormGroup>
                        <Label for="ptk_type_id">
                          <b>Pilih Tipe PTK</b>
                        </Label>
                        <Input
                          type="select"
                          name="ptk_type_id"
                          onChange={handleChange}
                          id="ptk_type_id"
                          value={values.ptk_type_id}
                        >
                          <option value="" disabled>
                            --
                          </option>
                          {ptktypesData.map((data, idx) => (
                            <option value={data.id} key={idx}>
                              {data.name}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </div>
                    <div className="col-md-3">
                      <FormGroup>
                        <Label for="employe_status_id">
                          <b>Pilih Jabatan Kepegawaian</b>
                        </Label>
                        <Input
                          type="select"
                          id="employe_status_id"
                          name="employe_status_id"
                          value={values.employe_status_id}
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            --
                          </option>
                          {employeesStatusData.map((data, idx) => (
                            <option
                              value={data.id}
                              key={idx}
                              style={{ width: "100%" }}
                            >
                              {data.name}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </div>
                    <div className="col-md-3">
                      <FormGroup>
                        <Label for="is_active">
                          <b>Pilih Status</b>
                        </Label>
                        <Input
                          type="select"
                          id="is_active"
                          name="is_active"
                          value={values.is_active}
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            --
                          </option>
                          <option value={0} style={{ width: "100%" }}>
                            Nonaktif
                          </option>
                          <option value={1} style={{ width: "100%" }}>
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
                          resetForm();
                          fetchAllTeachers();
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
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Card>
      <DataTableTeachers
        teachers={teachersData}
        isLoading={isLoading}
        setData={setDataToModal}
        setOpenDeleteModal={setOpenDeleteModal}
        setPutActiveModal={setOpenPutActiveModal}
      />
      <DeleteModalComponent
        modal={openDeleteModal}
        toggle={setOpenDeleteModal}
        data={dataToModal}
      />
      <PutActiveModalComponent
        modal={openPutActiveModal}
        toggle={setOpenPutActiveModal}
        data={dataToModal}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  teachersData: state.teachers.teachers.teachers,
  employeesStatusData: state.teachers.teachers.employee_status,
  ptktypesData: state.teachers.teachers.ptk_types,
  isLoading: state.teachers.teachers.isLoading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllTeachers: () => dispatch(fetchAllTeachers()),
    teachersFetchPtkTypes: () => dispatch(teachersFetchPtkTypes()),
    teachersFetchEmployeeStatus: () => dispatch(teachersFetchEmployeeStatus()),
    searchFilterTeachers: (val) => dispatch(searchFilterTeachers(val)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeachersPage);
