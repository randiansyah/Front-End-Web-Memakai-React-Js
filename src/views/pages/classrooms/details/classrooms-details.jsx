import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { Button, Badge, Card, Spinner } from "reactstrap";
import { fetchClassroomsByID } from "../../../../redux/actions/classrooms/classroomsActions";

export const ClassroomsDetailPage = ({ ...props }) => {
  const { match, fetchClassroomsByID, data, isLoading } = props;
  const history = useHistory();
  const params = match.params.id;

  useEffect(() => {
    fetchClassroomsByID(params);

    return () => {
      fetchClassroomsByID(params);
    };
  }, [params, fetchClassroomsByID]);

  return (
    <div>
      <h4>Detail Kelas</h4>
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
                      <h6 style={{ fontWeight: 300 }}>Kode Kelas</h6>
                    </div>
                    <div>
                      <h6>{data.class_code}</h6>
                    </div>
                  </div>
                  <div className="p-1">
                    <div className="">
                      <h6 style={{ fontWeight: 300 }}>NIK Wali Kelas</h6>
                    </div>
                    <div>
                      <h6>{data.account ? data.account.nisornik : ""}</h6>
                    </div>
                  </div>
                  <div className="p-1">
                    <div className="">
                      <h6 style={{ fontWeight: 300 }}>Nama Jurusan</h6>
                    </div>
                    <div>
                      <h6>{data.major ? data.major.name : null}</h6>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="p-1">
                    <div className="">
                      <h6 style={{ fontWeight: 300 }}>Wali Kelas</h6>
                    </div>
                    <div>
                      <h6>{data.account ? data.account.fullname : ""}</h6>
                    </div>
                  </div>
                  <div className="p-1">
                    <div className="">
                      <h6 style={{ fontWeight: 300 }}>Email Wali Kelas</h6>
                    </div>
                    <div>
                      <h6>{data.account ? data.account.email : ""}</h6>
                    </div>
                  </div>
                  <div className="p-1">
                    <div className="">
                      <h6 style={{ fontWeight: 300 }}>Nama Ruangan</h6>
                    </div>
                    <div>
                      <h6>{data.room ? data.room.room_name : ""}</h6>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="p-1">
                    <div className="">
                      <h6 style={{ fontWeight: 300 }}>Nama Kelas</h6>
                    </div>
                    <div>
                      <h6>{data.name}</h6>
                    </div>
                  </div>
                  <div className="p-1">
                    <div className="">
                      <h6 style={{ fontWeight: 300 }}>Status Kelas</h6>
                    </div>
                    <div>
                      <Badge
                        color={
                          data.is_active === 1
                            ? "light-success"
                            : "light-danger"
                        }
                        pill
                      >
                        {data.is_active === 1 ? "Aktif" : "Nonaktif"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
      <Button.Ripple
        color="primary"
        onClick={() => history.push("/classrooms")}
      >
        Kembali
      </Button.Ripple>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.classrooms.classrooms.classrooms_by_id,
    isLoading: state.classrooms.classrooms.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchClassroomsByID: (id) => dispatch(fetchClassroomsByID(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassroomsDetailPage);
