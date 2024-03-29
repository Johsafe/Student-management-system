import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import HeaderBar from "../Layout/HeaderBar";
import { toast } from "react-toastify";
import { getError } from "../../Utils/GetError";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Copyright from "../../Utils/Copyright";
import { Helmet } from "react-helmet-async";
import styles from "./styles.module.css";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { base_url } from "../../Utils/baseUrl";

export default function StudentLoginScreen() {
  const [admission, setAdmission] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${base_url}student/login`, {
        admission,
        password,
      });
      localStorage.setItem("Details", JSON.stringify(data));
      navigate("/profile");
      toast.success("Student Logged Successfully");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  //show pass
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <HeaderBar />
      <Helmet>
        <title>Student Page</title>
      </Helmet>
      <div className={styles.login_container}>
        <div className={styles.login_form_container}>
          <div className={styles.left1}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h1>Login to Your Account</h1>
              <TextField
                margin="normal"
                required
                fullWidth
                id="admission"
                label="Admission"
                name="email"
                autoFocus
                value={admission}
                onChange={(e) => setAdmission(e.target.value)}
              />
              <FormControl sx={{ mt: 2 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  sx={{ width: "400px" }}
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                />
              </FormControl>

              <Button
                fullWidth
                variant="contained"
                //   onClick={loginForm}
                type="submit"
                sx={{ mt: 3, mb: 2, height: "3rem" }}
              >
                Sign In
              </Button>

              <h6>Auth [ pass : student@123]</h6>
              <Link
                style={{ textDecoration: "none", color: "blue" }}
                to="/forget"
              >
                <h6>Forgot Your Password ? Click Here</h6>
              </Link>
            </form>
          </div>
          <div className={styles.left2}>
            <h1>Welcome Back</h1>
            <h1> Sign In </h1>
          </div>
        </div>
      </div>
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 2,
          py: [1, 4],
        }}
      >
        <Copyright />
      </Container>
    </div>
  );
}
