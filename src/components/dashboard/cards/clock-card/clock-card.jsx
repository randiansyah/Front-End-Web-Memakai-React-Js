import React from "react";
import { Card } from "reactstrap";
import "../../../../assets/scss/pages/dashboard-analytics.scss";

export const ClockCard = ({ icon, iconBg, stat, statTitle }) => {
  return (
    <Card className="" style={{ backgroundColor: "#a3e0a6" }}>
      <div className="p-2 d-flex flex-column justify-content-md-start justify-content-sm-center align-items-md-start align-items-sm-center">
        <div className="icon-section">
          <div
            className={`avatar avatar-stats p-50 m-0 shadow ${
              iconBg ? `bg-rgba-${iconBg}` : "bg-rgba-primary"
            }`}
          >
            <div className="avatar-content">{icon}</div>
          </div>
        </div>
        <div className="title-section mt-0 mt-sm-1">
          <p className="mb-0 text-white">Waktu Indonesia Barat</p>
          <h1 className="text-bold-500 mb-25 text-white text-md-left text-sm-center">
            {stat}
          </h1>
        </div>
      </div>
    </Card>
  );
};
