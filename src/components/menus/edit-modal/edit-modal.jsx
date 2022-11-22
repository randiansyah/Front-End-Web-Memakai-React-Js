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
import { updateMenu } from "../../../redux/actions/menus/menusActions";
import AutoCompleteMenu from "../../@vuexy/autoComplete/autoCompleteMenu";
import AutoCompleteMenuField from "../../@vuexy/autoComplete/autoCompleteMenuField";

const EditModalComponent = ({ ...props }) => {
  const { modal, toggle, data, updateMenu, options } = props;

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
            parent_id: data.parent_id,
            name: data.name,
            url: data.url,
            icon: data.icon,
            permission_name: data.permission_name ? data.permission_name : "",
          }}
          enableReinitialize={true}
          onSubmit={(values) => {
            updateMenu(data.id, values, alertSuccess, alertError);
          }}
        >
          {({ handleChange, values, setFieldValue }) => (
            <Form>
              <ModalHeader toggle={() => toggle(false)}>Edit Menu</ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label for="Jenis Menu">
                    <b>Jenis Menu</b>
                  </Label>
                  <AutoCompleteMenuField
                    placeholder="Masukkan Menu"
                    onChange={handleChange}
                    data={options}
                    setFieldValue={setFieldValue}
                    icon={`${values.parent_id}`}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="name">
                    <b>Nama Menu</b>
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleChange}
                    value={values.name}
                    placeholder="Nama Menu"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="url">
                    <b>URL</b>
                  </Label>
                  <Input
                    type="text"
                    id="url"
                    name="url"
                    onChange={handleChange}
                    value={values.url}
                    placeholder="Alamat Url"
                  />
                </FormGroup>
                <FormGroup className="">
                  <Label for="icon">
                    <b>Icon</b>
                  </Label>
                  <AutoCompleteMenu
                    placeholder="Masukkan Kata Icon"
                    onChange={handleChange}
                    setFieldValue={setFieldValue}
                    icon={values.icon}
                  />
                </FormGroup>
                <FormGroup className="">
                  <Label for="permission_name">
                    <b>Izin Akses</b>
                  </Label>
                  <Input
                    type="text"
                    id="permission_name"
                    name="permission_name"
                    onChange={handleChange}
                    value={values.permission_name}
                    placeholder="Masukkan izin akses"
                  />
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
    updateMenu: (id, val, onSuccess, onFailure) =>
      dispatch(updateMenu(id, val, onSuccess, onFailure)),
  };
};

export default connect(null, mapDispatchToProps)(EditModalComponent);
