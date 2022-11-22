import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import DataTableUsers from "../../../components/@vuexy/data-tables/DataTableUsers";
import {
  clearFilteredData,
  fetchUsersData,
  fetchUsersRole,
  searchFilter,
} from "../../../redux/actions/users/usersActions";
import DeleteModalComponent from "../../../components/users/delete-modal/delete-modal";
import PostModalComponent from "../../../components/users/post-modal/post-modal";
import { clearInfos } from "../../../redux/actions/infos/infos";
import { Card, FormGroup, Label, Input, Button } from "reactstrap";
import { Formik, Form } from "formik";

const UsersPage = ({ ...props }) => {
  const {
    fetchUsersData,
    usersData,
    isLoading,
    clearInfos,
    fetchUsersRole,
    roles,
    searchFilter,
    filteringData,
    clearFilteredData,
  } = props;

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalPost, setOpenModalPost] = useState(false);
  const [data, setData] = useState([]);
  const isFirstRender = useRef(true);

  const toggleModalDelete = () => setOpenModalDelete(!openModalDelete);
  const toggleModalPost = () => setOpenModalPost(!openModalPost);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      clearInfos();
      clearFilteredData();
      fetchUsersData();
      fetchUsersRole();
    }

    return () => {
      clearInfos();
      clearFilteredData();
      fetchUsersData();
      fetchUsersRole();
    };
  }, [fetchUsersData, clearInfos, fetchUsersRole, clearFilteredData]);

  return (
    <>
      <Helmet>
        <title>Akademik - Data Pengguna</title>
      </Helmet>
      <>
        <h4>Filter Pencarian</h4>
        <hr></hr>
        <Card className="w-100">
          <div className="p-2">
            <div className="w-100">
              <Formik
                initialValues={{
                  nisornik: "",
                  email: "",
                  role: "",
                  is_deleted: "",
                }}
                enableReinitialize={true}
                onSubmit={(values) => {
                  searchFilter(values);
                }}
              >
                {({ handleChange, values, resetForm }) => (
                  <Form>
                    <div className="row">
                      <div className="col-md-3">
                        <FormGroup>
                          <Label for="email">
                            <b>Email</b>
                          </Label>
                          <Input
                            type="email"
                            id="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            placeholder="Ketik Email disini"
                          />
                        </FormGroup>
                      </div>
                      <div className="col-md-3">
                        <FormGroup>
                          <Label for="nisornik">
                            <b>NIS / NIK</b>
                          </Label>
                          <Input
                            type="text"
                            id="nisornik"
                            name="nisornik"
                            value={values.nisornik}
                            onChange={handleChange}
                            placeholder="Ketik NIS / NIK disini"
                          />
                        </FormGroup>
                      </div>
                      <div className="col-md-3">
                        <FormGroup>
                          <Label for="peran">
                            <b>Pilih Role</b>
                          </Label>
                          <Input
                            type="select"
                            name="role"
                            onChange={handleChange}
                            id="role"
                            value={values.role}
                          >
                            <option value="" disabled>
                              --
                            </option>
                            {roles.map((role, idx) => (
                              <option
                                key={idx}
                                value={role.name}
                                style={{ width: "100%" }}
                              >
                                {role.name}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </div>
                      <div className="col-md-3">
                        <FormGroup>
                          <Label for="exampleSelect">
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
                            clearFilteredData();
                            resetForm();
                            fetchUsersData();
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
      </>
      <DataTableUsers
        users={usersData}
        isLoading={isLoading || filteringData}
        setOpenModalDelete={setOpenModalDelete}
        setOpenModalPost={setOpenModalPost}
        setData={setData}
      />
      <DeleteModalComponent
        modal={openModalDelete}
        toggle={toggleModalDelete}
        data={data}
      />
      <PostModalComponent
        modal={openModalPost}
        toggle={toggleModalPost}
        data={data}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    usersData: state.users.users.users,
    isLoading: state.users.users.isLoading,
    roles: state.users.users.roles,
    fetchingRole: state.users.users.fetchingRole,
    filteringData: state.users.users.filteringData,
    info: state.info.infos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsersData: () => dispatch(fetchUsersData()),
    fetchUsersRole: () => dispatch(fetchUsersRole()),
    searchFilter: (val) => dispatch(searchFilter(val)),
    clearInfos: () => dispatch(clearInfos()),
    clearFilteredData: () => dispatch(clearFilteredData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
