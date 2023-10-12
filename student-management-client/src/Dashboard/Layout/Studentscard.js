import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Box, Grid, Typography } from "@mui/material";
import MainCard from "./MainCard";
import PropTypes from "prop-types";
import GroupsIcon from "@mui/icons-material/Groups";
import { base_url } from "../../Utils/baseUrl";
import { toast } from "react-toastify";
import { getError } from "../../Utils/GetError";

const CardWrapper = styled(MainCard)(({ theme }) => ({
  // backgroundColor: theme.palette.secondary.dark,
  backgroundColor: " #fff",
  borderTop: "4px solid #42a5f5",
  overflow: "hidden",
  position: "relative",
  borderRadius: "10px",
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    // background: theme.palette.secondary[800],
    background: "linear-gradient(to right, #373b44, #4286f4)",
    borderRadius: "50%",
    top: -85,
    right: -95,
    opacity: 0.1,
    [theme.breakpoints.down("sm")]: {
      top: -105,
      right: -140,
    },
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    // background: theme.palette.secondary[800],
    background: "linear-gradient(to right, #373b44, #4286f4)",
    borderRadius: "50%",
    top: -125,
    right: -15,
    opacity: 0.1,
    [theme.breakpoints.down("sm")]: {
      top: -155,
      right: -70,
    },
  },
}));

const StudentCard = () => {
  const theme = useTheme();

  //student count
  const [studentCount, setStudentCount] = React.useState([]);
  async function countStudents() {
    try {
      const response = await fetch(`${base_url}student/studentcount`);
      const getcount = await response.json();
      setStudentCount(getcount);
      // console.log(getcount);
    } catch (err) {
      toast.error(getError(err));
    }
  }
  React.useEffect(() => {
    countStudents();
  }, []);
  return (
    <>
      <CardWrapper border={false} content={false}>
        <Box sx={{ p: 2.25 }}>
          <Grid container direction="column">
            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <div class="card-icon card-icon-large">
                    <GroupsIcon
                      sx={{
                        textAalign: " center",
                        color: " #000",
                        position: "absolute",
                        right: "-1px",
                        fontSize: "150px",
                        opacity: "0.2",
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ mt: 3 }}>
              <Typography
                sx={{
                  fontSize: "2rem",
                  fontWeight: 500,
                  color: theme.palette.secondary[200],
                }}
              >
                Total Students
              </Typography>
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography
                    sx={{
                      fontSize: "3rem",
                      fontWeight: "bolder",
                      mr: 2,
                      mt: 1,
                    }}
                  >
                    {studentCount}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </CardWrapper>
    </>
  );
};

StudentCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default StudentCard;
