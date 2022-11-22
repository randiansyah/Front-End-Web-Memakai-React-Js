import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { fetchAllYears } from "../../../redux/actions/years/yearsActions";
import DataTableYears from "../../../components/years/DataTableYears";
import PostModalComponent from "../../../components/years/post-modal/post-modal";
import EditModalComponent from "../../../components/years/edit-modal/edit-modal";
import PutActiveModalComponent from "../../../components/years/put-active-modal/put-active-modal";
import DeleteModalComponent from "../../../components/years/delete-modal/delete-modal";

const YearsPage = ({ ...props }) => {
  const { fetchAllYears, yearsData, isLoading } = props;
  const [dataToModal, setDataToModal] = useState([]);
  const [openPostModal, setOpenPostModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openPutActiveModal, setOpenPutActiveModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    fetchAllYears();

    return () => {
      fetchAllYears();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Helmet>
        <title>Akademik - Tahun Ajaran</title>
      </Helmet>
      <DataTableYears
        isLoading={isLoading}
        years={yearsData}
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
  yearsData: state.years.years.years,
  isLoading: state.years.years.isLoading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllYears: () => dispatch(fetchAllYears()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(YearsPage);
