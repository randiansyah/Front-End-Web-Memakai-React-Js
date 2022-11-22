import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Badge, Card } from "reactstrap";
import Avatar from "../../../components/@vuexy/avatar/AvatarComponent";
import {
  fetchUsersDataByID,
  fetchUsersRole,
} from "../../../redux/actions/users/usersActions";
import moment from "moment";
import localization from "moment/locale/id";
import { Button } from "reactstrap";
import { Edit } from "react-feather";
import { useHistory } from "react-router-dom";
import EditModalComponent from "../../../components/users/edit-modal/edit-modal";

export const DetailUserPage = ({ ...props }) => {
  const {
    fetchUsersDataByID,
    match,
    usersDataByID,
    info,
    fetchUsersRole,
    roles,
    isLoading,
  } = props;
  const history = useHistory();
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const toggleModal = () => setOpenModalEdit(!openModalEdit);

  const paramsID = match.params.id;

  useEffect(() => {
    fetchUsersDataByID(paramsID);
    fetchUsersRole();

    return () => {
      fetchUsersDataByID(paramsID);
      fetchUsersRole();
    };
  }, [paramsID, fetchUsersDataByID, fetchUsersRole]);

  const checkData = (val) => {
    return val === undefined || val === null ? "" : val;
  };

  return (
    <>
      {info === "FETCH_USERS_BY_ID_FAILURE" ? "Internet Error" : null}
      {info === "FETCH_USERS_BY_ID_FAILURE" ? null : (
        <div className="">
          <h4>Detail Pengguna</h4>
          <hr></hr>
          <Card style={{ boxShadow: "none" }}>
            <div className="d-flex justify-content-center justify-content-sm-between p-2">
              {isLoading ? "Loading ..." : null}
              {isLoading ? null : (
                <div className="d-flex flex-sm-row justify-content-between flex-column align-items-sm-stretch align-items-center">
                  <div>
                    <Avatar
                      size="xl"
                      height={64}
                      width={64}
                      img={usersDataByID.avatar}
                      onError={(e) => {
                        return (e.target.src =
                          "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png");
                      }}
                    />
                  </div>
                  <div className="ml-3 mt-3 mt-sm-0">
                    <div className="d-flex flex-sm-row flex-column justify-content-start align-items-baseline">
                      <div>
                        <div>
                          <div>
                            <h6 style={{ fontWeight: 300 }}>Nama Lengkap</h6>
                          </div>
                          <div>
                            <h6>{checkData(usersDataByID.fullname)}</h6>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div>
                            <h6 style={{ fontWeight: 300 }}>Role</h6>
                          </div>
                          <div>
                            <h6>{checkData(usersDataByID.role)}</h6>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div>
                            <h6 style={{ fontWeight: 300 }}>Email</h6>
                          </div>
                          <div>
                            <h6>{checkData(usersDataByID.email)}</h6>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 mt-sm-0 ml-0 ml-sm-4">
                        <div>
                          <div>
                            <h6 style={{ fontWeight: 300 }}>Data dibuat</h6>
                          </div>
                          <div>
                            <h6>
                              {moment(checkData(usersDataByID.created))
                                .locale("id", localization)
                                .format("LL")}
                            </h6>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div>
                            <h6 style={{ fontWeight: 300 }}>Status</h6>
                          </div>
                          <div>
                            {checkData(usersDataByID.isVerified) ? null : (
                              <Badge
                                color={checkData(
                                  usersDataByID.is_deleted === 1
                                    ? "light-success"
                                    : "light-danger"
                                )}
                                pill
                              >
                                {checkData(
                                  usersDataByID.is_deleted === 1
                                    ? "Aktif"
                                    : "Non Aktif"
                                )}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {isLoading ? null : (
                <div className="pr-2 pr-sm-0">
                  <Button
                    size="sm"
                    onClick={() => setOpenModalEdit(true)}
                    color="warning"
                  >
                    <Edit size={15} />
                  </Button>
                </div>
              )}
            </div>
          </Card>
          <Button.Ripple
            onClick={() => history.goBack()}
            color="primary"
            type="submit"
          >
            Kembali
          </Button.Ripple>
        </div>
      )}
      <EditModalComponent
        toggle={toggleModal}
        modal={openModalEdit}
        data={usersDataByID}
        checkData={checkData}
        roles={roles}
        id={paramsID}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    usersDataByID: state.users.users.users_data_id,
    isLoading: state.users.users.isLoading,
    info: state.info.infos.id,
    roles: state.users.users.roles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsersDataByID: (id) => dispatch(fetchUsersDataByID(id)),
    fetchUsersRole: () => dispatch(fetchUsersRole()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailUserPage);
