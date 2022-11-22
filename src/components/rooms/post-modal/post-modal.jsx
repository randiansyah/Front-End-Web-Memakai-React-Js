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
import { postRooms } from "../../../redux/actions/rooms/roomsActions";
import Swal from "sweetalert2";

const PostModalComponent = ({ ...props }) => {
  const { modal, toggle, postRooms } = props;

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
          initialValues={{ room_name: "", capacity: "", is_active: "" }}
          enableReinitialize={true}
          onSubmit={(values) => postRooms(values, alertSuccess, alertError)}
        >
          {({ handleChange, values }) => (
            <Form>
              <ModalHeader toggle={() => toggle(false)}>
                Tambah Ruangan
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label for="room_name">
                    <b>Nama Ruangan</b>
                  </Label>
                  <Input
                    type="text"
                    value={values.room_name}
                    onChange={handleChange}
                    id="room_name"
                    name="room_name"
                    placeholder="Masukkan nama ruangan"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="capacity">
                    <b>Kapasitas</b>
                  </Label>
                  <Input
                    type="text"
                    value={values.capacity}
                    onChange={handleChange}
                    id="capacity"
                    name="capacity"
                    placeholder="Masukkan kapasitas ruangan"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="is_active">
                    <b>Status Ruangan</b>
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
    postRooms: (values, alertSuccess, alertError) =>
      dispatch(postRooms(values, alertSuccess, alertError)),
  };
};

export default connect(null, mapDispatchToProps)(PostModalComponent);
