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
import { postYears } from "../../../redux/actions/years/yearsActions";
import Swal from "sweetalert2";

const PostModalComponent = ({ ...props }) => {
  const { modal, toggle, postYears } = props;

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
          initialValues={{ year: "", is_active: "" }}
          enableReinitialize={true}
          onSubmit={(values) => postYears(values, alertSuccess, alertError)}
        >
          {({ handleChange, values }) => (
            <Form>
              <ModalHeader toggle={() => toggle(false)}>
                Tambah Tahun Ajaran
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label for="year">
                    <b>Tahun Ajaran</b>
                  </Label>
                  <Input
                    type="text"
                    value={values.year}
                    onChange={handleChange}
                    id="year"
                    name="year"
                    placeholder="Masukkan tahun ajaran"
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
    postYears: (val, onSuccess, onFailure) =>
      dispatch(postYears(val, onSuccess, onFailure)),
  };
};

export default connect(null, mapDispatchToProps)(PostModalComponent);
