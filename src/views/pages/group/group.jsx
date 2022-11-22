import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import DataTableGroup from "../../../components/@vuexy/data-tables/DataTableGroup";
import { fetchAllGroupData } from "../../../redux/actions/group/groupActions";
import PostModalComponent from "../../../components/group/post-modal/post-modal";
import EditModalComponent from "../../../components/group/edit-modal/edit-modal";
import DeleteModalComponent from "../../../components/group/delete-modal/delete-modal";
import { fetchAllCurriculum } from "../../../redux/actions/curriculum/curriculumActions";

const GroupPages = ({ ...props }) => {
  const {
    fetchAllGroupData,
    allGroupData,
    fetchAllCurriculum,
    curriculumData,
    isLoading,
  } = props;
  const [dataToModal, setDataToModal] = useState([]);
  const [openPostModal, setOpenPostModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    fetchAllGroupData();
    fetchAllCurriculum();

    return () => {
      fetchAllGroupData();
      fetchAllCurriculum();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Helmet>
        <title>Akademik - Group</title>
      </Helmet>
      <DataTableGroup
        isLoading={isLoading}
        group={allGroupData}
        setData={setDataToModal}
        setOpenPostModal={setOpenPostModal}
        setOpenEditModal={setOpenEditModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />
      <PostModalComponent
        modal={openPostModal}
        toggle={setOpenPostModal}
        curriculumData={curriculumData}
      />
      <EditModalComponent
        data={dataToModal}
        modal={openEditModal}
        toggle={setOpenEditModal}
        curriculumData={curriculumData}
      />
      <DeleteModalComponent
        data={dataToModal}
        modal={openDeleteModal}
        toggle={setOpenDeleteModal}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allGroupData: state.group.group.group,
    isLoading: state.group.group.isLoading,
    curriculumData: state.curriculum.curriculum.curriculum,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllGroupData: () => dispatch(fetchAllGroupData()),
    fetchAllCurriculum: () => dispatch(fetchAllCurriculum()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupPages);
