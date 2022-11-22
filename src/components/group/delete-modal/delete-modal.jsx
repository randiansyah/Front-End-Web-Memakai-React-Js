import { Formik, Form } from "formik";
import React from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { deleteGroup } from "../../../redux/actions/group/groupActions";
import Swal from "sweetalert2";

const DeleteModalComponent = ({ ...props }) => {
  const { modal, toggle, data, deleteGroup } = props;

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
          onSubmit={(values) =>
            deleteGroup(values.id, alertSuccess, alertError)
          }
        >
          {() => (
            <Form>
              <ModalHeader toggle={() => toggle(false)}>
                Hapus Ruangan
              </ModalHeader>
              <ModalBody>
                Apakah anda yakin ingin menghapus {data.name}?
              </ModalBody>
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
    deleteGroup: (id, onSuccess, onFailure) =>
      dispatch(deleteGroup(id, onSuccess, onFailure)),
  };
};

export default connect(null, mapDispatchToProps)(DeleteModalComponent);
