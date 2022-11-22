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
import { fetchAllCurriculum } from "../../../../redux/actions/curriculum/curriculumActions";
import { fetchAllGroupData } from "../../../../redux/actions/group/groupActions";
import { fetchAllStages } from "../../../../redux/actions/stages/stagesActions";
import Swal from "sweetalert2";
import { fetchCourseByID } from "../../../../redux/actions/course/courseActions";
import { updateCourse } from "../../../../redux/actions/course/courseActions";

const UpdateCoursePage = ({ ...props }) => {
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
    fetchCourseByID,
    match,
    isLoading,
    courseData,
    updateCourse,
  } = props;

  const params = match.params.id;

  useEffect(() => {
    fetchAllStages();
    fetchAllGroupData();
    fetchAllCurriculum();
    fetchCourseByID(params);

    return () => {
      fetchAllStages();
      fetchAllGroupData();
      fetchAllCurriculum();
      fetchCourseByID(params);
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
      {stagesIsLoading || groupIsLoading || curriculumIsLoading || isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "70vh" }}
        >
          <Spinner style={{ width: "3rem", height: "3rem" }} color="success" />
        </div>
      ) : null}
      {stagesIsLoading ||
      groupIsLoading ||
      curriculumIsLoading ||
      isLoading ? null : (
        <Card>
          <div className="p-1">
            <Formik
              initialValues={{
                course_code: courseData.course_code,
                name: courseData.name,
                general_competences: courseData.general_competences,
                special_competences: courseData.special_competences,
                total_hours: courseData.total_hours,
                group_id: courseData.group ? courseData.group.id : "",
                curriculum_id: courseData.curriculum
                  ? courseData.curriculum.id
                  : "",
                stage_id: courseData.stage ? courseData.stage.id : "",
                is_active: courseData.is_active,
                is_deleted: courseData.is_deleted,
              }}
              enableReinitialize={true}
              onSubmit={(values) => {
                const { total_hours } = values;

                const newState = {
                  ...values,
                  total_hours: `${total_hours}`,
                };

                updateCourse(newState, courseData.id, alertSuccess, alertError);
              }}
            >
              {({ handleChange, values }) => (
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
                    <div className="">
                      <Button color="primary" type="submit">
                        Perbarui
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
  isLoading: state.course.course.isLoading,
  courseData: state.course.course.course_by_id,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllStages: () => dispatch(fetchAllStages()),
    fetchAllGroupData: () => dispatch(fetchAllGroupData()),
    fetchAllCurriculum: () => dispatch(fetchAllCurriculum()),
    fetchCourseByID: (id) => dispatch(fetchCourseByID(id)),
    updateCourse: (val, id, onSuccess, onFailure) =>
      dispatch(updateCourse(val, id, onSuccess, onFailure)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCoursePage);
