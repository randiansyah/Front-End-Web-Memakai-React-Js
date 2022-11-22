import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import {
  Card,
  CardBody,
  Row,
  Button,
  Input,
  FormGroup,
  Label,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Alert,
  Spinner,
} from "reactstrap";
import classnames from "classnames";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import useQuery from "../../../../hooks/useQuery";
import { resetPassword } from "../../../../redux/actions/auth/forgotPassword";
import { validateToken } from "../../../../redux/actions/auth/validateToken";
import cookies from "js-cookie";
import registerImg from "../../../../assets/img/pages/register.jpg";
import { clearInfos } from "../../../../redux/actions/infos/infos";
import Swal from "sweetalert2";

const ResetPasswordPage = ({ ...props }) => {
  const history = useHistory();
  const isFirstRender = useRef(true);
  let query = useQuery();

  const { validateToken, info, clearInfos, resetPassword, isLoading } = props;

  const onSuccess = (response = "") => {
    return Swal.fire({
      icon: "success",
      title: "Password berhasil diubah.",
      text: response,
    }).then(() => history.push("/login"));
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      const onError = () => history.push("/forgot-password");

      cookies.set("tokenResetPassword", query.get("valid_token"));
      validateToken(
        query.get("valid_token"),
        () => {},
        onError,
        "VALIDATE_ERROR_ON_RESET_PAGE"
      );
      clearInfos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Row className="m-0 justify-content-center ">
        <Helmet>
          <title>Akademik - Ganti Password</title>
        </Helmet>
        <Col
          sm="8"
          xl="7"
          lg="10"
          md="8"
          className="d-flex justify-content-center"
        >
          <Card className="bg-authentication rounded-0 mb-0 w-100">
            <Row className="m-0 ">
              <Col
                lg="6"
                className="d-lg-block d-none text-center align-self-center px-1 py-0"
              >
                <img className="mr-1" src={registerImg} alt="registerImg" />
              </Col>
              <Col lg="6" md="12" className="p-0">
                <Card className="rounded-0 mb-0 p-2 rounded">
                  {info.id === "VALIDATE_SUCCESS" ? (
                    <Alert color="success">{info.message}</Alert>
                  ) : null}
                  {info.id === "RESET_PASSWORD_ERROR" ? (
                    <Alert color="danger">{info.message}</Alert>
                  ) : null}
                  <Nav tabs className="px-2">
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: "1",
                        })}
                      >
                        Ganti Password
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <Formik
                    initialValues={{
                      password: "",
                      confirmPassword: "",
                      token: query.get("valid_token"),
                    }}
                    enableReinitialize={true}
                    onSubmit={(values) => resetPassword(values, onSuccess)}
                  >
                    {({ handleChange }) => (
                      <Form>
                        <CardBody>
                          <TabContent>
                            <TabPane>
                              <FormGroup className="form-label-group mt-1">
                                <Input
                                  name="password"
                                  id="password"
                                  type="password"
                                  disabled={isLoading}
                                  onChange={handleChange}
                                  placeholder="Password"
                                />
                                <Label>Password</Label>
                              </FormGroup>
                              <FormGroup className="form-label-group mt-1">
                                <Input
                                  name="confirmPassword"
                                  id="confirmPassword"
                                  type="password"
                                  disabled={isLoading}
                                  onChange={handleChange}
                                  placeholder="Ulangi Password"
                                />
                                <Label>Ulangi Password</Label>
                              </FormGroup>
                            </TabPane>
                          </TabContent>
                          <div className="d-flex mt-4 justify-content-between align-items-center">
                            <div>
                              <Button.Ripple
                                onClick={() => history.push("/")}
                                outline
                                size="md"
                                color="primary"
                              >
                                {" "}
                                Kembali{" "}
                              </Button.Ripple>
                            </div>
                            <div>
                              {isLoading ? (
                                <Button.Ripple
                                  color="primary"
                                  disabled={isLoading}
                                >
                                  <Spinner color="white" size="sm" />
                                  <span className="ml-50">Loading...</span>
                                </Button.Ripple>
                              ) : (
                                <Button.Ripple
                                  size="md"
                                  type="submit"
                                  color="primary"
                                >
                                  {" "}
                                  Submit{" "}
                                </Button.Ripple>
                              )}
                            </div>
                          </div>
                        </CardBody>
                      </Form>
                    )}
                  </Formik>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    info: state.info.infos,
    isLoading: state.auth.auth.onRequest,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    validateToken: (token, onSuccess, onError, flag) =>
      dispatch(validateToken(token, onSuccess, onError, flag)),
    resetPassword: (val, onSuccess) => dispatch(resetPassword(val, onSuccess)),
    clearInfos: () => dispatch(clearInfos()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);
