import React from "react";
import {
  FormGroup,
  Input,
  Label,
  Button,
  InputGroup,
  InputGroupAddon,
  Spinner,
} from "reactstrap";
import { history } from "../../../../history";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../assets/scss/plugins/extensions/toastr.scss";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import {
  checkNis,
  clearRegisterData,
  postRegisterUser,
} from "../../../../redux/actions/register/registerActions";
import { Helmet } from "react-helmet";
import { AlertCircle, CheckCircle } from "react-feather";

const RegisterForm = ({ ...props }) => {
  const {
    checkNis,
    isLoading,
    dataNIS,
    clearRegisterData,
    postRegisterUser,
    role,
  } = props;

  const onSuccess = (response) =>
    setTimeout(() => {
      toast(
        <h6 className="text-success text-center">
          <CheckCircle /> {response}
        </h6>,
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
    }, 1000);

  const onError = (message) =>
    setTimeout(() => {
      toast.error(
        <h6 className="text-center text-white">
          <AlertCircle /> {message}
        </h6>,
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
    }, 1000);

  return (
    <div>
      <Helmet>
        <title>Akademik - Register</title>
      </Helmet>
      {dataNIS !== null ? null : (
        <>
          <Formik
            initialValues={{ nis: "" }}
            onSubmit={(values) => checkNis(values, onError, onSuccess)}
          >
            {({ handleChange }) => (
              <Form>
                <FormGroup className="form-label-group">
                  <InputGroup>
                    <Input
                      type="text"
                      name="nis"
                      id="nis"
                      onChange={handleChange}
                      placeholder="NIS"
                    />
                    <InputGroupAddon addonType="append">
                      {isLoading ? (
                        <Button.Ripple color="primary" disabled={isLoading}>
                          <Spinner color="white" size="sm" />
                          <span>Loading...</span>
                        </Button.Ripple>
                      ) : (
                        <Button.Ripple type="submit" color="primary">
                          Cek
                        </Button.Ripple>
                      )}
                    </InputGroupAddon>
                  </InputGroup>
                  <Label>NIS</Label>
                </FormGroup>
              </Form>
            )}
          </Formik>
          <Button.Ripple
            color="primary"
            outline
            onClick={() => {
              history.push("/login");
            }}
          >
            Login
          </Button.Ripple>
        </>
      )}
      {dataNIS !== null ? (
        <>
          <Formik
            initialValues={{
              nisornik: dataNIS !== null ? dataNIS : "",
              fullname: "",
              email: "",
              password: "",
              confirmPassword: "",
              role,
            }}
            enableReinitialize={true}
            onSubmit={(values) => postRegisterUser(values, onSuccess, onError)}
          >
            {({ handleChange, values }) => (
              <Form>
                <FormGroup className="form-label-group">
                  <InputGroup>
                    <Input
                      type="text"
                      name="nisornik"
                      id="nisornik"
                      disabled
                      value={values.nisornik}
                      onChange={handleChange}
                      placeholder="NIS"
                    />
                    <InputGroupAddon addonType="append">
                      <Button.Ripple
                        color="primary"
                        onClick={() => clearRegisterData()}
                      >
                        Reset
                      </Button.Ripple>
                    </InputGroupAddon>
                  </InputGroup>
                  <Label>NIS</Label>
                </FormGroup>
                <FormGroup className="form-label-group">
                  <Input
                    type="text"
                    id="fullname"
                    onChange={handleChange}
                    name="fullname"
                    placeholder="Nama Lengkap"
                  />
                  <Label>Name</Label>
                </FormGroup>
                <FormGroup className="form-label-group">
                  <Input
                    type="email"
                    id="email"
                    onChange={handleChange}
                    name="email"
                    placeholder="Email"
                  />
                  <Label>Email</Label>
                </FormGroup>
                <FormGroup className="form-label-group">
                  <Input
                    type="password"
                    id="password"
                    onChange={handleChange}
                    name="password"
                    placeholder="Password"
                  />
                  <Label>Password</Label>
                </FormGroup>
                <FormGroup className="form-label-group">
                  <Input
                    type="password"
                    id="confirmPassword"
                    onChange={handleChange}
                    name="confirmPassword"
                    placeholder="Ulangi Password"
                  />
                  <Label>Ulangi Password</Label>
                </FormGroup>
                <div className="d-flex justify-content-between">
                  <Button.Ripple
                    color="primary"
                    outline
                    onClick={() => {
                      history.push("/login");
                    }}
                  >
                    Login
                  </Button.Ripple>
                  {isLoading ? (
                    <Button.Ripple color="primary" disabled={isLoading}>
                      <Spinner color="white" size="sm" />
                      <span>Loading...</span>
                    </Button.Ripple>
                  ) : (
                    <Button.Ripple color="primary" type="submit">
                      {" "}
                      Register{" "}
                    </Button.Ripple>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </>
      ) : null}

      <ToastContainer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    info: state.info.infos.id,
    isLoading: state.register.register.isLoading,
    dataNIS: state.register.register.nis,
    role: state.register.register.data.role,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkNis: (nis, onError, onSuccess) =>
      dispatch(checkNis(nis, onError, onSuccess)),
    clearRegisterData: () => dispatch(clearRegisterData()),
    postRegisterUser: (values, onSuccess, onError) =>
      dispatch(postRegisterUser(values, onSuccess, onError)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
