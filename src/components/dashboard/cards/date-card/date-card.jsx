import React, { useState } from "react";
import { Card } from "reactstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export const DateCard = () => {
  const [value, onChange] = useState(new Date());

  return (
    <Card className="">
      <div className="p-1 d-flex justify-content-center">
        <Calendar onChange={onChange} locale="id-ID" value={value} />
      </div>
    </Card>
  );
};
