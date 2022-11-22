import { Formik, Form } from "formik";
import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { updateStages } from "../../../redux/actions/stages/stagesActions";
import Swal from "sweetalert2";

const EditModalComponent = ({ ...props }) => {
  const { modal, toggle, data, updateStages } = props;

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
          initialValues={{
            classroom: data.classroom,
            stages: data.stages,
            is_active: data.is_active,
            is_deleted: data.is_deleted,
          }}
          enableReinitialize={true}
          onSubmit={(values) =>
            updateStages(values, data.id, alertSuccess, alertError)
          }
        >
          {({ handleChange, values }) => (
            <Form>
              <ModalHeader toggle={() => toggle(false)}>
                Edit Tingkatan
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label for="classroom">
                    <b>Kelas</b>
                  </Label>
                  <Input
                    type="text"
                    value={values.classroom}
                    onChange={handleChange}
                    id="classroom"
                    name="classroom"
                    placeholder="Masukkan kelas"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="stages">
                    <b>Tingkatan</b>
                  </Label>
                  <Input
                    type="text"
                    value={values.stages}
                    onChange={handleChange}
                    id="stages"
                    name="stages"
                    placeholder="Masukkan tingkatan"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="is_active">
                    <b>Status</b>
                  </Label>
                  <Input
                    type="select"
                    value={values.is_active}
                    onChange={handleChange}
                    name="is_active"
                    id="is_active"
                  >
                    <option value="" disabled>
                      --
                    </option>
                    <option value="0">Nonaktif</option>
                    <option value="1">Aktif</option>
                  </Input>
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="success"
                  type="submit"
                  onClick={() => toggle(false)}
                >
                  Edit
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
    updateStages: (val, id, onSuccess, onFailure) =>
      dispatch(updateStages(val, id, onSuccess, onFailure)),
  };
};

export default connect(null, mapDispatchToProps)(EditModalComponent);
