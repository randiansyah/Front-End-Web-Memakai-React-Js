import { Formik, Form } from "formik";
import React from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { deleteMenu } from "../../../redux/actions/menus/menusActions";
import Swal from "sweetalert2";

const DeleteModalComponent = ({ ...props }) => {
  const { modal, toggle, data, deleteMenu } = props;

  const alertSuccess = (response, title) => {
    return Swal.fire({
      icon: "success",
      title,
      text: response,
    });
  };

  const alertError = (response, title) => {
    return Swal.fire({
      icon: "error",
      title,
      text: response,
    });
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={() => toggle(false)}>
        <Formik
          initialValues={{ id: data.id }}
          enableReinitialize={true}
          onSubmit={(values) => deleteMenu(values.id, alertSuccess, alertError)}
        >
          {() => (
            <Form>
              <ModalHeader toggle={() => toggle(false)}>Hapus menu</ModalHeader>
              <ModalBody>Apakah anda yakin ingin menghapus menu ini?</ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  type="submit"
                  onClick={() => toggle(false)}
                >
                  Hapus
                </Button>{" "}
                <Button color="grey" onClick={() => toggle(false)}>
                  Tutup
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteMenu: (id, onSuccess, onFailure) =>
      dispatch(deleteMenu(id, onSuccess, onFailure)),
  };
};

export default connect(null, mapDispatchToProps)(DeleteModalComponent);
