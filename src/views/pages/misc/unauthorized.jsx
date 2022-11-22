import React from "react";
import { Card, CardBody, Button, Row, Col } from "reactstrap";
import notAuthImg from "../../../assets/img/pages/not-authorized.png";

const NotAuthorizedPage = () => {
  return (
    <Row className="m-0">
      <Col sm="12">
        <Card className="auth-card bg-transparent shadow-none rounded-0 mb-0 w-100">
          <CardBody className="text-center">
            <img
              src={notAuthImg}
              alt="notAuthImg"
              className="img-fluid align-self-center mt-75"
            />
            <h4 className="font-large-2 my-2">
              Anda tidak berhak mengakses konten ini.
            </h4>
            <p className="pt-2 mb-0">
              Silahkan hubungi administrator untuk informasi lebih lanjut.
            </p>
            <Button.Ripple tag="a" href="/" color="primary" className="mt-2">
              Kembali
            </Button.Ripple>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default NotAuthorizedPage;
