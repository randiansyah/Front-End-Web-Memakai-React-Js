import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { Badge, Button, Card, Col, Row, Spinner } from "reactstrap";
import { fetchTeachersByID } from "../../../../redux/actions/teachers/teachersActions";
import moment from "moment";
import localization from "moment/locale/id";

const DetailsTeacherPage = ({ ...props }) => {
  const { fetchTeachersByID, match, data, isLoading } = props;
  const history = useHistory();
  const params = match.params.id;

  useEffect(() => {
    fetchTeachersByID(params);

    return () => {
      fetchTeachersByID(params);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Helmet>
        <title>Akademik - Detail Guru</title>
      </Helmet>
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "70vh" }}
        >
          <Spinner style={{ width: "3rem", height: "3rem" }} color="success" />
        </div>
      ) : null}
      {isLoading ? null : (
        <Card>
          <div className="p-2">
            <h4>Biodata</h4>
            <hr />
            <Row className="mx-auto">
              <Col md={3}>
                <div className="">
                  <img
                    src={data.photos}
                    alt="avatar"
                    className="box-shadow-1 img-fluid"
                    style={{ borderRadius: "15px" }}
                    width="250px"
                    height="250px"
                  />
                </div>
              </Col>
              <Col md={9}>
                <Row>
                  <Col md={4}>
                    <div className="mt-sm-0 mt-2">
                      <h6 style={{ fontWeight: 300 }}>Nama Lengkap</h6>
                    </div>
                    <div>
                      <h6>{data.fullname}</h6>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="mt-sm-0 mt-2">
                      <h6 style={{ fontWeight: 300 }}>Email</h6>
                    </div>
                    <div>
                      <h6>{data.email}</h6>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="mt-sm-0 mt-2">
                      <h6 style={{ fontWeight: 300 }}>Jenis Kelamin</h6>
                    </div>
                    <div>
                      <h6>{data.gender}</h6>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="mt-sm-2 mt-2">
                      <h6 style={{ fontWeight: 300 }}>Alamat</h6>
                    </div>
                    <div>
                      <h6>
                        Jalan Tlogo Alkautsar No. 59 Kecamatan Lowokwaru, Kota
                        Malang, Jawa Timur 65144
                      </h6>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="mt-sm-2 mt-2">
                      <h6 style={{ fontWeight: 300 }}>Tempat Tanggal Lahir</h6>
                    </div>
                    <div>
                      <h6>
                        {`${data.place_of_birth}, ${moment(data.date_of_birth)
                          .locale("id", localization)
                          .format("LL")}`}
                      </h6>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="mt-sm-2 mt-2">
                      <h6 style={{ fontWeight: 300 }}>Kebangsaan</h6>
                    </div>
                    <div>
                      <h6>{data.nationality}</h6>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="mt-sm-2 mt-2">
                      <h6 style={{ fontWeight: 300 }}>Agama</h6>
                    </div>
                    <div>
                      <h6>{data.religion}</h6>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="mt-sm-2 mt-2">
                      <h6 style={{ fontWeight: 300 }}>Nomor Telepon</h6>
                    </div>
                    <div>
                      <h6>{data.phone_number}</h6>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="mt-sm-2 mt-2">
                      <h6 style={{ fontWeight: 300 }}>Status Pernikahan</h6>
                    </div>
                    <div>
                      <h6>{data.marital_status}</h6>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="mt-sm-2 mt-2">
                      <h6 style={{ fontWeight: 300 }}>Status Pegawai</h6>
                    </div>
                    <div>
                      {data.is_active === 1 ? (
                        <Badge color="light-success" pill>
                          Aktif
                        </Badge>
                      ) : null}
                      {data.is_active === 0 ? (
                        <Badge color="light-danger" pill>
                          Nonaktif
                        </Badge>
                      ) : null}
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <div className="mt-3">
              <h4>Data Pegawai</h4>
              <hr />
            </div>
            <Row>
              <Col md={3}>
                <div className="mt-sm-0 mt-2">
                  <h6 style={{ fontWeight: 300 }}>NIK</h6>
                </div>
                <div>
                  <h6>{data.nik}</h6>
                </div>
              </Col>
              <Col md={3}>
                <div className="mt-sm-0 mt-2">
                  <h6 style={{ fontWeight: 300 }}>NIP</h6>
                </div>
                <div>
                  <h6>{data.nip}</h6>
                </div>
              </Col>
              <Col md={3}>
                <div className="mt-sm-0 mt-2">
                  <h6 style={{ fontWeight: 300 }}>NPWP</h6>
                </div>
                <div>
                  <h6>{data.npwp}</h6>
                </div>
              </Col>
              <Col md={3}>
                <div className="mt-sm-0 mt-2">
                  <h6 style={{ fontWeight: 300 }}>NUPTK</h6>
                </div>
                <div>
                  <h6>{data.nuptk}</h6>
                </div>
              </Col>
              <Col md={3}>
                <div className="mt-sm-2 mt-2">
                  <h6 style={{ fontWeight: 300 }}>Penghasilan Gaji</h6>
                </div>
                <div>
                  <h6>{data.salary_source}</h6>
                </div>
              </Col>
              <Col md={3}>
                <div className="mt-sm-2 mt-2">
                  <h6 style={{ fontWeight: 300 }}>Penetapan SK</h6>
                </div>
                <div>
                  <h6>{data.sk_appointment}</h6>
                </div>
              </Col>
              <Col md={3}>
                <div className="mt-sm-2 mt-2">
                  <h6 style={{ fontWeight: 300 }}>SK CPNS</h6>
                </div>
                <div>
                  <h6>{data.sk_cpns}</h6>
                </div>
              </Col>
              <Col md={3}>
                <div className="mt-sm-2 mt-2">
                  <h6 style={{ fontWeight: 300 }}>Institusi</h6>
                </div>
                <div>
                  <h6>{data.institution}</h6>
                </div>
              </Col>
              <Col md={3}>
                <div className="mt-sm-2 mt-2">
                  <h6 style={{ fontWeight: 300 }}>Tipe PTK</h6>
                </div>
                <div>
                  <h6>{data.ptk_type ? data.ptk_type.name : "Loading..."}</h6>
                </div>
              </Col>
              <Col md={3}>
                <div className="mt-sm-2 mt-2">
                  <h6 style={{ fontWeight: 300 }}>Jabatan Pegawai</h6>
                </div>
                <div>
                  <h6>
                    {data.employe_status
                      ? data.employe_status.name
                      : "Loading..."}
                  </h6>
                </div>
              </Col>
              <Col md={3}>
                <div className="mt-sm-2 mt-2">
                  <h6 style={{ fontWeight: 300 }}>Tanggal Mulai CPNS</h6>
                </div>
                <div>
                  <h6>
                    {moment(data.cpns_start_date)
                      .locale("id", localization)
                      .format("LL")}
                  </h6>
                </div>
              </Col>
              <Col md={3}>
                <div className="mt-sm-2 mt-2">
                  <h6 style={{ fontWeight: 300 }}>Tanggal Keluar CPNS</h6>
                </div>
                <div>
                  <h6>
                    {moment(data.cpns_end_date)
                      .locale("id", localization)
                      .format("LL")}
                  </h6>
                </div>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md={3}>
                <div className="mt-sm-0 mt-2">
                  <h6 style={{ fontWeight: 300 }}>Dibuat Tanggal</h6>
                </div>
                <div>
                  <h6>
                    {moment(data.created_at)
                      .locale("id", localization)
                      .format("LL")}
                  </h6>
                </div>
              </Col>
              <Col md={3}>
                <div className="mt-sm-0 mt-2">
                  <h6 style={{ fontWeight: 300 }}>Diperbarui Tanggal</h6>
                </div>
                <div>
                  <h6>
                    {moment(data.updated_at)
                      .locale("id", localization)
                      .format("LL")}
                  </h6>
                </div>
              </Col>
            </Row>
          </div>
        </Card>
      )}
      <Button.Ripple color="primary" onClick={() => history.push("/teachers")}>
        Kembali
      </Button.Ripple>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.teachers.teachers.teachers_by_id,
  isLoading: state.teachers.teachers.isLoading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTeachersByID: (id) => dispatch(fetchTeachersByID(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsTeacherPage);
