import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Card, Badge, Button } from "reactstrap";
import { getRoomsByID } from "../../../redux/actions/rooms/roomsActions";
import moment from "moment";
import localization from "moment/locale/id";

export const DetailRoomsPage = ({ ...props }) => {
  const { getRoomsByID, match, room, isLoading } = props;
  const paramsID = match.params.id;
  const history = useHistory();

  useEffect(() => {
    getRoomsByID(paramsID);

    return () => {
      getRoomsByID(paramsID);
    };
  }, [paramsID, getRoomsByID]);

  console.log(room);

  return (
    <div>
      <Helmet>
        <title>Akademik - Detail Ruangan</title>
      </Helmet>
      <h4>Detail Ruangan</h4>
      <hr></hr>
      <Card>
        <div className="p-2">
          {isLoading ? "Loading..." : null}
          {isLoading ? null : (
            <div className="d-flex w-75 flex-sm-row flex-column justify-content-between">
              <div className="">
                <div>
                  <div>
                    <div>
                      <h6 style={{ fontWeight: 300 }}>Nama Ruangan</h6>
                    </div>
                    <div>
                      <h6>{room.room_name}</h6>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mt-2">
                    <div>
                      <h6 style={{ fontWeight: 300 }}>Kapasitas</h6>
                    </div>
                    <div>
                      <h6>{room.capacity}</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="mt-sm-0 mt-2">
                  <div>
                    <h6 style={{ fontWeight: 300 }}>Ruangan dibuat</h6>
                  </div>
                  <div>
                    <h6>
                      {moment(room.createdAt)
                        .locale("id", localization)
                        .format("LL")}
                    </h6>
                  </div>
                </div>
                <div className="mt-2">
                  <div>
                    <h6 style={{ fontWeight: 300 }}>Ruangan diperbarui</h6>
                  </div>
                  <div>
                    <h6>
                      {moment(room.updatedAt)
                        .locale("id", localization)
                        .format("LL")}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="mt-sm-0 mt-2">
                  <div>
                    <h6 style={{ fontWeight: 300 }}>Status</h6>
                  </div>
                  <div>
                    <Badge
                      color={
                        room.is_active === 1 ? "light-success" : "light-danger"
                      }
                      pill
                    >
                      {room.is_active === 1 ? "Aktif" : "Nonaktif"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
      <Button.Ripple color="primary" onClick={() => history.push("/rooms")}>
        Kembali
      </Button.Ripple>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    room: state.rooms.rooms.rooms_obj,
    isLoading: state.rooms.rooms.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRoomsByID: (id) => dispatch(getRoomsByID(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailRoomsPage);
