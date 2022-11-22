import { Form, Formik } from "formik";
import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import {
  Badge,
  Button,
  Card,
  Col,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Row,
  Spinner,
} from "reactstrap";
import {
  fetchPrivillagesFunctions,
  fetchPrivillagesMenu,
  fetchPrivillagesRole,
  postPrivileges,
  resetRoleName,
} from "../../../redux/actions/privileges/privilegesActions";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import Swal from "sweetalert2";
import "../../../assets/scss/pages/dashboard-analytics.scss";
import { fetchAllMenus } from "../../../redux/actions/menus/menusActions";
import { fetchAllRoles } from "../../../redux/actions/roles/rolesActions";

const SelectField = ({ onChange, ...rest }) => {
  const handleChange = (value) => {
    onChange("function_id", value);
  };

  return (
    <Select
      id="function_id"
      placeholder="--"
      onChange={handleChange}
      {...rest}
    />
  );
};

const PrivillagesPage = ({ ...props }) => {
  const {
    roleData,
    isLoading,
    fetchPrivillagesMenu,
    fetchPrivillagesFunctions,
    functionsData,
    menuPrivillagesData,
    postPrivileges,
    menuIsEmpty,
    resetRoleName,
    fetchAllMenus,
    fetchAllRoles,
    fetchPrivillagesRole,
  } = props;
  const history = useHistory();
  const animatedComponents = makeAnimated();
  const isFirstRendering = useRef(true);

  useEffect(() => {
    if (isFirstRendering.current) {
      isFirstRendering.current = false;
      fetchPrivillagesMenu();
      fetchAllMenus();
      fetchPrivillagesFunctions();
      resetRoleName();
      fetchAllRoles();
      fetchPrivillagesRole();
    }

    return () => {
      fetchPrivillagesMenu();
      fetchAllMenus();
      fetchPrivillagesFunctions();
      resetRoleName();
      fetchAllRoles();
      fetchPrivillagesRole();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options = [];

  functionsData.map((data) => {
    return options.push({ value: `${data.id}`, label: data.name });
  });

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
        <title>Akademik - Hak Istimewa</title>
      </Helmet>
      <h4>Hak Istimewa</h4>
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
        <Row>
          <Col md={6}>
            <Card className="mt-sm-0 mt-2 shadow-none">
              <div className="p-2 ">
                <Formik
                  initialValues={{
                    role: "",
                    menu_id: "",
                    function_id: [],
                  }}
                  onSubmit={(values) => {
                    const { function_id } = values;

                    const payload = {
                      ...values,
                      function_id: function_id.map((data) => data.value),
                    };

                    const redirect = () =>
                      history.push(`/privileges/${values.role}`);

                    postPrivileges(payload, alertSuccess, alertError, redirect);
                  }}
                >
                  {({ handleChange, values, resetForm, setFieldValue }) => (
                    <Form>
                      <div className="container">
                        <div className="row">
                          <div className="col-md-6">
                            <FormGroup>
                              <Label for="is_deleted">
                                <b>Pilih Peran</b>
                              </Label>
                              <Input
                                type="select"
                                id="role"
                                name="role"
                                value={values.role}
                                onChange={handleChange}
                              >
                                <option value="" disabled>
                                  --
                                </option>
                                {roleData.map((data, idx) => (
                                  <option
                                    key={idx}
                                    value={data.name}
                                    style={{ width: "100%" }}
                                  >
                                    {data.name}
                                  </option>
                                ))}
                              </Input>
                            </FormGroup>
                          </div>
                          <div className="col-md-6">
                            <FormGroup>
                              <Label for="is_deleted">
                                <b>Pilih Menu</b>
                              </Label>
                              <Input
                                type="select"
                                id="menu_id"
                                name="menu_id"
                                value={values.menu_id}
                                onChange={handleChange}
                              >
                                <option value="" disabled>
                                  --
                                </option>
                                {menuPrivillagesData.map((data, idx) => (
                                  <option
                                    key={idx}
                                    value={data.id}
                                    style={{ width: "100%" }}
                                  >
                                    {data ? data.name : "Loading ..."}
                                  </option>
                                ))}
                              </Input>
                            </FormGroup>
                          </div>
                          <div className="col-md-12">
                            <FormGroup>
                              <Label for="is_deleted">
                                <b>Pilih Status</b>
                              </Label>
                              <SelectField
                                onChange={setFieldValue}
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                isMulti
                                value={values.function_id}
                                options={options}
                                className="React"
                                classNamePrefix="select"
                              />
                            </FormGroup>
                          </div>
                        </div>
                        <div className="d-flex mt-2">
                          <div className="mr-1">
                            <Button.Ripple
                              color="warning"
                              onClick={() => {
                                resetForm();
                              }}
                            >
                              Reset
                            </Button.Ripple>
                          </div>
                          <div>
                            <Button.Ripple color="primary" type="submit">
                              Tambah
                            </Button.Ripple>
                          </div>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </Card>
          </Col>
          <Col md={6}>
            {isLoading ? "Loading ..." : null}
            {isLoading ? null : (
              <ListGroup>
                {menuIsEmpty.map((data, idx) => (
                  <ListGroupItem
                    key={idx}
                    className="d-flex justify-content-between"
                  >
                    {data}
                    <div className="">
                      <Badge
                        color="light-success"
                        onClick={() => history.push(`/privileges/${data}`)}
                        style={{ cursor: "pointer" }}
                        pill
                      >
                        Detail
                      </Badge>
                    </div>
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </Col>
        </Row>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    menuPrivillagesData: state.menus.menus.menus,
    isLoading: state.privillages.privillages.isLoading,
    functionsData: state.privillages.privillages.functions,
    menuIsEmpty: state.privillages.privillages.menuIsEmpty,
    roleData: state.roles.roles.roles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPrivillagesMenu: () => dispatch(fetchPrivillagesMenu()),
    fetchPrivillagesFunctions: () => dispatch(fetchPrivillagesFunctions()),
    fetchAllMenus: () => dispatch(fetchAllMenus()),
    postPrivileges: (values, onSuccess, onFailure, redirect) =>
      dispatch(postPrivileges(values, onSuccess, onFailure, redirect)),
    resetRoleName: () => dispatch(resetRoleName()),
    fetchAllRoles: () => dispatch(fetchAllRoles()),
    fetchPrivillagesRole: () => dispatch(fetchPrivillagesRole()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivillagesPage);
