import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { Card, Spinner, Button, Badge } from "reactstrap";
import { fetchCourseByID } from "../../../redux/actions/course/courseActions";

const DetailCoursePage = ({ ...props }) => {
  const { isLoading, match, fetchCourseByID, courseData } = props;
  const params = match.params.id;
  const history = useHistory();

  useEffect(() => {
    fetchCourseByID(params);

    return () => {
      fetchCourseByID(params);
    };
  }, [params, fetchCourseByID]);

  return (
    <div>
      <Helmet>
        <title>Akademik - Detail Pelajaran</title>
      </Helmet>
      <h4>Detail Pelajaran</h4>
      <hr />
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <Spinner style={{ width: "3rem", height: "3rem" }} color="success" />
        </div>
      ) : null}
      {isLoading ? null : (
        <Card style={{ boxShadow: "none" }}>
          <div className="p-2">
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-4">
                  <div className="p-1">
                    <div className="">
                      <h6 style={{ fontWeight: 300 }}>Kode Pelajaran</h6>
                    </div>
                    <div>
                      <h6>{courseData.course_code}</h6>
                    </div>
                  </div>
                  <div className="p-1">
                    <div className="">
                      <h6 style={{ fontWeight: 300 }}>Jenjang</h6>
                    </div>
                    <div>
                      <h6>{courseData.stage ? courseData.stage.stages : ""}</h6>
                    </div>
                  </div>
                  <div className="p-1">
                    <div className="">
                      <h6 style={{ fontWeight: 300 }}>Kompetensi Spesial</h6>
                    </div>
                    <div>
                      <h6>{courseData.special_competences}</h6>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="p-1">
                    <div className="">
                      <h6 style={{ fontWeight: 300 }}>Nama Pelajaran</h6>
                    </div>
                    <div>
                      <h6>{courseData.name}</h6>
                    </div>
                  </div>
                  <div className="p-1">
                    <div className="">
                      <h6 style={{ fontWeight: 300 }}>Kelas</h6>
                    </div>
                    <div>
                      <h6>
                        {courseData.stage ? courseData.stage.classroom : ""}
                      </h6>
                    </div>
                  </div>
                  <div className="p-1">
                    <div className="">
                      <h6 style={{ fontWeight: 300 }}>Kompetensi Umum</h6>
                    </div>
                    <div>
                      <h6>{courseData.general_competences}</h6>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="p-1">
                    <div className="">
                      <h6 style={{ fontWeight: 300 }}>Kurikulum</h6>
                    </div>
                    <div>
                      <h6>
                        {courseData.curriculum
                          ? courseData.curriculum.name
                          : ""}
                      </h6>
                    </div>
                  </div>
                  <div className="p-1">
                    <div className="">
                      <h6 style={{ fontWeight: 300 }}>Nama Kelompok</h6>
                    </div>
                    <div>
                      <h6>{courseData.group ? courseData.group.name : ""}</h6>
                    </div>
                  </div>
                  <div className="p-1">
                    <div className="">
                      <h6 style={{ fontWeight: 300 }}>Status Pelajaran</h6>
                    </div>
                    <div>
                      <Badge
                        color={
                          courseData.is_active === 1
                            ? "light-success"
                            : "light-danger"
                        }
                        pill
                      >
                        {courseData.is_active === 1 ? "Aktif" : "Nonaktif"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
  isLoading: state.course.course.isLoading,
  courseData: state.course.course.course_by_id,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCourseByID: (id) => dispatch(fetchCourseByID(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailCoursePage);
