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
import Swal from "sweetalert2";
import { postCurriculum } from "../../../redux/actions/curriculum/curriculumActions";

const PostModalComponent = ({ ...props }) => {
  const { modal, toggle, postCurriculum } = props;

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
          initialValues={{ name: "", is_active: "" }}
          enableReinitialize={true}
          onSubmit={(values) =>
            postCurriculum(values, alertSuccess, alertError)
          }
        >
          {({ handleChange, values }) => (
            <Form>
              <ModalHeader toggle={() => toggle(false)}>
                Tambah Kurikulum
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label for="name">
                    <b>Nama Kurikulum</b>
                  </Label>
                  <Input
                    type="text"
                    value={values.room_name}
                    onChange={handleChange}
                    id="name"
                    name="name"
                    placeholder="Masukkan nama kurikulum"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="is_active">
                    <b>Status Kurikulum</b>
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
                  Tambah
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
    postCurriculum: (val, onSuccess, onFailure) =>
      dispatch(postCurriculum(val, onSuccess, onFailure)),
  };
};

export default connect(null, mapDispatchToProps)(PostModalComponent);
