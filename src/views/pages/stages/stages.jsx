import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import DataTableStages from "../../../components/stages/DataTableStages";
import { fetchAllStages } from "../../../redux/actions/stages/stagesActions";
import PostModalComponent from "../../../components/stages/post-modal/post-modal";
import EditModalComponent from "../../../components/stages/edit-modal/edit-modal";
import PutActiveModalComponent from "../../../components/stages/put-active-modal/put-active-modal";
import DeleteModalComponent from "../../../components/stages/delete-modal/delete-modal";

const StagesPage = ({ ...props }) => {
  const { stagesData, isLoading, fetchAllStages } = props;
  const [dataToModal, setDataToModal] = useState([]);
  const [openPostModal, setOpenPostModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openPutActiveModal, setOpenPutActiveModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    fetchAllStages();
    return () => {
      fetchAllStages();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Helmet>
        <title>Akademik - Tingkatan</title>
      </Helmet>
      <DataTableStages
        stages={stagesData}
        isLoading={isLoading}
        setData={setDataToModal}
        setOpenPostModal={setOpenPostModal}
        setOpenEditModal={setOpenEditModal}
        setOpenPutActiveModal={setOpenPutActiveModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />
      <PostModalComponent modal={openPostModal} toggle={setOpenPostModal} />
      <EditModalComponent
        modal={openEditModal}
        toggle={setOpenEditModal}
        data={dataToModal}
      />
      <PutActiveModalComponent
        modal={openPutActiveModal}
        toggle={setOpenPutActiveModal}
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
  stagesData: state.stages.stages.stages,
  isLoading: state.stages.stages.isLoading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllStages: () => dispatch(fetchAllStages()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StagesPage);
