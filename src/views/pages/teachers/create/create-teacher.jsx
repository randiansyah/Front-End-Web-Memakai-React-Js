import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import {
  Button,
  Card,
  Col,
  FormGroup,
  Input,
  Row,
  Label,
  Spinner,
} from "reactstrap";
import { ProgrammaticallyDropzone } from "../dropzone/dropzone";
import { BiodataFormComponent } from "../../../../components/teachers/biodata-form/biodata-form";
import { AdministrationFormComponent } from "../../../../components/teachers/administration-form/administration-form";
import { Form, Formik } from "formik";
import "flatpickr/dist/themes/light.css";
import "../../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import {
  createTeachersData,
  teachersFetchEmployeeStatus,
  teachersFetchGenders,
  teachersFetchMaritalStatus,
  teachersFetchPtkTypes,
  teachersFetchReligions,
} from "../../../../redux/actions/teachers/teachersActions";
import Swal from "sweetalert2";

const CreateTeacherPage = ({ ...props }) => {
  const {
    teachersFetchGenders,
    teachersFetchEmployeeStatus,
    teachersFetchMaritalStatus,
    teachersFetchReligions,
    teachersFetchPtkTypes,
    createTeachersData,
    gendersData,
    employeesStatusData,
    maritalStatusData,
    religionsData,
    ptktypesData,
    isLoading,
  } = props;

  const history = useHistory();

  useEffect(() => {
    teachersFetchGenders();
    teachersFetchEmployeeStatus();
    teachersFetchMaritalStatus();
    teachersFetchReligions();
    teachersFetchPtkTypes();

    return () => {
      teachersFetchGenders();
      teachersFetchEmployeeStatus();
      teachersFetchMaritalStatus();
      teachersFetchReligions();
      teachersFetchPtkTypes();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const alertSuccess = (response, title) => {
    return Swal.fire({
      icon: "success",
      title,
      text: response,
    });
  };

  const alertError = (response, title) => {
    return Swal.fire({
      icon: "error",
      title,
      text: response,
    });
  };

  return (
    <div>
      <Helmet>
        <title>Akademik - Tambah Guru</title>
      </Helmet>
      <h3 className="mb-2">Halaman Tambah Data Guru</h3>
      <div className="d-flex flex-column">
        {isLoading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "70vh" }}
          >
            <Spinner
              style={{ width: "3rem", height: "3rem" }}
              color="success"
            />
          </div>
        ) : null}
        {isLoading ? null : (
          <Card>
            <div className="p-1">
              <Formik
                initialValues={{
                  fullname: "",
                  email: "",
                  phone_number: "",
                  gender: "",
                  marital_status: "",
                  religion: "",
                  date_of_birth: "",
                  place_of_birth: "",
                  nationality: "",
                  postal_code: "",
                  address: "",
                  nip: "",
                  nik: "",
                  nuptk: "",
                  npwp: "",
                  ptk_type_id: "",
                  employe_status_id: "",
                  sk_cpns: "",
                  salary_source: "",
                  cpns_start_date: "",
                  cpns_end_date: "",
                  sk_appointment: "",
                  institution: "",
                  golongan: "",
                  is_active: "",
                  additional_tasks: "",
                  photos: "",
                }}
                onSubmit={(values) => {
                  const { data } = DataSet(values);
                  createTeachersData(data, alertSuccess, alertError);
                }}
              >
                {({ handleChange, values, setFieldValue, resetForm }) => (
                  <Form>
                    <>
                      <BiodataFormComponent
                        onChange={handleChange}
                        values={values}
                        setFieldValue={setFieldValue}
                        genders={gendersData}
                        maritalStatus={maritalStatusData}
                        religion={religionsData}
                      />
                      <AdministrationFormComponent
                        onChange={handleChange}
                        values={values}
                        setFieldValue={setFieldValue}
                        employeesData={employeesStatusData}
                        ptkTypes={ptktypesData}
                      />
                      <div className="mt-1">
                        <h4>Data Tambahan</h4>
                      </div>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="is_active">
                              <b>Status Pegawai</b>
                            </Label>
                            <Input
                              type="select"
                              value={values.is_active}
                              onChange={handleChange}
                              name="is_active"
                              id="is_active"
                            >
                              <option value="" disabled>
                                --
                              </option>
                              <option value="0">Nonaktif</option>
                              <option value="1">Aktif</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="additional_tasks">
                              <b>Task Tambahan</b>
                            </Label>
                            <Input
                              type="text"
                              value={values.additional_task}
                              onChange={handleChange}
                              id="additional_tasks"
                              name="additional_tasks"
                              placeholder="Masukkan task tambahan disini"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <ProgrammaticallyDropzone
                            setFieldValue={setFieldValue}
                            values={values.photos}
                          />
                        </Col>
                      </Row>
                      <hr />
                      <div className="d-flex justify-content-end">
                        <div className="mr-4">
                          <Button.Ripple
                            color="danger"
                            onClick={() => {
                              resetForm();
                            }}
                          >
                            Reset Form
                          </Button.Ripple>
                        </div>
                        <div className="">
                          <Button.Ripple color="primary" type="submit">
                            Tambah
                          </Button.Ripple>
                        </div>
                      </div>
                    </>
                  </Form>
                )}
              </Formik>
            </div>
          </Card>
        )}
        <Button.Ripple
          color="warning"
          onClick={() => history.push("/teachers")}
        >
          Kembali
        </Button.Ripple>
      </div>
    </div>
  );
};

const DataSet = (values) => {
  let data = new FormData();

  data.append("photos", values.photos);

  data.append("nip", values.nip);
  data.append("nik", values.nik);
  data.append("nuptk", values.nuptk);
  data.append("npwp", values.npwp);
  data.append("ptk_type_id", values.ptk_type_id);
  data.append("employe_status_id", values.employe_status_id);
  data.append("sk_cpns", values.sk_cpns);
  data.append("cpns_start_date", values.cpns_start_date);
  data.append("cpns_end_date", values.cpns_end_date);
  data.append("sk_appointment", values.sk_appointment);
  data.append("institution", values.institution);
  data.append("golongan", values.golongan);
  data.append("salary_source", values.salary_source);
  data.append("additional_tasks", values.additional_tasks);
  data.append("fullname", values.fullname);
  data.append("email", values.email);
  data.append("phone_number", values.phone_number);
  data.append("gender", values.gender);
  data.append("date_of_birth", values.date_of_birth);
  data.append("place_of_birth", values.place_of_birth);
  data.append("religion", values.religion);
  data.append("address", values.address);
  data.append("postal_code", values.postal_code);
  data.append("nationality", values.nationality);
  data.append("marital_status", values.marital_status);
  data.append("is_active", values.is_active);
  data.append("is_deleted", 0);

  return { data };
};

const mapStateToProps = (state) => ({
  gendersData: state.teachers.teachers.genders,
  employeesStatusData: state.teachers.teachers.employee_status,
  maritalStatusData: state.teachers.teachers.marital_status,
  religionsData: state.teachers.teachers.religions,
  ptktypesData: state.teachers.teachers.ptk_types,
  isLoading: state.teachers.teachers.isLoading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    teachersFetchGenders: () => dispatch(teachersFetchGenders()),
    teachersFetchEmployeeStatus: () => dispatch(teachersFetchEmployeeStatus()),
    teachersFetchMaritalStatus: () => dispatch(teachersFetchMaritalStatus()),
    teachersFetchReligions: () => dispatch(teachersFetchReligions()),
    teachersFetchPtkTypes: () => dispatch(teachersFetchPtkTypes()),
    createTeachersData: (val, onSuccess, onFailure) =>
      dispatch(createTeachersData(val, onSuccess, onFailure)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeacherPage);
