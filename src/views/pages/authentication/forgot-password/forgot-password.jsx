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
  Spinner,
} from "reactstrap";
import classnames from "classnames";
import registerImg from "../../../../assets/img/pages/register.jpg";
import "../../../../assets/scss/pages/authentication.scss";
import { useHistory } from "react-router-dom";
import {
  forgotPassword,
  setLoadingToFalse,
} from "../../../../redux/actions/auth/loginActions";
import { Formik, Form } from "formik";
import Swal from "sweetalert2";

const ForgotPasswordPage = ({ ...props }) => {
  const history = useHistory();
  const isFirstRender = useRef(true);

  const { forgotPassword, isLoading, setLoadingToFalse } = props;

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setLoadingToFalse();
    }
  }, [setLoadingToFalse]);

  const alertEmailSent = (response, isSuccess = true) => {
    return Swal.fire({
      icon: isSuccess ? "success" : "error",
      title: isSuccess
        ? "Silahkan cek email anda"
        : "Email verifikasi tidak terkirim",
      text: response,
    });
  };

  return (
    <>
      <Row className="m-0 justify-content-center">
        <Helmet>
          <title>Akademik - Lupa Password</title>
        </Helmet>
        <Col
          sm="8"
          xl="7"
          lg="10"
          md="8"
          className="d-flex justify-content-center"
        >
          <Card className="bg-authentication rounded-0 mb-0 w-100">
            <Row className="m-0">
              <Col
                lg="6"
                className="d-lg-block d-none text-center align-self-center px-1 py-0"
              >
                <img className="mr-1" src={registerImg} alt="registerImg" />
              </Col>
              <Col lg="6" md="12" className="p-0">
                <Card className="rounded-0 mb-0 p-sm-2 ">
                  <Nav tabs className="px-2">
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: "1",
                        })}
                      >
                        Lupa Password
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <Formik
                    initialValues={{ email: "" }}
                    onSubmit={(values) =>
                      forgotPassword(values, alertEmailSent)
                    }
                  >
                    {({ handleChange }) => (
                      <Form>
                        <CardBody>
                          <TabContent>
                            <TabPane>
                              <FormGroup className="form-label-group mt-1">
                                <Input
                                  type="text"
                                  name="email"
                                  id="email"
                                  onChange={handleChange}
                                  placeholder="Alamat Email"
                                />
                                <Label>Alamat Email</Label>
                              </FormGroup>
                            </TabPane>
                          </TabContent>
                          <div className="d-flex mt-4 justify-content-between align-items-center">
                            <div>
                              <Button.Ripple
                                onClick={() => history.push("/login")}
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
    message: state.info.infos,
    isLoading: state.auth.auth.onRequest,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPassword: (email, sweetAlert) =>
      dispatch(forgotPassword(email, sweetAlert)),
    setLoadingToFalse: () => dispatch(setLoadingToFalse()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage);
