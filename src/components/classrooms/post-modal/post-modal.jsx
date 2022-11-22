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
import { postClassrooms } from "../../../redux/actions/classrooms/classroomsActions";
import Swal from "sweetalert2";
import AutoCompleteClassroom from "../../@vuexy/autoComplete/autoCompleteClassroom";

const PostModalComponent = ({ ...props }) => {
  const { modal, toggle, rooms, postClassrooms, usersData, majorsData } = props;

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
  console.log(majorsData);

  return (
    <div>
      <Modal isOpen={modal} toggle={() => toggle(false)}>
        <Formik
          initialValues={{
            class_code: "",
            nik: "",
            name: "",
            major_id: "",
            account_id: "",
            room_id: "",
            is_active: 1,
          }}
          onSubmit={(values) => {
            postClassrooms(values, alertSuccess, alertError);
          }}
        >
          {({ handleChange, values, setFieldValue }) => (
            <Form>
              <ModalHeader toggle={() => toggle(false)}>
                Tambah Kelas
              </ModalHeader>
              <ModalBody>
                <FormGroup className="">
                  <Label for="class_code">
                    <b>Kode Kelas</b>
                  </Label>
                  <Input
                    type="text"
                    id="class_code"
                    onChange={handleChange}
                    value={values.class_code}
                    name="class_code"
                    placeholder="Masukkan Kode Kelas"
                  />
                </FormGroup>
                <FormGroup className="">
                  <Label for="name">
                    <b>Nama Kelas</b>
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleChange}
                    value={values.name}
                    placeholder="Masukkan Nama Kelas"
                  />
                </FormGroup>
                <FormGroup className="">
                  <Label for="account_id">
                    <b>Pilih Wali Kelas</b>
                  </Label>
                  <AutoCompleteClassroom
                    placeholder="Masukkan Nama Wali Kelas"
                    onChange={handleChange}
                    data={usersData}
                    setFieldValue={setFieldValue}
                    icon={`${values.account_id}`}
                  />
                </FormGroup>
                <FormGroup className="">
                  <Label for="major_id">
                    <b>Pilih Jurusan</b>
                  </Label>
                  <Input
                    type="select"
                    onChange={handleChange}
                    value={values.major_id}
                    name="major_id"
                    id="major_id"
                  >
                    <option value="">--</option>
                    {majorsData.map((data, idx) => (
                      <option key={idx} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup className="">
                  <Label for="room_id">
                    <b>Pilih Ruangan</b>
                  </Label>
                  <Input
                    type="select"
                    onChange={handleChange}
                    value={values.room_id}
                    name="room_id"
                    id="room_id"
                  >
                    <option value="">--</option>
                    {rooms.map((data, idx) => (
                      <option key={idx} value={data.id}>
                        {data.room_name}
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
    postClassrooms: (val, onSuccess, onFailure) =>
      dispatch(postClassrooms(val, onSuccess, onFailure)),
  };
};

export default connect(null, mapDispatchToProps)(PostModalComponent);
