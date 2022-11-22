import React from "react";
import { Card } from "reactstrap";

export const GradingTable = () => {
  const data = [
    {
      date: "Senin, 13 Mei 2021",
      course: [
        { name: "Bahasa Indonesia" },
        { name: "Istirahat" },
        { name: "Seni Budaya" },
      ],
      time: ["08.00 - 09.30", "09.30 - 10.00", "10.00 - 11.30"],
    },
    {
      date: "Selasa, 14 Mei 2021",
      course: [
        { name: "Penjaskes" },
        { name: "Istirahat" },
        { name: "Pemrograman Web" },
      ],
      time: ["08.00 - 09.30", "09.30 - 10.00", "10.00 - 11.30"],
    },
    {
      date: "Rabu, 15 Mei 2021",
      course: [
        { name: "IPA" },
        { name: "Istirahat" },
        { name: "Pemrograman Mobile" },
      ],
      time: ["08.00 - 09.30", "09.30 - 10.00", "10.00 - 11.30"],
    },
    {
      date: "Kamis, 16 Mei 2021",
      course: [
        { name: "Matematika" },
        { name: "Istirahat" },
        { name: "Kimia" },
      ],
      time: ["08.00 - 09.30", "09.30 - 10.00", "10.00 - 11.30"],
    },
  ];

  return (
    <Card>
      <div className="text-center p-2" style={{ wordBreak: "break-word" }}>
        <h2 className="" style={{ wordBreak: "break-word" }}>
          JADWAL PENILAIAN AKHIR TAHUN PESAT AKADEMIK 2021/2022
        </h2>
      </div>
      <div
        className="p-2"
        style={{ display: "block", overflowX: "auto", whiteSpace: "nowrap" }}
      >
        <table border="1" cellPadding="8" width="100%">
          <thead>
            <tr>
              <th className="text-center">No</th>
              <th className="text-center">Hari/Tanggal</th>
              <th className="text-center">Mata Pelajaran</th>
              <th className="text-center">Waktu</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, idx) => {
              return (
                <React.Fragment key={idx}>
                  <tr>
                    <th className="text-center" rowSpan="3">
                      {++idx}
                    </th>
                    <td className="text-center" rowSpan="3">
                      {d.date}
                    </td>
                    <td className="text-center">{d.course[0].name}</td>
                    <td className="text-center">{d.time[0]}</td>
                  </tr>
                  <tr>
                    <td className="text-center">{d.course[1].name}</td>
                    <td className="text-center">{d.time[1]}</td>
                  </tr>
                  <tr>
                    <td className="text-center">{d.course[2].name}</td>
                    <td className="text-center">{d.time[2]}</td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
