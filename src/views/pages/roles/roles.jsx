import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import DataTableRoles from "../../../components/roles/DataTableRoles";
import { fetchAllRoles } from "../../../redux/actions/roles/rolesActions";
import PostModalComponent from "../../../components/roles/post-modal/post-modal";
import PutActiveModalComponent from "../../../components/roles/put-active-modal/put-active-modal";
import EditModalComponent from "../../../components/roles/edit-modal/edit-modal";
import DeleteModalComponent from "../../../components/roles/delete-modal/delete-modal";
import { Helmet } from "react-helmet";

const RolesPage = ({ ...props }) => {
  const { roles, fetchAllRoles, isLoading } = props;
  const [dataToModal, setDataToModal] = useState([]);
  const [openPostModal, setOpenPostModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openPutActiveModal, setOpenPutActiveModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    fetchAllRoles();
    return () => {
      fetchAllRoles();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Helmet>
        <title>Akademik - Peran</title>
      </Helmet>
      <DataTableRoles
        isLoading={isLoading}
        roles={roles}
        setData={setDataToModal}
        setOpenPostModal={setOpenPostModal}
        setOpenEditModal={setOpenEditModal}
        setOpenPutActiveModal={setOpenPutActiveModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />
      <PostModalComponent modal={openPostModal} toggle={setOpenPostModal} />
      <PutActiveModalComponent
        modal={openPutActiveModal}
        toggle={setOpenPutActiveModal}
        data={dataToModal}
      />
      <EditModalComponent
        modal={openEditModal}
        toggle={setOpenEditModal}
        data={dataToModal}
      />
      <DeleteModalComponent
        modal={openDeleteModal}
        toggle={setOpenDeleteModal}
        data={dataToModal}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  roles: state.roles.roles.roles,
  isLoading: state.roles.roles.isLoading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllRoles: () => dispatch(fetchAllRoles()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RolesPage);
