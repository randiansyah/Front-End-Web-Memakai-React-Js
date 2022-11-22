import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Col, Row } from "reactstrap";
import { ClockCard } from "../../../components/dashboard/cards/clock-card/clock-card";
import { Clock } from "react-feather";
import { DateCard } from "../../../components/dashboard/cards/date-card/date-card";
import { GradingTable } from "../../../components/dashboard/cards/grading-table/grading-table";
import SalesCard from "../../../components/@vuexy/card-dashboard/SalesCard";
import moment from "moment";
import localization from "moment/locale/id";
import DataTableUsers from "../../../components/@vuexy/data-tables/DataTableUsers";
import { connect } from "react-redux";
import { fetchUsersData } from "../../../redux/actions/users/usersActions";

const HomePage = ({ usersData, fetchUsersData, isLoading }) => {
  const [clock, setClock] = useState({ data: "" });
  useEffect(() => {
    fetchUsersData();
    const timer = setInterval(() => {
      setClock({
        data: `${moment().locale("id", localization).format("LTS")}`,
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      fetchUsersData();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Helmet>
        <title>Akademik - Home</title>
      </Helmet>
      <Row className="match-height">
        <Col lg="4" md="12">
          <SalesCard />
        </Col>
        <Col lg="4" md="6">
          <ClockCard
            icon={<Clock className="text-white" size={22} />}
            stat={clock.data}
          />
        </Col>
        <Col lg="4" md="6" sm="12">
          <DateCard />
        </Col>
      </Row>
      <Row>
        <Col>
          <DataTableUsers
            users={usersData}
            isLoading={isLoading}
            fromDashboard
          />
        </Col>
      </Row>
      <Row className="match-height">
        <Col sm="12">
          <GradingTable />
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    usersData: state.users.users.users,
    isLoading: state.users.users.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsersData: () => dispatch(fetchUsersData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
