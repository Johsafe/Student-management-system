import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import HeaderBar from "../Layout/HeaderBar";
import Copyright from "../../Utils/Copyright";
import styles from "./styles.module.css";
import { ButtonGroup } from "@mui/material";
import { Helmet } from "react-helmet-async";

export default function ForgetPassScreen() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
    });
  };

  return (
    <div>
      <HeaderBar />
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <div className={styles.signup_container}>
        <div className={styles.signup_form_container}>
          <div className={styles.left}>
            
          </div>
          <div className={styles.right}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h1>Forget Password</h1>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <ButtonGroup style={{ gap: "2rem" }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ width: "15rem" }}
                >
                  <Link
                    href="/"
                    variant="body3"
                    sx={{ textDecoration: "none", color: "white" }}
                  >
                    Cancel
                  </Link>
                </Button>
                <Button type="submit" fullWidth variant="contained">
                  Send Email
                </Button>
              </ButtonGroup>
            </form>
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
