import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { Box, Button, Container, TextField } from "@mui/material";
import Copyright from "../../Utils/Copyright";
import HeaderBar from "../Layout/HeaderBar";
import { Helmet } from "react-helmet-async";
import Grid from "@mui/material/Grid";
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

export default function SignupScreen() {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        firstname,
        lastname,
        email,
        password,
      };
      const url = `${base_url}authenicate/create`;
      const { data } = await axios.post(url, body);
      navigate("/login");
      toast.success("Registred Successfully");
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
        <title>Sign Up</title>
      </Helmet>
      <div className={styles.signup_container}>
        <div className={styles.signup_form_container}>
          <div className={styles.left}>
            <h1>Welcome Back</h1>
            <Link to="/login">
              <button type="button" className={styles.white_btn}>
                Sign in
              </button>
            </Link>
          </div>
          <div className={styles.right}>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ marginLeft: "3rem" }}
            >
              <h1>Create Your Account</h1>
              <Grid container spacing={1}>
                <Grid item xs={10} sm={5}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="firstname"
                    label="First Name"
                    name="firstname"
                    autoFocus
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </Grid>
                <Grid item xs={10} sm={5}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    name="lastname"
                    autoFocus
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </Grid>
                <Grid item xs={10}>
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
                </Grid>
                <Grid item xs={10}>
                  <FormControl sx={{ mt: 1 }} variant="outlined">
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
                </Grid>
              </Grid>

              <Button
                fullWidth
                variant="contained"
                type="submit"
                //   onClick={handleSubmit}
                sx={{ mt: 2, height: "3rem", width: "400px" }}
              >
                Sign Up
              </Button>
            </Box>
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
