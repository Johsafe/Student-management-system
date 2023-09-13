import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { Button, Container, TextField } from "@mui/material";
import Copyright from "../../Utils/Copyright";
import HeaderBar from "../Layout/HeaderBar";
import { Helmet } from "react-helmet-async";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { base_url } from "../../Utils/baseUrl";
import { toast } from "react-toastify";
import { getError } from "../../Utils/GetError";

export default function SigninScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        email,
        password,
      };
      const url = `${base_url}authenicate/login`;
      const { data } = await axios.post(url, body);
      localStorage.setItem("token", JSON.stringify(data));
      toast.success("Logged Successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(getError(error));
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
        <title>Log In</title>
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
                id="email"
                label="Email Address"
                name="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

              <h6>Auth [ pass : passwd@123]</h6>
              <Link
                style={{ textDecoration: "none", color: "blue" }}
                to="/forget"
              >
                <h6>Forgot Your Password ? Click Here</h6>
              </Link>
            </form>
          </div>
          <div className={styles.right1}>
            <h1>New Here ?</h1>
            <Link to="/signup">
              <button type="button" className={styles.white_btn}>
                Sign Up
              </button>
            </Link>
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
