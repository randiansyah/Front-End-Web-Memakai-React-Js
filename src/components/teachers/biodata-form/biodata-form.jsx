import Flatpickr from "react-flatpickr";
import React from "react";
import { Col, FormGroup, Label, Row, Input } from "reactstrap";

export const BiodataFormComponent = ({ ...props }) => {
  const {
    onChange,
    values,
    setFieldValue,
    genders,
    maritalStatus,
    religion,
  } = props;

  return (
    <div>
      <h4>Biodata</h4>
      <Row>
        <Col md={4}>
          <FormGroup>
            <Label for="fullname">
              <b>Nama Lengkap</b>
            </Label>
            <Input
              type="text"
              id="fullname"
              name="fullname"
              onChange={onChange}
              value={values.fullname}
              placeholder="Masukkan nama lengkap disini"
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="email">
              <b>Email</b>
            </Label>
            <Input
              type="text"
              id="email"
              onChange={onChange}
              value={values.email}
              name="email"
              placeholder="Masukkan email disini"
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="phone_number">
              <b>Nomor Telepon</b>
            </Label>
            <Input
              type="text"
              id="phone_number"
              onChange={onChange}
              value={values.phone_number}
              name="phone_number"
              placeholder="Masukkan nomor telepon disini"
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="gender">
              <b>Jenis Kelamin</b>
            </Label>
            <Input
              type="select"
              onChange={onChange}
              value={values.gender}
              name="gender"
              id="gender"
            >
              <option value="" disabled>
                --
              </option>
              {genders.map((data, idx) => (
                <option key={idx} value={data.name}>
                  {data.name}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="marital_status">
              <b>Status Pernikahan</b>
            </Label>
            <Input
              type="select"
              onChange={onChange}
              value={values.marital_status}
              name="marital_status"
              id="marital_status"
            >
              <option value="" disabled>
                --
              </option>
              {maritalStatus.map((data, idx) => (
                <option key={idx} value={data.name}>
                  {data.name}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="religion">
              <b>Agama</b>
            </Label>
            <Input
              type="select"
              onChange={onChange}
              value={values.religion}
              name="religion"
              id="religion"
            >
              <option value="" disabled>
                --
              </option>
              {religion.map((data, idx) => (
                <option key={idx} value={data.name}>
                  {data.name}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="date_of_birth">
              <b>Tanggal Lahir</b>
            </Label>
            <Flatpickr
              className="form-control"
              value={values.date_of_birth}
              id="date_of_birth"
              name="date_of_birth"
              onChange={(date) => {
                setFieldValue("date_of_birth", date);
              }}
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="place_of_birth">
              <b>Tempat Lahir</b>
            </Label>
            <Input
              type="text"
              onChange={onChange}
              value={values.place_of_birth}
              id="place_of_birth"
              name="place_of_birth"
              placeholder="Masukkan tempat disini"
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="nationality">
              <b>Kebangsaan</b>
            </Label>
            <Input
              type="text"
              onChange={onChange}
              value={values.nationality}
              id="nationality"
              name="nationality"
              placeholder="Masukkan kebangsaan disini"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <FormGroup>
            <Label for="postal_code">
              <b>Kode POS</b>
            </Label>
            <Input
              type="text"
              onChange={onChange}
              value={values.postal_code}
              id="postal_code"
              name="postal_code"
              placeholder="Masukkan kode pos disini"
            />
          </FormGroup>
        </Col>
        <Col md={8}>
          <FormGroup>
            <Label for="address">
              <b>Alamat</b>
            </Label>
            <Input
              type="textarea"
              onChange={onChange}
              value={values.address}
              style={{ minHeight: "120px" }}
              id="address"
              name="address"
              placeholder="Masukkan alamat disini"
            />
          </FormGroup>
        </Col>
      </Row>
    </div>
  );
};
