import { styled, useTheme } from "@mui/material/styles";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import MainCard from "./MainCard";
import SchoolIcon from "@mui/icons-material/School";
import { base_url } from "../../Utils/baseUrl";
import { toast } from "react-toastify";
import { getError } from "../../Utils/GetError";
import React from "react";

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  //   backgroundColor: theme.palette.primary.dark,
  //   color: theme.palette.primary.light,
  overflow: "hidden",
  position: "relative",
  borderTop: "4px solid #42a5f5",
  borderRadius: "10px",
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 150,
    // background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: "50%",
    top: -30,
    right: -180,
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 150,
    // background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
    background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: "50%",
    top: -160,
    right: -130,
  },
}));

const ClassGroupCard = () => {
  const theme = useTheme();
  //group count
  const [groupCount, setGroupCount] = React.useState([]);
  async function countGroups() {
    try {
      const response = await fetch(`${base_url}classgroup/groupcount`);
      const getcount = await response.json();
      setGroupCount(getcount);
      console.log(getcount);
    } catch (err) {
      toast.error(getError(err));
    }
  }
  React.useEffect(() => {
    countGroups();
  }, []);

  return (
    <>
      <CardWrapper border={false} content={false}>
        <Box >
          <List sx={{ py: 0 }}>
            <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
              <SchoolIcon
                sx={{
                  textAalign: " center",
                  color: " #000",
                  position: "absolute",
                  fontSize: "60px",
                  opacity: "0.2",
                }}
              />

              <ListItemText
                sx={{
                  marginLeft: "5rem",
                  display:'flex',
                  // justifyContent:'space-around',
                  alignItems:'center',
                  gap:'1rem'
                }}
                primary={
                  <Typography
                    sx={{
                      fontSize: "2.5rem",
                      fontWeight: "bolder",
                    }}
                  >
                    {groupCount}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontSize: "1.7rem",
                      fontWeight: "500",
                      color: theme.palette.secondary[200],
                    }}
                  >
                    Class Groups
                  </Typography>
                }
              />
            </ListItem>
          </List>
        </Box>
      </CardWrapper>
    </>
  );
};
export default ClassGroupCard;
