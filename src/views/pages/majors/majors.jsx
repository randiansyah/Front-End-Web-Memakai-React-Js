import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import DataTableMajors from "../../../components/majors/DataTableMajors";
import PostModalComponent from "../../../components/majors/post-modal/post-modal";
import PutActiveModalComponent from "../../../components/majors/put-active-modal/put-active-modal";
import EditModalComponent from "../../../components/majors/edit-modal/edit-modal";
import DeleteModalComponent from "../../../components/majors/delete-modal/delete-modal";
import { fetchAllMajors } from "../../../redux/actions/majors/majorsActions";

const MajorsPage = ({ ...props }) => {
  const { fetchAllMajors, majorsData, isLoading } = props;
  const [dataToModal, setDataToModal] = useState([]);
  const [openPostModal, setOpenPostModal] = useState(false);
  const [openPutActiveModal, setOpenPutActiveModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    fetchAllMajors();

    return () => {
      fetchAllMajors();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Helmet>
        <title>Akademik - Jurusan</title>
      </Helmet>
      <DataTableMajors
        isLoading={isLoading}
        majors={majorsData}
        setData={setDataToModal}
        setOpenPostModal={setOpenPostModal}
        setOpenPutActiveModal={setOpenPutActiveModal}
        setOpenEditModal={setOpenEditModal}
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
  majorsData: state.majors.majors.majors,
  isLoading: state.majors.majors.isLoading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllMajors: () => dispatch(fetchAllMajors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MajorsPage);
