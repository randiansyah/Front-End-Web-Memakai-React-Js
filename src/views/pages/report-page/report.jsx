import React from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";

const ReportPages = (props) => {
  return (
    <div>
      <Helmet>
        <title>Akademik - Laporan</title>
      </Helmet>
      Hello Report
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ReportPages);
