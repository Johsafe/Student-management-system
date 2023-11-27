import { styled, useTheme } from "@mui/material/styles";
import { Box, Grid, Typography } from "@mui/material";
import MainCard from "./MainCard";
import PropTypes from "prop-types";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { base_url } from "../../Utils/baseUrl";
import { toast } from "react-toastify";
import { getError } from "../../Utils/GetError";
import React from "react";

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

const CoursesCard = () => {
  const theme = useTheme();

  //courses count
  const [courseCount, setCourseCount] = React.useState([]);
  async function countCourses() {
    try {
      const response = await fetch(`${base_url}course`);
      const getcount = await response.json();
      setCourseCount(getcount);
      console.log(getcount);
    } catch (err) {
      toast.error(getError(err));
    }
  }
  React.useEffect(() => {
    countCourses();
  }, []);
  
  return (
    <>
      <CardWrapper border={false} content={false}>
        <Box sx={{ p: 1.4 }}>
          <Grid container direction="column">
            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <div class="card-icon card-icon-large">
                    <AssignmentIcon
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
                Total Courses
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
                    {courseCount}
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

CoursesCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default CoursesCard;
