import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { Button, Spinner } from "reactstrap";
import DataTablePrivileges from "../../../../components/@vuexy/data-tables/DataTablePrivileges";
import {
  fetchPrivillagesFunctions,
  fetchPrivilegesData,
} from "../../../../redux/actions/privileges/privilegesActions";
import isEmpty from "../../../../assets/img/svg/data_is_empty.svg";

const DetailsPrevilegesPage = ({ ...props }) => {
  const {
    fetchPrivillagesFunctions,
    fetchPrivilegesData,
    functions,
    match,
    menuData,
    roleByID,
    isLoading,
  } = props;
  const history = useHistory();

  const params = match.params.id;

  useEffect(() => {
    fetchPrivillagesFunctions();
    fetchPrivilegesData(params);

    return () => {
      fetchPrivillagesFunctions();
      fetchPrivilegesData(params);
    };
  }, [fetchPrivillagesFunctions, fetchPrivilegesData, params]);

  return (
    <div>
      <Helmet>
        <title>Akademik - Hak Istimewa</title>
      </Helmet>
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "70vh" }}
        >
          <Spinner style={{ width: "3rem", height: "3rem" }} color="success" />
        </div>
      ) : null}
      {isLoading ? null : menuData.length < 1 ? (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img
            src={isEmpty}
            alt="Data kosong"
            width="30%"
            height="auto"
            className="d-flex mx-auto mb-3"
          />

          <h4 className="mx-auto mb-2">Data Kosong</h4>
          <Button.Ripple
            color="primary"
            style={{ display: menuData.length < 1 ? "flex" : "none" }}
            onClick={() => history.push("/privileges")}
          >
            Kembali
          </Button.Ripple>
        </div>
      ) : (
        <DataTablePrivileges
          data={menuData}
          functions={functions}
          params={params}
          roleByID={roleByID}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    functions: state.privillages.privillages.functions,
    menuData: state.privillages.privillages.privileges,
    roleByID: state.privillages.privillages.role_by_id,
    isLoading: state.privillages.privillages.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPrivillagesFunctions: () => dispatch(fetchPrivillagesFunctions()),
    fetchPrivilegesData: (id) => dispatch(fetchPrivilegesData(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsPrevilegesPage);
