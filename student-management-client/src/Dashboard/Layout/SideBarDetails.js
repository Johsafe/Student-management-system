import { Dashboard, RememberMeOutlined } from '@mui/icons-material';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Link } from 'react-router-dom';
import './SideBar.css';
import VillaIcon from '@mui/icons-material/Villa';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SearchIcon from '@mui/icons-material/Search';
import SubjectIcon from '@mui/icons-material/Subject';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SchoolIcon from '@mui/icons-material/School';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventNoteIcon from '@mui/icons-material/EventNote';
export default function SideBarDetails() {
  return (
    <div>
      <div className="sidebar">
        {/* dashboard */}
        <div>
          <ul className="sidebarList">
            <h3 className="sidebarTitle">Quick Menu</h3>

            <Link to="/dashboard" className="link">
              <li className="sidebarListItem">
                <Dashboard className="sidebarIcon" />
                <b>Dashboard</b>
              </li>
            </Link>
            <Link to={'/reports'} className="link">
              <li className="sidebarListItem">
                <BarChartIcon className="sidebarIcon" />
                Reports
              </li>
            </Link>
            <h3 className="sidebarTitle">Departments</h3>
            <Link to={'/department'} className="link">
              <li className="sidebarListItem">
                <AccountTreeIcon className="sidebarIcon" />
                Departments
              </li>
            </Link>
            <Link to={'/studentreg'} className="link">
              <li className="sidebarListItem">
                <HowToRegIcon className="sidebarIcon" />
                Admissions
              </li>
            </Link>
            <Link to={'/course'} className="link">
              <li className="sidebarListItem">
                <SubjectIcon className="sidebarIcon" />
                Units/Subjects
              </li>
            </Link>
            <Link to={'/groups'} className="link">
              <li className="sidebarListItem">
                <SchoolIcon className="sidebarIcon" />
                Class
              </li>
            </Link>
            <Link to={'/examination'} className="link">
              <li className="sidebarListItem">
                <RememberMeOutlined className="sidebarIcon" />
                Examination
              </li>
            </Link>

            <Link to={'/rooms'} className="link">
              <li className="sidebarListItem">
                <VillaIcon className="sidebarIcon" />
                Rooms
              </li>
            </Link>
            <Link to={'/session'} className="link">
              <li className="sidebarListItem">
                <ScheduleIcon className="sidebarIcon" />
                Sessions
              </li>
            </Link>
            <h3 className="sidebarTitle">Sub-Menu</h3>
            <Link to={'/search'} className="link">
              <li className="sidebarListItem">
                <SearchIcon className="sidebarIcon" />
                Search
              </li>
            </Link>
            <Link to={'/attendance'} className="link">
              <li className="sidebarListItem">
                <EventAvailableIcon className="sidebarIcon" />
                Mark Attendance
              </li>
            </Link>
            <Link to={'/prevattendance'} className="link">
              <li className="sidebarListItem">
                <EventNoteIcon className="sidebarIcon" />
                Previous Attendance
              </li>
            </Link>
          </ul>

        </div>
      </div>
    </div>
  );
}
