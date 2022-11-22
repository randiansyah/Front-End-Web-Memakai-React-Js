import React from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";

const GradesPage = (props) => {
  return (
    <div>
      <Helmet>
        <title>Akademik - Grades</title>
      </Helmet>
      Hello grades
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GradesPage);
