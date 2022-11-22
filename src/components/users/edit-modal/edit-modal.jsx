import { Formik, Form } from "formik";
import React from "react";
import { connect } from "react-redux";
import {
  Input,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Label,
  FormGroup,
} from "reactstrap";
import Swal from "sweetalert2";
import { editUser } from "../../../redux/actions/users/usersActions";

const EditModalComponent = ({ ...props }) => {
  const { modal, toggle, data, checkData, roles, editUser, id } = props;

  const onSuccess = (response) => {
    return Swal.fire({
      icon: "success",
      title: "Sukses",
      text: response,
    });
  };

  const onFailure = (response) => {
    return Swal.fire({
      icon: "error",
      title: "Gagal",
      text: response,
    });
  };

  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <Formik
          initialValues={{
            fullname: checkData(data.fullname),
            role: checkData(data.role),
            password: "",
            passwordConfirm: "",
            is_deleted: checkData(data.is_deleted),
          }}
          enableReinitialize={true}
          onSubmit={(values) => editUser(values, id, onSuccess, onFailure)}
        >
          {({ values, handleChange }) => (
            <Form>
              <ModalHeader toggle={() => toggle(false)}>
                Perbarui data pengguna
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label for="password">
                    <b>Password</b>
                  </Label>
                  <Input
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    id="password"
                    name="password"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="passwordConfirm">
                    <b>Konfirmasi Password</b>
                  </Label>
                  <Input
                    type="password"
                    value={values.passwordConfirm}
                    onChange={handleChange}
                    id="passwordConfirm"
                    name="passwordConfirm"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="fullname">
                    <b>Nama Lengkap</b>
                  </Label>
                  <Input
                    type="text"
                    value={values.fullname}
                    onChange={handleChange}
                    id="fullname"
                    name="fullname"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="role">
                    <b>Pilih Role</b>
                  </Label>
                  <Input
                    type="select"
                    value={values.role}
                    onChange={handleChange}
                    name="role"
                    id="role"
                  >
                    <option value="" disabled>
                      --
                    </option>
                    {roles.map((role, idx) => (
                      <option key={idx} value={role.name}>
                        {role.name}
                      </option>
                    ))}
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="is_deleted">
                    <b>Pilih Status</b>
                  </Label>
                  <Input
                    type="select"
                    value={values.is_deleted}
                    onChange={handleChange}
                    name="is_deleted"
                    id="is_deleted"
                  >
                    <option value="" disabled>
                      --
                    </option>
                    <option value={0} style={{ width: "100%" }}>
                      Nonaktif
                    </option>
                    <option value={1} style={{ width: "100%" }}>
                      Aktif
                    </option>
                  </Input>
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="success" type="submit" onClick={toggle}>
                  Perbarui
                </Button>{" "}
                <Button color="grey" onClick={toggle}>
                  Tutup
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    editUser: (values, id, onSuccess, onFailure) =>
      dispatch(editUser(values, id, onSuccess, onFailure)),
  };
};

export default connect(null, mapDispatchToProps)(EditModalComponent);
