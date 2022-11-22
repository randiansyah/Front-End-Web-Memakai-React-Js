import React, { useEffect, useRef } from "react";
import {
  Button,
  Card,
  CardBody,
  Row,
  Col,
  FormGroup,
  Input,
  Label,
  Spinner,
} from "reactstrap";
import { Mail, Lock, Check } from "react-feather";
import { history } from "../../../../history";
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy";
import loginImg from "../../../../assets/img/logo-pesat.png";
import "../../../../assets/scss/pages/authentication.scss";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import {
  loginUser,
  setLoadingToFalse,
} from "../../../../redux/actions/auth/loginActions";
import { clearInfos } from "../../../../redux/actions/infos/infos";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import cookies from "js-cookie";
import { clearRegisterData } from "../../../../redux/actions/register/registerActions";

const Login = ({ ...props }) => {
  const isFirstRender = useRef(true);

  const {
    loginUser,
    isLoading,
    clearInfos,
    setLoadingToFalse,
    clearRegisterData,
  } = props;

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      if (cookies.get("tokenResetPassword") !== "")
        cookies.remove("tokenResetPassword", { path: "/" });

      if (cookies.get("jwtToken") !== "")
        cookies.remove("jwtToken", { path: "/" });

      clearInfos();
      setLoadingToFalse();
      clearRegisterData();
    }
  }, [clearInfos, setLoadingToFalse, clearRegisterData]);

  const alertLoginError = (response) => {
    return Swal.fire({
      icon: "error",
      title: "Login Gagal",
      text: response,
    });
  };

  return (
    <>
      <Helmet>
        <title>Akademik - Login</title>
      </Helmet>
      <Row className="m-0 justify-content-center">
        <Col
          sm="8"
          xl="7"
          lg="10"
          md="8"
          className="d-flex justify-content-center"
        >
          <Card className="login-card rounded-0 mb-0 w-100">
            <Row className="m-0">
              <Col
                lg="6"
                className="d-lg-block d-none text-center align-self-center py-0"
              >
                <img src={loginImg} alt="loginImg" className="img-fluid" />
              </Col>
              <Col lg="6" md="12" className="p-0">
                <Card className="rounded-0 mb-0 px-2">
                  <CardBody>
                    <h4 className="pb-1">Login</h4>
                    <Formik
                      initialValues={{ nisornik: "", password: "" }}
                      onSubmit={(values) => {
                        loginUser(values, alertLoginError);
                      }}
                    >
                      {({ handleChange }) => (
                        <Form>
                          <FormGroup className="form-label-group position-relative has-icon-left">
                            <Input
                              type="text"
                              name="nisornik"
                              placeholder="NIS"
                              onChange={handleChange}
                            />
                            <div className="form-control-position">
                              <Mail size={15} />
                            </div>
                            <Label>NIS</Label>
                          </FormGroup>
                          <FormGroup className="form-label-group position-relative has-icon-left">
                            <Input
                              type="password"
                              placeholder="Password"
                              name="password"
                              onChange={handleChange}
                            />
                            <div className="form-control-position">
                              <Lock size={15} />
                            </div>
                            <Label>Password</Label>
                          </FormGroup>
                          <FormGroup className="d-flex justify-content-between align-items-center">
                            <Checkbox
                              color="primary"
                              icon={<Check className="vx-icon" size={16} />}
                              label="Remember me"
                            />
                            <div
                              onClick={() => history.push("/forgot-password")}
                              className="float-right text-primary cursor-pointer "
                            >
                              Forgot Password?
                            </div>
                          </FormGroup>
                          <div className="d-flex justify-content-between">
                            <Button.Ripple
                              color="primary"
                              outline
                              onClick={() => {
                                history.push("/register");
                              }}
                            >
                              Register
                            </Button.Ripple>
                            {isLoading ? (
                              <Button.Ripple
                                color="primary"
                                disabled={isLoading}
                              >
                                <Spinner color="white" size="sm" />
                                <span className="ml-50">Loading...</span>
                              </Button.Ripple>
                            ) : (
                              <Button.Ripple color="primary" type="submit">
                                Login
                              </Button.Ripple>
                            )}
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </CardBody>
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
    isLoading: state.auth.auth.onRequest,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (values, alertError) => dispatch(loginUser(values, alertError)),
    clearInfos: () => dispatch(clearInfos()),
    setLoadingToFalse: () => dispatch(setLoadingToFalse()),
    clearRegisterData: () => dispatch(clearRegisterData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
