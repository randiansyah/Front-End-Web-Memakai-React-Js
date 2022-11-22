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
import AutoCompleteMenu from "../../@vuexy/autoComplete/autoCompleteMenu";
import Swal from "sweetalert2";
import { postMenus } from "../../../redux/actions/menus/menusActions";
import AutoCompleteMenuField from "../../@vuexy/autoComplete/autoCompleteMenuField";

const PostModalComponent = ({ ...props }) => {
  const { modal, toggle, options, postMenus } = props;

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
            parent_id: "",
            name: "",
            url: "",
            icon: "",
            permission_name: "",
          }}
          onSubmit={(values) => postMenus(values, alertSuccess, alertError)}
        >
          {({ handleChange, values, setFieldValue }) => (
            <Form>
              <ModalHeader toggle={() => toggle(false)}>
                Tambah Menu
              </ModalHeader>
              <ModalBody>
                <FormGroup className="">
                  <Label for="option">
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
                <FormGroup className="">
                  <Label for="menu">
                    <b>Nama Menu</b>
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleChange}
                    value={values.name}
                    placeholder="Masukkan nama menu"
                  />
                </FormGroup>
                <FormGroup className="">
                  <Label for="url">
                    <b>Url</b>
                  </Label>
                  <Input
                    type="text"
                    id="url"
                    name="url"
                    onChange={handleChange}
                    value={values.url}
                    placeholder="Masukkan url"
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
    postMenus: (val, onSuccess, onFailure) =>
      dispatch(postMenus(val, onSuccess, onFailure)),
  };
};

export default connect(null, mapDispatchToProps)(PostModalComponent);
