// src/scenes/Employees/Employees.jsx

import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import Header from "../../components/Header";
import api from "../../api";

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get("/employees/");
        setEmployees(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des employés", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <Box m="20px">
      <Header title="LISTE DES EMPLOYÉS" subtitle="-" />
      <Grid container spacing={3}>
        {employees.map(employee => (
          <Grid item xs={12} md={3} key={employee.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" sx={{ color: "orange" }}>{employee.fullname}</Typography>
                <Typography variant="body1">{employee.email}</Typography>
                <Typography variant="body1">{employee.direction}</Typography>
                <Typography variant="body1">{employee.fonction}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Employees;
