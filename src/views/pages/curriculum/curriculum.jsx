import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import DataTableCurriculum from "../../../components/@vuexy/data-tables/DataTableCurriculum";
import { fetchAllCurriculum } from "../../../redux/actions/curriculum/curriculumActions";
import PostModalComponent from "../../../components/curriculum/post-modal/post-modal";
import PutActiveModalComponent from "../../../components/curriculum/put-active-modal/put-active-modal";
import EditModalComponent from "../../../components/curriculum/edit-modal/edit-modal";
import DeleteModalComponent from "../../../components/curriculum/delete-modal/delete-modal";

const CurriculumPage = ({ ...props }) => {
  const { fetchAllCurriculum, curriculum } = props;
  const [openPostModal, setOpenPostModal] = useState(false);
  const [openPutActiveModal, setOpenPutActiveModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [dataToModal, setDataToModal] = useState([]);

  useEffect(() => {
    fetchAllCurriculum();

    return () => {
      fetchAllCurriculum();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Helmet>
        <title>Akademik - Kurikulum</title>
      </Helmet>
      <DataTableCurriculum
        curriculum={curriculum}
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
  curriculum: state.curriculum.curriculum.curriculum,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllCurriculum: () => dispatch(fetchAllCurriculum()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurriculumPage);
