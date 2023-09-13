import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../../Static/success.png";
import styles from "./styles.module.css";
import { base_url } from "../../Utils/baseUrl";
import Button from "@mui/material/Button";

export default function EmailVerify() {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `${base_url}authenicate/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    // <Fragment>
    <div>
      {validUrl ? (
        <div className={styles.container}>
          <img src={success} alt="success_img" className={styles.success_img} />
          <h1>Email verified successfully</h1>
          <Link to="/login">
            <Button fullWidth variant="contained" sx={{ width: "15rem" }}>
              Login
            </Button>
          </Link>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
      {/* </Fragment> */}
    </div>
  );
}
