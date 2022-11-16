import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  RadioGroup,
  Button,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { registerUser } from "../../services/user.services";
const NewUser = () => {
  const [employee, setEmployee] = useState({
    email: "",
    role: "worker",
    name: "",
    // password: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleFieldChange = (e) => {
    setEmployee((currentDetails) => {
      return {
        ...currentDetails,
        [e.target.id]: e.target.value,
      };
    });
  };

  const handleRadioChange = (e) => {
    setEmployee((currentDetails) => {
      return {
        ...currentDetails,
        role: e.target.defaultValue,
      };
    });
  };

  const addEmployee = async () => {
    const response = await registerUser(employee);

    if (response === "ok") {
      setEmployee({
        email: "",
        name: "",
        role: "worker",
        // password: "",
      });
      setSuccess("User added successfully");

      setTimeout(() => {
        setSuccess(null);
      }, 2000);
    } else {
      setError(response);
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <React.Fragment>
      <Grid
        style={{ marginTop: "20vh" }}
        container
        direction="column"
        alignContent="center"
      >
        <Typography
          className="text"
          variant="h5"
          component="h2"
          style={{ fontWeight: "600", fontFamily: "Montserrat" }}
        >
          Add an employee
        </Typography>
        <Typography
          variant="body1"
          style={{
            color: "#5b5b5b",
            padding: "30px 0px 20px 0px",
            fontFamily: "Montserrat",
          }}
        >
          A worker can send messages and a manager can upload files and send
          messages in this system.
        </Typography>
        {success ? <Alert severity="success">{success}</Alert> : null}
        {error ? <Alert severity="error">{error}</Alert> : null}
        <Grid item direction="column" style={{ padding: "15px 0px" }}>
          <RadioGroup
            id="role"
            value={employee.role}
            onChange={handleRadioChange}
          >
            <Grid item direction="row" style={{ marginBottom: "10px" }}>
              <FormControlLabel
                value="worker"
                control={<Radio />}
                label="Worker"
              />
              <FormControlLabel
                value="manager"
                control={<Radio />}
                label="Manager"
              />
            </Grid>
          </RadioGroup>
          <TextField
            id="name"
            value={employee.password}
            onChange={handleFieldChange}
            variant="filled"
            label="Employee name"
            style={{
              backgroundColor: "#ffffff",
              width: "90%",
              marginTop: "10px",
            }}
          />
          <TextField
            id="email"
            value={employee.email}
            onChange={handleFieldChange}
            variant="filled"
            label="Employee email"
            style={{ backgroundColor: "#ffffff", width: "90%" }}
          />
          {/* <TextField
            id="password"
            value={employee.password}
            onChange={handleFieldChange}
            variant="filled"
            label="New password for employee"
            style={{
              backgroundColor: "#ffffff",
              width: "90%",
              marginTop: "10px",
            }}
          /> */}
        </Grid>
        <Button onClick={addEmployee}>Add Employee</Button>
      </Grid>
    </React.Fragment>
  );
};

export default NewUser;
