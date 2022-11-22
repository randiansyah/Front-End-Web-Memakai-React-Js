import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import {
  Button,
  FormGroup,
  Label,
  Input,
  Card,
  Row,
  Col,
  Spinner,
} from "reactstrap";
import { postCourse } from "../../../../redux/actions/course/courseActions";
import { fetchAllCurriculum } from "../../../../redux/actions/curriculum/curriculumActions";
import { fetchAllGroupData } from "../../../../redux/actions/group/groupActions";
import { fetchAllStages } from "../../../../redux/actions/stages/stagesActions";
import Swal from "sweetalert2";

const CreateCoursePage = ({ ...props }) => {
  const history = useHistory();

  const {
    stagesData,
    stagesIsLoading,
    groupData,
    groupIsLoading,
    curriculumData,
    curriculumIsLoading,
    fetchAllStages,
    fetchAllGroupData,
    fetchAllCurriculum,
    postCourse,
  } = props;

  useEffect(() => {
    fetchAllStages();
    fetchAllGroupData();
    fetchAllCurriculum();

    return () => {
      fetchAllStages();
      fetchAllGroupData();
      fetchAllCurriculum();
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
      {stagesIsLoading || groupIsLoading || curriculumIsLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "70vh" }}
        >
          <Spinner style={{ width: "3rem", height: "3rem" }} color="success" />
        </div>
      ) : null}
      {stagesIsLoading || groupIsLoading || curriculumIsLoading ? null : (
        <Card>
          <div className="p-1">
            <Formik
              initialValues={{
                course_code: "",
                name: "",
                general_competences: "",
                special_competences: "",
                total_hours: "",
                group_id: "",
                curriculum_id: "",
                stage_id: "",
                is_active: "",
              }}
              enableReinitialize={true}
              onSubmit={(values) =>
                postCourse(values, alertSuccess, alertError)
              }
            >
              {({ handleChange, values, resetForm }) => (
                <Form>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="course_code">
                          <b>Kode Pelajaran</b>
                        </Label>
                        <Input
                          type="text"
                          value={values.course_code}
                          onChange={handleChange}
                          id="course_code"
                          name="course_code"
                          placeholder="Masukkan kode pelajaran"
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="name">
                          <b>Nama Pelajaran</b>
                        </Label>
                        <Input
                          type="text"
                          value={values.name}
                          onChange={handleChange}
                          id="name"
                          name="name"
                          placeholder="Masukkan nama pelajaran"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                    <Label for="general_competences">
                      <b>Kompetensi Umum</b>
                    </Label>
                    <Input
                      type="text"
                      value={values.general_competences}
                      onChange={handleChange}
                      id="general_competences"
                      name="general_competences"
                      placeholder="Masukkan kompetensi umum"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="special_competences">
                      <b>Kompetensi Khusus</b>
                    </Label>
                    <Input
                      type="text"
                      value={values.special_competences}
                      onChange={handleChange}
                      id="special_competences"
                      name="special_competences"
                      placeholder="Masukkan kompetensi spesial"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="total_hours">
                      <b>Total Jam</b>
                    </Label>
                    <Input
                      type="text"
                      value={values.total_hours}
                      onChange={handleChange}
                      id="total_hours"
                      name="total_hours"
                      placeholder="Masukkan total jam"
                    />
                  </FormGroup>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="stage_id">
                          <b>Pilih Jenjang</b>
                        </Label>
                        <Input
                          type="select"
                          value={values.stage_id}
                          onChange={handleChange}
                          name="stage_id"
                          id="stage_id"
                        >
                          <option value="" disabled>
                            --
                          </option>
                          {stagesData.map((data, idx) => (
                            <option key={idx} value={data.id}>
                              {data.stages}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="is_active">
                          <b>Status</b>
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
                  </Row>
                  <FormGroup>
                    <Label for="group_id">
                      <b>Pilih Kelompok</b>
                    </Label>
                    <Input
                      type="select"
                      value={values.group_id}
                      onChange={handleChange}
                      name="group_id"
                      id="group_id"
                    >
                      <option value="" disabled>
                        --
                      </option>
                      {groupData.map((data, idx) => (
                        <option key={idx} value={data.id}>
                          {data.name}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="curriculum_id">
                      <b>Pilih Kurikulum</b>
                    </Label>
                    <Input
                      type="select"
                      value={values.curriculum_id}
                      onChange={handleChange}
                      name="curriculum_id"
                      id="curriculum_id"
                    >
                      <option value="" disabled>
                        --
                      </option>
                      {curriculumData.map((data, idx) => (
                        <option key={idx} value={data.id}>
                          {data.name}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                  <hr />
                  <div className="d-flex justify-content-end">
                    <div className="mr-3">
                      <Button
                        color="warning"
                        type="submit"
                        onClick={() => {
                          resetForm();
                        }}
                      >
                        Reset Form
                      </Button>
                    </div>
                    <div className="">
                      <Button color="primary" type="submit">
                        Tambah
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      )}
      <Button.Ripple color="primary" onClick={() => history.push("/course")}>
        Kembali
      </Button.Ripple>
    </div>
  );
};

const mapStateToProps = (state) => ({
  stagesData: state.stages.stages.stages,
  stagesIsLoading: state.stages.stages.isLoading,
  groupData: state.group.group.group,
  groupIsLoading: state.group.group.isLoading,
  curriculumData: state.curriculum.curriculum.curriculum,
  curriculumIsLoading: state.curriculum.curriculum.isLoading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllStages: () => dispatch(fetchAllStages()),
    fetchAllGroupData: () => dispatch(fetchAllGroupData()),
    fetchAllCurriculum: () => dispatch(fetchAllCurriculum()),
    postCourse: (val, onSuccess, onFailure) =>
      dispatch(postCourse(val, onSuccess, onFailure)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCoursePage);
