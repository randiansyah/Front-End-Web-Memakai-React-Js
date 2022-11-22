import React from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";

const SettingsPage = (props) => {
  return (
    <div>
      <Helmet>
        <title>Akademik - Pengaturan</title>
      </Helmet>
      Hello settings
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
