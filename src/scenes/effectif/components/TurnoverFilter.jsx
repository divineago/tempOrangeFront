import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchDataFromAPIWithParameters } from "../../../api";


const TurnoverChart = () => {
  const [date_debut, setStartDate] = useState("");
  const [date_fin, setEndDate] = useState("");
  const [turnoverData, setTurnoverData] = useState([]);

  const fetchTurnoverData = async () => {
    try {
      const response = await fetchDataFromAPIWithParameters("/effectif/agent/turnover_mensuel/",date_debut,date_fin);
      setTurnoverData(response.data.turnover_data);
    } catch (error) {
      console.error("Error fetching turnover data:", error);
    }
  };

  useEffect(() => {
    if (date_debut && date_fin) {
      fetchTurnoverData();
    }
  }, [date_debut, date_fin]);

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Date de début: 
          <input
            type="date"
            value={date_debut}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label style={{ marginLeft: "20px" }}>
          Date de fin: 
          <input
            type="date"
            value={date_fin}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={turnoverData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="turnover"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TurnoverChart;
