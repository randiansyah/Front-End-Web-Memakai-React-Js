import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Spinner, Alert } from "reactstrap";
import Swal from "sweetalert2";
import useQuery from "../../../../hooks/useQuery";
import { validateRegisterToken } from "../../../../redux/actions/auth/validateToken";

const ValidateTokenRegisterPage = ({ ...props }) => {
  const { validateRegisterToken, isLoading, info } = props;
  const history = useHistory();
  let query = useQuery();

  const onSuccess = (response) =>
    Swal.fire({
      icon: "success",
      title: "Validasi Akun Sukses",
      text: response,
    }).then(() => history.push("/login"));

  const onError = () => history.push("/login");

  useEffect(() => {
    validateRegisterToken(query.get("token"), onSuccess, onError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>Akademi - Validasi Email Register</Helmet>
      <div className="d-flex justify-content-center align-items-center vh-100">
        {isLoading ? (
          <Spinner style={{ width: "4rem", height: "4rem" }} color="success" />
        ) : null}
        {info.id === "REGISTER_TOKEN_IS_NOT_VALID" ? (
          <div style={{ width: "70%" }}>
            <Alert color="danger">
              {" "}
              <div
                style={{
                  padding: "20px",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                className="d-flex justify-content-center align-items-center"
              >
                {info.message}
              </div>
            </Alert>
          </div>
        ) : null}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.register.register.isLoading,
    info: state.info.infos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    validateRegisterToken: (token, onSuccess, onError) =>
      dispatch(validateRegisterToken(token, onSuccess, onError)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ValidateTokenRegisterPage);
