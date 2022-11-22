import { Formik, Form } from "formik";
import React from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Swal from "sweetalert2";
import { deleteUsersByID } from "../../../redux/actions/users/usersActions";

const DeleteModalComponent = ({ ...props }) => {
  const { modal, toggle, data, deleteUsersByID } = props;

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
      <Modal isOpen={modal} toggle={toggle}>
        <Formik
          initialValues={{ id: data.id }}
          enableReinitialize={true}
          onSubmit={(values) =>
            deleteUsersByID(values.id, alertError, alertSuccess)
          }
        >
          {() => (
            <Form>
              <ModalHeader toggle={() => toggle(false)}>
                Nonaktifkan user
              </ModalHeader>
              <ModalBody>
                Apakah anda yakin ingin menonaktifkan {data.fullname}?
              </ModalBody>
              <ModalFooter>
                <Button color="danger" type="submit" onClick={toggle}>
                  Nonaktifkan
                </Button>{" "}
                <Button color="grey" onClick={toggle}>
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
    deleteUsersByID: (id, onError, onSuccess) =>
      dispatch(deleteUsersByID(id, onError, onSuccess)),
  };
};

export default connect(null, mapDispatchToProps)(DeleteModalComponent);
