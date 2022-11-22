import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import {
  fetchAllClassrooms,
  fetchAllMajorsName,
  searchFilterClassrooms,
} from "../../../redux/actions/classrooms/classroomsActions";
import DataTableClassrooms from "../../../components/@vuexy/data-tables/DataTableClassroom";
import PostModalComponent from "../../../components/classrooms/post-modal/post-modal";
import EditModalComponent from "../../../components/classrooms/edit-modal/edit-modal";
import DeleteModalComponent from "../../../components/classrooms/delete-modal/delete-modal";
import { fetchAllRooms } from "../../../redux/actions/rooms/roomsActions";
import { fetchUsersData } from "../../../redux/actions/users/usersActions";
import { Card, FormGroup, Label, Button, Input } from "reactstrap";
import { Formik, Form } from "formik";

const ClassroomsPage = ({ ...props }) => {
  const {
    fetchAllClassrooms,
    classroomsData,
    isLoading,
    rooms,
    fetchAllRooms,
    roomsIsLoading,
    usersData,
    fetchUsersData,
    majorsData,
    fetchAllMajorsName,
    searchFilterClassrooms,
  } = props;
  const [openPostModal, setOpenPostModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [dataToModal, setDataToModal] = useState([]);

  useEffect(() => {
    fetchAllClassrooms();
    fetchAllRooms();
    fetchUsersData();
    fetchAllMajorsName();

    return () => {
      fetchAllClassrooms();
      fetchAllRooms();
      fetchUsersData();
      fetchAllMajorsName();
    };
  }, [fetchAllClassrooms, fetchAllRooms, fetchUsersData, fetchAllMajorsName]);

  return (
    <div>
      <Helmet>
        <title>Akademik - Kelas</title>
      </Helmet>
      <h4>Filter Data</h4>
      <hr />
      <Card>
        <div className="p-2">
          <Formik
            initialValues={{ class_code: "", room_id: "", name: "", nik: "" }}
            onSubmit={(values) => searchFilterClassrooms(values)}
          >
            {({ handleChange, values, resetForm }) => (
              <Form>
                <div className="row">
                  <div className="col-md-3">
                    <FormGroup>
                      <Label for="email">
                        <b>Kode Kelas</b>
                      </Label>
                      <Input
                        type="text"
                        id="class_code"
                        name="class_code"
                        value={values.class_code}
                        onChange={handleChange}
                        placeholder="Ketik Kode Kelas Disini"
                      />
                    </FormGroup>
                  </div>
                  <div className="col-md-3">
                    <FormGroup>
                      <Label for="name">
                        <b>Nama Kelas</b>
                      </Label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        placeholder="Ketik Nama Kelas Disini"
                      />
                    </FormGroup>
                  </div>
                  <div className="col-md-3">
                    <FormGroup>
                      <Label for="nik">
                        <b>NIS / NIK</b>
                      </Label>
                      <Input
                        type="number"
                        id="nik"
                        name="nik"
                        value={values.nik}
                        onChange={handleChange}
                        placeholder="Ketik NIS/NIK Disini"
                      />
                    </FormGroup>
                  </div>
                  <div className="col-md-3">
                    <FormGroup>
                      <Label for="room_id">
                        <b>Pilih Ruangan</b>
                      </Label>
                      <Input
                        type="select"
                        name="room_id"
                        id="room_id"
                        onChange={handleChange}
                        value={values.room_id}
                      >
                        <option value="" disabled>
                          --
                        </option>
                        {rooms.map((data, idx) => (
                          <option
                            key={idx}
                            value={data.id}
                            style={{ width: "100%" }}
                          >
                            {data.room_name}
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
                        fetchAllClassrooms();
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
      <DataTableClassrooms
        classrooms={classroomsData}
        isLoading={isLoading || roomsIsLoading}
        setDataToModal={setDataToModal}
        setOpenPostModal={setOpenPostModal}
        setOpenEditModal={setOpenEditModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />
      <PostModalComponent
        toggle={setOpenPostModal}
        modal={openPostModal}
        rooms={rooms}
        usersData={usersData}
        majorsData={majorsData}
      />
      <EditModalComponent
        toggle={setOpenEditModal}
        modal={openEditModal}
        rooms={rooms}
        data={dataToModal}
        usersData={usersData}
        majorsData={majorsData}
      />
      <DeleteModalComponent
        toggle={setOpenDeleteModal}
        modal={openDeleteModal}
        data={dataToModal}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    classroomsData: state.classrooms.classrooms.classrooms,
    majorsData: state.classrooms.classrooms.majors_data,
    isLoading: state.classrooms.classrooms.isLoading,
    rooms: state.rooms.rooms.rooms,
    roomsIsLoading: state.rooms.rooms.isLoading,
    usersData: state.users.users.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllClassrooms: () => dispatch(fetchAllClassrooms()),
    fetchAllRooms: () => dispatch(fetchAllRooms()),
    fetchUsersData: () => dispatch(fetchUsersData()),
    fetchAllMajorsName: () => dispatch(fetchAllMajorsName()),
    searchFilterClassrooms: (val) => dispatch(searchFilterClassrooms(val)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassroomsPage);
