import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Button, Card, FormGroup, Label, Input } from "reactstrap";
import {
  fetchAllCourse,
  searchFilterCourse,
} from "../../../redux/actions/course/courseActions";
import { fetchAllStages } from "../../../redux/actions/stages/stagesActions";
import { fetchAllGroupData } from "../../../redux/actions/group/groupActions";
import { fetchAllCurriculum } from "../../../redux/actions/curriculum/curriculumActions";
import DataTableCourse from "../../../components/course/DataTableCourse";
import DeleteModalComponent from "../../../components/course/delete-modal/delete-modal";

const CoursePage = ({ ...props }) => {
  const {
    fetchAllCourse,
    coursesData,
    isLoading,
    stagesData,
    fetchAllStages,
    fetchAllGroupData,
    fetchAllCurriculum,
    curriculumData,
    groupData,
    searchFilterCourse,
    isSearching,
    stagesIsLoading,
    groupIsLoading,
    curriculumIsLoading,
  } = props;
  const [dataToModal, setDataToModal] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    fetchAllCourse();
    fetchAllStages();
    fetchAllGroupData();
    fetchAllCurriculum();

    return () => {
      fetchAllCourse();
      fetchAllStages();
      fetchAllGroupData();
      fetchAllCurriculum();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Helmet>
        <title>Akademik - Pelajaran</title>
      </Helmet>
      {isLoading ||
      stagesIsLoading ||
      groupIsLoading ||
      curriculumIsLoading ? null : (
        <Card>
          <div className="p-2">
            <Formik
              initialValues={{
                course_code: "",
                group_id: "",
                stages: "",
                curriculum_id: "",
              }}
              onSubmit={(values) => {
                searchFilterCourse(values);
              }}
            >
              {({ handleChange, values, resetForm }) => (
                <Form>
                  <div className="row">
                    <div className="col-md-4">
                      <FormGroup>
                        <Label for="course_code">
                          <b>Kode Pelajaran</b>
                        </Label>
                        <Input
                          type="text"
                          id="course_code"
                          name="course_code"
                          value={values.course_code}
                          onChange={handleChange}
                          placeholder="Ketik Kode Pelajaran Disini"
                        />
                      </FormGroup>
                    </div>
                    <div className="col-md-4">
                      <FormGroup>
                        <Label for="group_id">
                          <b>Pilih Kelompok</b>
                        </Label>
                        <Input
                          type="select"
                          id="group_id"
                          name="group_id"
                          value={values.group_id}
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            --
                          </option>
                          {groupData.map((data, idx) => (
                            <option
                              key={idx}
                              value={data.id}
                              style={{ width: "100%" }}
                            >
                              {data.name}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </div>
                    <div className="col-md-4">
                      <FormGroup>
                        <Label for="stages">
                          <b>Pilih Jenjang</b>
                        </Label>
                        <Input
                          type="select"
                          id="stages"
                          name="stages"
                          value={values.stages}
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            --
                          </option>
                          {stagesData.map((data, idx) => (
                            <option
                              key={idx}
                              value={data.id}
                              style={{ width: "100%" }}
                            >
                              {data.stages}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </div>
                    <div className="col-md-4">
                      <FormGroup>
                        <Label for="curriculum_id">
                          <b>Pilih Kurikulum</b>
                        </Label>
                        <Input
                          type="select"
                          id="curriculum_id"
                          name="curriculum_id"
                          value={values.curriculum_id}
                          onChange={handleChange}
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
                    </div>
                  </div>
                  <div className="d-flex mt-2">
                    <div className="mr-1">
                      <Button.Ripple
                        color="warning"
                        onClick={() => {
                          resetForm();
                          fetchAllCourse();
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
        </Card>
      )}
      <DataTableCourse
        isLoading={
          isLoading ||
          isSearching ||
          stagesIsLoading ||
          groupIsLoading ||
          curriculumIsLoading
        }
        course={coursesData}
        setData={setDataToModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />
      <DeleteModalComponent
        modal={openDeleteModal}
        toggle={setOpenDeleteModal}
        data={dataToModal}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  coursesData: state.course.course.course,
  stagesData: state.stages.stages.stages,
  stagesIsLoading: state.stages.stages.isLoading,
  groupData: state.group.group.group,
  groupIsLoading: state.group.group.isLoading,
  curriculumData: state.curriculum.curriculum.curriculum,
  curriculumIsLoading: state.curriculum.curriculum.isLoading,
  isLoading: state.course.course.isLoading,
  isSearching: state.course.course.isSearching,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllCourse: () => dispatch(fetchAllCourse()),
    fetchAllStages: () => dispatch(fetchAllStages()),
    fetchAllGroupData: () => dispatch(fetchAllGroupData()),
    fetchAllCurriculum: () => dispatch(fetchAllCurriculum()),
    searchFilterCourse: (val) => dispatch(searchFilterCourse(val)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
