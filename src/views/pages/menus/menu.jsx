import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import {
  fetchOptions,
  fetchAllMenus,
  fetchSidebarMenu,
  fetchToTableCollapse,
} from "../../../redux/actions/menus/menusActions";
import PostModalComponent from "../../../components/menus/post-modal/post-modal";
import EditModalComponent from "../../../components/menus/edit-modal/edit-modal";
import DeleteModalComponent from "../../../components/menus/delete-modal/delete-modal";
import DataTableExpandableMenus from "../../../components/@vuexy/data-tables/DataTableExpandableMenus";

const HomePage = ({ ...props }) => {
  const {
    fetchAllMenus,
    isLoading,
    fetchOptions,
    options,
    fetchSidebarMenu,
    fetchToTableCollapse,
    tableCollapse,
  } = props;
  const isFirstRender = useRef(true);
  const [dataToModal, setDataToModal] = useState([]);
  const [postModal, setPostModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      fetchAllMenus();
      fetchOptions();
      fetchSidebarMenu();
      fetchToTableCollapse();
    }

    return () => {
      fetchAllMenus();
      fetchOptions();
      fetchSidebarMenu();
      fetchToTableCollapse();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>Akademik - Menu</title>
      </Helmet>
      <DataTableExpandableMenus
        data={tableCollapse}
        isLoading={isLoading}
        setPostModal={setPostModal}
        setEditModal={setEditModal}
        setDeleteModal={setDeleteModal}
        setDataToModal={setDataToModal}
      />
      <PostModalComponent
        options={options}
        modal={postModal}
        toggle={setPostModal}
      />
      <EditModalComponent
        options={options}
        toggle={setEditModal}
        modal={editModal}
        data={dataToModal}
      />
      <DeleteModalComponent
        modal={deleteModal}
        toggle={setDeleteModal}
        data={dataToModal}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    menus: state.menus.menus.menus,
    navbarData: state.menus.menus.navbarData,
    isLoading: state.menus.menus.isLoading,
    options: state.menus.menus.options,
    tableCollapse: state.menus.menus.tableCollapse,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllMenus: () => dispatch(fetchAllMenus()),
    fetchToTableCollapse: () => dispatch(fetchToTableCollapse()),
    fetchOptions: () => dispatch(fetchOptions()),
    fetchSidebarMenu: () => dispatch(fetchSidebarMenu()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
