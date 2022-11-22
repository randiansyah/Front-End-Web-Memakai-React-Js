import { Formik, Form } from "formik";
import React from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Swal from "sweetalert2";
import {
  deleteUsersByID,
  postActiveUserByID,
} from "../../../redux/actions/users/usersActions";

const PostModalComponent = ({ ...props }) => {
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
                Aktifkan user
              </ModalHeader>
              <ModalBody>
                Apakah anda yakin ingin mengaktifkan {data.fullname}?
              </ModalBody>
              <ModalFooter>
                <Button color="success" type="submit" onClick={toggle}>
                  Aktifkan
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
    postActiveUserByID: (id, onError, onSuccess) =>
      dispatch(postActiveUserByID(id, onError, onSuccess)),
    deleteUsersByID: (id, onError, onSuccess) =>
      dispatch(deleteUsersByID(id, onError, onSuccess)),
  };
};

export default connect(null, mapDispatchToProps)(PostModalComponent);
