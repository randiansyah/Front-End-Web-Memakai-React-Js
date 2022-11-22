import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Alert, Spinner } from "reactstrap";
import useQuery from "../../../../hooks/useQuery";
import { validateToken } from "../../../../redux/actions/auth/validateToken";
import cookies from "js-cookie";
import { clearInfos } from "../../../../redux/actions/infos/infos";
import { useHistory } from "react-router-dom";

const ValidateTokenResetPasswordPage = ({ ...props }) => {
  const isFirstRender = useRef(true);
  let query = useQuery("token");
  const history = useHistory();

  const { validateToken, clearInfos, onRequest, message } = props;

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      const onSuccess = () => {
        cookies.set("tokenResetPassword", query.get("token"));
        return history.push(
          `/account/reset-password/act?valid_token=${query.get("token")}`
        );
      };

      validateToken(
        query.get("token"),
        onSuccess,
        () => {},
        "VALIDATE_ERROR_ON_RESET_PAGE"
      );

      clearInfos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>Akademi - Validasi Token</Helmet>
      <div className="d-flex justify-content-center align-items-center vh-100">
        {onRequest ? (
          <Spinner style={{ width: "4rem", height: "4rem" }} color="success" />
        ) : null}
        {message !== "" ? (
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
                {message}
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
    onRequest: state.auth.auth.onRequest,
    message: state.info.infos.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    validateToken: (token, callback, flag) =>
      dispatch(validateToken(token, callback, flag)),
    clearInfos: () => dispatch(clearInfos()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ValidateTokenResetPasswordPage);
