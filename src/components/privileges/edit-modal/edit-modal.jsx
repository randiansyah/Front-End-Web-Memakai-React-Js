import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { FieldArray, Form, Formik } from "formik";
import { connect } from "react-redux";
import { updatePrivillages } from "../../../redux/actions/privileges/privilegesActions";
import Swal from "sweetalert2";

const PostModalComponent = ({ ...props }) => {
  const {
    modal,
    toggle,
    functions,
    dataToModal,
    updatePrivillages,
    roleByID,
  } = props;

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
    <Modal isOpen={modal} toggle={() => toggle(false)}>
      <ModalHeader toggle={() => toggle(false)}>Pilih Fungsi</ModalHeader>
      <Formik
        initialValues={{
          role: roleByID.name && roleByID.name,
          menu_id: dataToModal.menu_id,
          function_id: dataToModal.function_id,
        }}
        enableReinitialize={true}
        onSubmit={(values) =>
          updatePrivillages(values, alertSuccess, alertError)
        }
      >
        {({ values }) => (
          <Form>
            <ModalBody>
              <FieldArray
                name="function_id"
                render={(arrayHelpers) => (
                  <>
                    {functions.map((data, idx) => (
                      <label key={idx}>
                        <input
                          name="function_id"
                          type="checkbox"
                          value={idx + 1}
                          checked={values.function_id.includes(data.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              arrayHelpers.push(data.id);
                            } else {
                              const idx = values.function_id.indexOf(data.id);
                              arrayHelpers.remove(idx);
                            }
                          }}
                        />
                        <span className="mr-1" style={{ marginLeft: "5px" }}>
                          {data.name}
                        </span>
                      </label>
                    ))}
                  </>
                )}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                type="submit"
                onClick={() => toggle(false)}
              >
                Simpan
              </Button>{" "}
              <Button color="grey" onClick={() => toggle(false)}>
                Tutup
              </Button>
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePrivillages: (val, onSuccess, onFailure) =>
      dispatch(updatePrivillages(val, onSuccess, onFailure)),
  };
};

export default connect(null, mapDispatchToProps)(PostModalComponent);
