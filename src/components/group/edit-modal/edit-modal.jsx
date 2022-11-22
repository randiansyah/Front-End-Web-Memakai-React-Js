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
import { updateGroup } from "../../../redux/actions/group/groupActions";
import Swal from "sweetalert2";

const EditModalComponent = ({ ...props }) => {
  const { modal, toggle, data, updateGroup, curriculumData } = props;

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
            name: data.name,
            type: data.type,
            curriculum_id: data.curriculum ? data.curriculum.id : "",
            is_deleted: data.is_deleted,
          }}
          enableReinitialize={true}
          onSubmit={(values) =>
            updateGroup(values, data.id, alertSuccess, alertError)
          }
        >
          {({ handleChange, values }) => (
            <Form>
              <ModalHeader toggle={() => toggle(false)}>
                Edit Kelompok
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label for="name">
                    <b>Nama Kelompok</b>
                  </Label>
                  <Input
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    id="name"
                    name="name"
                    placeholder="Masukkan nama kelompok"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="type">
                    <b>Tipe</b>
                  </Label>
                  <Input
                    type="text"
                    value={values.type}
                    onChange={handleChange}
                    id="type"
                    name="type"
                    placeholder="Masukkan tipe kelompok"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="curriculum_id">
                    <b>Kurikulum</b>
                  </Label>
                  <Input
                    type="select"
                    value={values.curriculum_id}
                    onChange={handleChange}
                    name="curriculum_id"
                    id="curriculum_id"
                  >
                    <option value="" disabled>
                      --
                    </option>
                    {curriculumData.map((data, idx) => (
                      <option value={data.id} key={idx}>
                        {data.name}
                      </option>
                    ))}
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
    updateGroup: (val, id, onSuccess, onFailure) =>
      dispatch(updateGroup(val, id, onSuccess, onFailure)),
  };
};

export default connect(null, mapDispatchToProps)(EditModalComponent);
