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
  Row,
  Col,
} from "reactstrap";
import { updateCourse } from "../../../redux/actions/course/courseActions";
import Swal from "sweetalert2";

const EditModalComponent = ({ ...props }) => {
  const {
    modal,
    toggle,
    stagesData,
    groupData,
    curriculumData,
    data,
    updateCourse,
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
    <div>
      <Modal isOpen={modal} toggle={() => toggle(false)}>
        <Formik
          initialValues={{
            course_code: data.course_code,
            name: data.name,
            general_competences: data.general_competences,
            special_competences: data.special_competences,
            total_hours: data.total_hours,
            group_id: data.group ? data.group.id : "",
            curriculum_id: data.curriculum ? data.curriculum.id : "",
            stage_id: data.stage ? data.stage.id : "",
            is_active: data.is_active,
            is_deleted: data.is_deleted,
          }}
          enableReinitialize={true}
          onSubmit={(values) => {
            const { total_hours } = values;

            const newState = {
              ...values,
              total_hours: `${total_hours}`,
            };

            updateCourse(newState, data.id, alertSuccess, alertError);
          }}
        >
          {({ handleChange, values }) => (
            <Form>
              <ModalHeader toggle={() => toggle(false)}>
                Edit Pelajaran
              </ModalHeader>
              <ModalBody>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="course_code">
                        <b>Kode Pelajaran</b>
                      </Label>
                      <Input
                        type="text"
                        value={values.course_code}
                        onChange={handleChange}
                        id="course_code"
                        name="course_code"
                        placeholder="Masukkan kode pelajaran"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="name">
                        <b>Nama Pelajaran</b>
                      </Label>
                      <Input
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                        id="name"
                        name="name"
                        placeholder="Masukkan nama pelajaran"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for="general_competences">
                    <b>Kompetensi Umum</b>
                  </Label>
                  <Input
                    type="text"
                    value={values.general_competences}
                    onChange={handleChange}
                    id="general_competences"
                    name="general_competences"
                    placeholder="Masukkan kompetensi umum"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="special_competences">
                    <b>Kompetensi Khusus</b>
                  </Label>
                  <Input
                    type="text"
                    value={values.special_competences}
                    onChange={handleChange}
                    id="special_competences"
                    name="special_competences"
                    placeholder="Masukkan kompetensi spesial"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="total_hours">
                    <b>Total Jam</b>
                  </Label>
                  <Input
                    type="text"
                    value={values.total_hours}
                    onChange={handleChange}
                    id="total_hours"
                    name="total_hours"
                    placeholder="Masukkan total jam"
                  />
                </FormGroup>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="stage_id">
                        <b>Pilih Jenjang</b>
                      </Label>
                      <Input
                        type="select"
                        value={values.stage_id}
                        onChange={handleChange}
                        name="stage_id"
                        id="stage_id"
                      >
                        <option value="" disabled>
                          --
                        </option>
                        {stagesData.map((data, idx) => (
                          <option key={idx} value={data.id}>
                            {data.stages}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
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
                  </Col>
                </Row>
                <FormGroup>
                  <Label for="group_id">
                    <b>Pilih Kelompok</b>
                  </Label>
                  <Input
                    type="select"
                    value={values.group_id}
                    onChange={handleChange}
                    name="group_id"
                    id="group_id"
                  >
                    <option value="" disabled>
                      --
                    </option>
                    {groupData.map((data, idx) => (
                      <option key={idx} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="curriculum_id">
                    <b>Pilih Kurikulum</b>
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
                      <option key={idx} value={data.id}>
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
    updateCourse: (val, id, onSuccess, onFailure) =>
      dispatch(updateCourse(val, id, onSuccess, onFailure)),
  };
};

export default connect(null, mapDispatchToProps)(EditModalComponent);
