import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import { Navigate } from "react-router-dom";
import {
  LogoutOutlined,
  SettingsOutlined,
  VerifiedUserOutlined,
} from "@mui/icons-material";
import {
  ButtonBase,
  Card,
  CardContent,
  ClickAwayListener,
  Grid,
  Paper,
  Popper,
  Stack,
  Tab,
  Tabs,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";

const settings = ["Profile", "Account", "Logout"];
// let admin = JSON.parse(localStorage.getItem('Info'));
// function logOut() {
//   localStorage.clear();
//   Navigate('');
// }

// const signoutHandler = () => {
//     localStorage.removeItem("Details");
//     window.location.href = "/studentlogin";
//   };
//   <Link to="#signout" onClick={signoutHandler} className="link">
//   Log Out
//   </Link>

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

// tab panel wrapper
function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`
  };
}

export default function Header() {
  const theme = useTheme();
  const anchorRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <div>
      <div className="nav">
        <div>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="settings">
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Jose" src="/static/images/avatar/1.jpg" />
                </IconButton>
              </StyledBadge>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" >{setting}</Typography>
                </MenuItem>
              ))} */}
              <Card elevation={0} border={false} content={false}>
                <CardContent sx={{ px: 2.5, pt: 3 }}>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Stack direction="row" spacing={1.25} alignItems="center">
                        <Avatar
                          alt="profile user"
                          src="avatar"
                          sx={{ width: 32, height: 32 }}
                        />
                        <Stack>
                          <Typography variant="h6">John Doe</Typography>
                          <Typography variant="body2" color="textSecondary">
                            UI/UX Designer
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item>
                      <IconButton
                        size="large"
                        color="secondary"
                        // onClick={handleLogout}
                      >
                        <LogoutOutlined />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
                {open && (
                  <>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <Tabs
                        variant="fullWidth"
                        value={value}
                        onChange={handleChange}
                        aria-label="profile tabs"
                      >
                        <Tab
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            textTransform: "capitalize",
                          }}
                          icon={
                            <VerifiedUserOutlined
                              style={{ marginBottom: 0, marginRight: "10px" }}
                            />
                          }
                          label="Profile"
                          {...a11yProps(0)}
                        />
                        <Tab
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            textTransform: "capitalize",
                          }}
                          icon={
                            <SettingsOutlined
                              style={{ marginBottom: 0, marginRight: "10px" }}
                            />
                          }
                          label="Setting"
                          {...a11yProps(1)}
                        />
                      </Tabs>
                    </Box>
                    <TabPanel value={value} index={0} dir={theme.direction}>
                      {/* <ProfileTab handleLogout={handleLogout} />  */}profile
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                      {/* <SettingTab /> */} Setting
                    </TabPanel>
                  </>
                )}
              </Card>
            </Menu>
          </Box>
        </div>
      </div>
    </div>
  );
}
