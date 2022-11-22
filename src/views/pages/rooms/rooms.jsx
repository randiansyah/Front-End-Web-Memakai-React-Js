import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { fetchAllRooms } from "../../../redux/actions/rooms/roomsActions";
import PostModalComponent from "../../../components/rooms/post-modal/post-modal";
import EditModalComponent from "../../../components/rooms/edit-modal/edit-modal";
import DeleteModalComponent from "../../../components/rooms/delete-modal/delete-modal";
import DataTableRooms from "../../../components/@vuexy/data-tables/DataTableRooms";

const RoomsPage = ({ ...props }) => {
  const { fetchAllRooms, rooms, isLoading } = props;
  const [openPostModal, setOpenPostModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAllRooms();
    return () => {
      fetchAllRooms();
    };
  }, [fetchAllRooms]);

  return (
    <>
      <Helmet>
        <title>Akademik - Ruangan</title>
      </Helmet>
      <DataTableRooms
        rooms={rooms}
        isLoading={isLoading}
        setOpenPostModal={setOpenPostModal}
        setOpenDeleteModal={setOpenDeleteModal}
        setOpenEditModal={setOpenEditModal}
        setData={setData}
      />
      <PostModalComponent modal={openPostModal} toggle={setOpenPostModal} />
      <EditModalComponent
        modal={openEditModal}
        toggle={setOpenEditModal}
        data={data}
      />
      <DeleteModalComponent
        modal={openDeleteModal}
        toggle={setOpenDeleteModal}
        data={data}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms.rooms.rooms,
    isLoading: state.rooms.rooms.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllRooms: () => dispatch(fetchAllRooms()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomsPage);
