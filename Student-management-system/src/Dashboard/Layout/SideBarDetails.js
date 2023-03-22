// import * as React from 'react';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import ListSubheader from '@mui/material/ListSubheader';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import PeopleIcon from '@mui/icons-material/People';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import LayersIcon from '@mui/icons-material/Layers';
// // import AssignmentIcon from '@mui/icons-material/Assignment';
// import "./SideBar.css";

// export const SideBarDetails = (..
//   <React.Fragment>
//      <h3 className="sidebarTitle">Quick Menu</h3>
//     <ListItemButton>
//       <ListItemIcon>
//         <DashboardIcon />
//       </ListItemIcon>
//       <ListItemText primary="Dashboard" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <BarChartIcon />
//       </ListItemIcon>
//       <ListItemText primary="Reports" />
//     </ListItemButton>
//     <h3 className="sidebarTitle">Departments</h3>
//     <ListItemButton>
//       <ListItemIcon>
//         <PeopleIcon />
//       </ListItemIcon>
//       <ListItemText primary="Lectures" />
//     </ListItemButton>

//     <ListItemButton>
//       <ListItemIcon>
//         <LayersIcon />
//       </ListItemIcon>
//       <ListItemText primary="Integrations" />
//     </ListItemButton>
//   </React.Fragment>
// );

// export const secondaryListItems = (
//   <React.Fragment>
//     <ListSubheader component="div" inset>
//       Saved reports
//     </ListSubheader>
//     <ListItemButton>
//       <ListItemIcon>
//         {/* <AssignmentIcon /> */}
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         {/* <AssignmentIcon /> */}
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         {/* <AssignmentIcon /> */}
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItemButton>
//   </React.Fragment>
// );

import {
  ArrowBackIos,
  BiotechOutlined,
  ContentCutOutlined,
  Dashboard,
  People,
  RememberMeOutlined,
  Vaccines,
} from '@mui/icons-material';
import BarChartIcon from '@mui/icons-material/BarChart';

import { Link } from 'react-router-dom';
import './SideBar.css';

export default function SideBarDetails() {
  return (
    <div>
      <div className="sidebar">
        <div className="sidebarWrapper">
          {/* dashboard */}
          <div className="sidebarMenu">
            <ul className="sidebarList">
              <h3 className="sidebarTitle">Quick Menu</h3>
              <Link to={'/'} className="link">
                <li className="sidebarListItem">
                  <ArrowBackIos className="sidebarIcon" />
                  Go Back
                </li>
              </Link>
              <Link to="/dashboard" className="link">
                <li className="sidebarListItem">
                  <Dashboard className="sidebarIcon" />
                  <b>Dashboard</b>
                </li>
              </Link>
              <Link href="/reports" className="link">
                <li className="sidebarListItem">
                  <BarChartIcon className="sidebarIcon" />
                  Reports
                </li>
              </Link>
              <h3 className="sidebarTitle">Departments</h3>
              <Link to={'/registration'} className="link">
                <li className="sidebarListItem">
                  <People className="sidebarIcon" />
                  Registration
                </li>
              </Link>
              <Link to={'/course'} className="link">
                <li className="sidebarListItem">
                  <BiotechOutlined className="sidebarIcon" />
                  Courses
                </li>
              </Link>
              <Link to={'/class'} className="link">
                <li className="sidebarListItem">
                  <ContentCutOutlined className="sidebarIcon" />
                  Class Group
                </li>
              </Link>
              <Link to={'/examination'} className="link">
                <li className="sidebarListItem">
                  <RememberMeOutlined className="sidebarIcon" />
                  Examination
                </li>
              </Link>
              <Link to={'/students'} className="link">
                <li className="sidebarListItem">
                  <Vaccines className="sidebarIcon" />
                  Students
                </li>
              </Link>
            </ul>
          </div>
          {/* quick menu */}
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Summaries</h3>
            <ul className="sidebarList">
              {/* <Link to={'/patientsummaries'} className="link">
                <li className="sidebarListItem">
                  <SavedSearch className="sidebarIcon" />
                  Patient Summaries
                </li>
              </Link> */}

              {/* <Link to={"/departmentsummaries"} className="link">
                <li className="sidebarListItem">
                  <AssessmentOutlined className="sidebarIcon" />
                  Department Summaries
                </li>
              </Link>
              <Link to={"/nhifsummaries"} className="link">
                <li className="sidebarListItem">
                  <BarChartOutlined className="sidebarIcon" />
                  NHIF Summaries
                </li>
              </Link> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
