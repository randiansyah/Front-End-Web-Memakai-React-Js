import { Formik, Form } from "formik";
import React from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Swal from "sweetalert2";
import { putActiveRole } from "../../../redux/actions/roles/rolesActions";

const PutActiveModalComponent = ({ ...props }) => {
  const { modal, toggle, data, putActiveRole } = props;

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
            putActiveRole(values.id, alertSuccess, alertError)
          }
        >
          {() => (
            <Form>
              <ModalHeader toggle={() => toggle(false)}>
                Aktifkan Peran
              </ModalHeader>
              <ModalBody>
                Apakah anda yakin ingin mengaktifkan peran ini?
              </ModalBody>
              <ModalFooter>
                <Button
                  color="info"
                  type="submit"
                  onClick={() => toggle(false)}
                >
                  Aktifkan
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
    putActiveRole: (id, onSuccess, onFailure) =>
      dispatch(putActiveRole(id, onSuccess, onFailure)),
  };
};
export default connect(null, mapDispatchToProps)(PutActiveModalComponent);
