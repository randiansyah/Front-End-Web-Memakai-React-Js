import React, { useEffect, useState } from "react";
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
  fetchTeachersByID,
  teachersFetchEmployeeStatus,
  teachersFetchGenders,
  teachersFetchMaritalStatus,
  teachersFetchPtkTypes,
  teachersFetchReligions,
  updatePhoto,
  updateTeachersData,
} from "../../../../redux/actions/teachers/teachersActions";
import Swal from "sweetalert2";

const UpdateTeacherPage = ({ ...props }) => {
  const {
    teachersFetchGenders,
    teachersFetchEmployeeStatus,
    teachersFetchMaritalStatus,
    teachersFetchReligions,
    teachersFetchPtkTypes,
    gendersData,
    employeesStatusData,
    maritalStatusData,
    religionsData,
    ptktypesData,
    isLoading,
    fetchTeachersByID,
    match,
    data,
    updateTeachersData,
    updatePhoto,
  } = props;

  const history = useHistory();
  const params = match.params.id;
  const [newAvatar, setNewAvatar] = useState("");

  useEffect(() => {
    teachersFetchGenders();
    teachersFetchEmployeeStatus();
    teachersFetchMaritalStatus();
    teachersFetchReligions();
    teachersFetchPtkTypes();
    fetchTeachersByID(params);

    return () => {
      teachersFetchGenders();
      teachersFetchEmployeeStatus();
      teachersFetchMaritalStatus();
      teachersFetchReligions();
      teachersFetchPtkTypes();
      fetchTeachersByID(params);
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

  // console.log(data);

  return (
    <div>
      <Helmet>
        <title>Akademik - Edit Guru</title>
      </Helmet>
      <h3 className="mb-2">Halaman Edit Data Guru</h3>
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
              <h4>Perbarui Foto Profil</h4>
              <Formik
                initialValues={{ photos: "" }}
                enableReinitialize={true}
                onSubmit={(values) => {
                  let formData = new FormData();

                  formData.append("photos", values.photos);

                  updatePhoto(formData, params, alertSuccess, alertError);
                  setNewAvatar(null);
                }}
              >
                {({ setFieldValue }) => (
                  <Form className="d-flex justify-content-center align-items-center flex-column">
                    {newAvatar &&
                      newAvatar.map((file, idx) => (
                        <img
                          key={idx}
                          src={file.preview}
                          alt={file.name}
                          className="img-border rounded-circle box-shadow-1"
                          style={{
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                          width="150px"
                          height="150px"
                        />
                      ))}
                    {newAvatar ? null : (
                      <img
                        src={data.photos}
                        onError={(e) => {
                          return (e.target.src =
                            "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png");
                        }}
                        alt="avatar"
                        style={{ objectFit: "cover" }}
                        width="150px"
                        height="150px"
                        className="img-border rounded-circle box-shadow-1"
                      />
                    )}
                    <div className="d-flex mt-2 mb-1">
                      <div className="">
                        <ProgrammaticallyDropzone
                          flag="from_update"
                          setFieldValue={setFieldValue}
                          setNewAvatar={setNewAvatar}
                        />
                      </div>
                      <div className="">
                        <Button.Ripple
                          color="primary"
                          className="ml-2"
                          type="submit"
                          disabled={!newAvatar}
                        >
                          Ganti Foto
                        </Button.Ripple>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="p-1">
              <Formik
                initialValues={{
                  account_id: data.account_id || "",
                  fullname: data.fullname || "Loading...",
                  email: data.email || "Loading...",
                  phone_number: data.phone_number || "Loading...",
                  gender: data.gender || "",
                  marital_status: data.marital_status || "Loading...",
                  religion: data.religion || "Loading...",
                  date_of_birth: data.date_of_birth || "",
                  place_of_birth: data.place_of_birth || "Loading...",
                  nationality: data.nationality || "Loading...",
                  postal_code: data.postal_code || "Loading...",
                  address: data.address || "Loading...",
                  nip: data.nip || "Loading...",
                  nik: data.nik || "Loading...",
                  nuptk: data.nuptk || "Loading...",
                  npwp: data.npwp || "Loading...",
                  ptk_type_id: data.ptk_type
                    ? data.ptk_type.id
                    : "" || "Loading...",
                  employe_status_id: data.employe_status
                    ? data.employe_status.id
                    : "" || "Loading...",
                  salary_source: data.salary_source || "",
                  sk_cpns: data.sk_cpns || "Loading...",
                  cpns_start_date: data.cpns_start_date || "",
                  cpns_end_date: data.cpns_end_date || "",
                  sk_appointment: data.sk_appointment || "Loading...",
                  institution: data.institution || "Loading...",
                  golongan: data.golongan || "Loading...",
                  is_active: data.is_active || "Loading...",
                  is_deleted: data.is_deleted || "",
                  additional_tasks: data.additional_tasks || "Loading...",
                }}
                enableReinitialize={true}
                onSubmit={(values) => {
                  updateTeachersData(values, params, alertSuccess, alertError);
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
                            <Label for="additional_task">
                              <b>Task Tambahan</b>
                            </Label>
                            <Input
                              type="text"
                              value={values.additional_task}
                              onChange={handleChange}
                              id="additional_task"
                              name="additional_task"
                              placeholder="Masukkan task tambahan disini"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <div className="d-flex justify-content-end">
                        <div className="mr-2">
                          <Button.Ripple
                            color="info"
                            onClick={() =>
                              history.push(`/users/${data.account_id}`)
                            }
                            type="submit"
                          >
                            Edit Akun
                          </Button.Ripple>
                        </div>
                        <div className="">
                          <Button.Ripple color="primary" type="submit">
                            Perbarui
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

const mapStateToProps = (state) => ({
  gendersData: state.teachers.teachers.genders,
  employeesStatusData: state.teachers.teachers.employee_status,
  maritalStatusData: state.teachers.teachers.marital_status,
  religionsData: state.teachers.teachers.religions,
  ptktypesData: state.teachers.teachers.ptk_types,
  isLoading: state.teachers.teachers.isLoading,
  data: state.teachers.teachers.teachers_by_id,
});

const mapDispatchToProps = (dispatch) => {
  return {
    teachersFetchGenders: () => dispatch(teachersFetchGenders()),
    teachersFetchEmployeeStatus: () => dispatch(teachersFetchEmployeeStatus()),
    teachersFetchMaritalStatus: () => dispatch(teachersFetchMaritalStatus()),
    teachersFetchReligions: () => dispatch(teachersFetchReligions()),
    teachersFetchPtkTypes: () => dispatch(teachersFetchPtkTypes()),
    fetchTeachersByID: (id) => dispatch(fetchTeachersByID(id)),
    updateTeachersData: (val, id, onSuccess, onFailure) =>
      dispatch(updateTeachersData(val, id, onSuccess, onFailure)),
    updatePhoto: (val, id, onSuccess, onFailure) =>
      dispatch(updatePhoto(val, id, onSuccess, onFailure)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTeacherPage);
