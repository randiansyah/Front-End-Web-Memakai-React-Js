import { Formik, Form } from "formik";
import React from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Swal from "sweetalert2";
import { putActiveStages } from "../../../redux/actions/stages/stagesActions";

const PutActiveModalComponent = ({ ...props }) => {
  const { modal, toggle, data, putActiveStages } = props;

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
            putActiveStages(values.id, alertSuccess, alertError)
          }
        >
          {() => (
            <Form>
              <ModalHeader toggle={() => toggle(false)}>
                Aktifkan Tingkatan
              </ModalHeader>
              <ModalBody>
                Apakah anda yakin ingin mengaktifkan tingkatan ini?
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
    putActiveStages: (id, onSuccess, onFailure) =>
      dispatch(putActiveStages(id, onSuccess, onFailure)),
  };
};
export default connect(null, mapDispatchToProps)(PutActiveModalComponent);
