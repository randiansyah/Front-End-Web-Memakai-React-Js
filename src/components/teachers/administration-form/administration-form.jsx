import React from "react";
import { Col, FormGroup, Label, Row, Input } from "reactstrap";
import Flatpickr from "react-flatpickr";

export const AdministrationFormComponent = ({ ...props }) => {
  const { onChange, values, setFieldValue, employeesData, ptkTypes } = props;
  return (
    <div>
      <div className="mt-1">
        <h4>Administrasi</h4>
      </div>
      <Row>
        <Col md={4}>
          <FormGroup>
            <Label for="nip">
              <b>NIP</b>
            </Label>
            <Input
              type="text"
              id="nip"
              name="nip"
              onChange={onChange}
              value={values.nip}
              placeholder="Masukkan nip disini"
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="nik">
              <b>NIK</b>
            </Label>
            <Input
              type="text"
              id="nik"
              name="nik"
              onChange={onChange}
              value={values.nik}
              placeholder="Masukkan nik disini"
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="nuptk">
              <b>NUPTK</b>
            </Label>
            <Input
              type="text"
              id="nuptk"
              name="nuptk"
              onChange={onChange}
              value={values.nuptk}
              placeholder="Masukkan nuptk disini"
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="npwp">
              <b>NPWP</b>
            </Label>
            <Input
              type="text"
              id="npwp"
              name="npwp"
              onChange={onChange}
              value={values.npwp}
              placeholder="Masukkan npwp disini"
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="salary_source">
              <b>Penghasilan Gaji</b>
            </Label>
            <Input
              type="text"
              id="salary_source"
              name="salary_source"
              onChange={onChange}
              value={values.salary_source}
              placeholder="Masukkan penghasilan gaji disini"
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="ptk_type_id">
              <b>Tipe PTK</b>
            </Label>
            <Input
              type="select"
              onChange={onChange}
              value={values.ptk_type_id}
              name="ptk_type_id"
              id="ptk_type_id"
            >
              <option value="" disabled>
                --
              </option>
              {ptkTypes.map((data, idx) => (
                <option key={idx} value={data.id}>
                  {data.name}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <FormGroup>
            <Label for="employe_status_id">
              <b>Posisi Pegawai</b>
            </Label>
            <Input
              type="select"
              name="employe_status_id"
              id="employe_status_id"
              onChange={onChange}
              value={values.employe_status_id}
            >
              <option value="" disabled>
                --
              </option>
              {employeesData.map((data, idx) => (
                <option key={idx} value={data.id}>
                  {data.name}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="sk_cpns">
              <b>SK CPNS</b>
            </Label>
            <Input
              type="text"
              id="sk_cpns"
              name="sk_cpns"
              onChange={onChange}
              value={values.sk_cpns}
              placeholder="Masukkan SK CPNS disini"
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="cpns_start_date">
              <b>Tanggal Masuk CPNS</b>
            </Label>
            <Flatpickr
              className="form-control"
              value={values.cpns_start_date}
              placeholder="Masukkan tanggal masuk cpns disini"
              id="cpns_start_date"
              name="cpns_start_date"
              onChange={(date) => {
                setFieldValue("cpns_start_date", date);
              }}
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="cpns_end_date">
              <b>Tanggal Keluar CPNS</b>
            </Label>
            <Flatpickr
              className="form-control"
              value={values.cpns_end_date}
              placeholder="Masukkan tanggal keluar cpns disini"
              id="cpns_end_date"
              name="cpns_end_date"
              onChange={(date) => {
                setFieldValue("cpns_end_date", date);
              }}
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="sk_appointment">
              <b>Penetapan SK</b>
            </Label>
            <Input
              type="text"
              id="sk_appointment"
              name="sk_appointment"
              onChange={onChange}
              value={values.sk_appointment}
              placeholder="Masukkan penetapan sk disini"
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="institution">
              <b>Institusi</b>
            </Label>
            <Input
              type="text"
              id="institution"
              name="institution"
              onChange={onChange}
              value={values.institution}
              placeholder="Masukkan institusi disini"
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="golongan">
              <b>Golongan</b>
            </Label>
            <Input
              type="text"
              id="golongan"
              name="golongan"
              onChange={onChange}
              value={values.golongan}
              placeholder="Masukkan golongan disini"
            />
          </FormGroup>
        </Col>
      </Row>
    </div>
  );
};
