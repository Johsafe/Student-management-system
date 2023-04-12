import './App.css';
import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
//components
import LoginScreen from './Components/Pages/LoginScreen';
import RegisterScreen from './Components/Pages/RegisterScreen';
import HomepageDetails from './Components/Layout/HomepageDetails';
import ForgetPassScreen from './Components/Pages/ForgetPassScreen';
//dashboard
import DashboardContent from './Dashboard/Layout/OverviewScreen';
import ReportScreen from './Dashboard/Pages/ReportsScreen';
import CourseScreen from './Dashboard/Pages/CourseScreen';
import AddCoursesScreen from './Dashboard/Pages/AddCoursesScreen';
import ClassGroupScreen from './Dashboard/Pages/ClassGroupScreen';
import CreateTimeTableScreen from './Dashboard/Pages/CreateTimetableScreen';
import ExaminationTimetableScreen from './Dashboard/Pages/ExaminationTimetableScreen';
import ViewTimeTable from './Dashboard/Pages/ViewExaminationTimeTableScreen';
import EditTimeTableScreen from './Dashboard/Pages/EditExaminationTimeTable';
import EditCoursesScreen from './Dashboard/Pages/EditCourseScreen';
import AddStudentScreen from './Dashboard/Pages/AddStudentScreen';
import StudentsScreen from './Dashboard/Pages/StudentsScreen';

import PageError from './Utils.js/PageError';

function App() {
  return (
    <div>
      <ToastContainer position="top-right" limit={1} />
      <Routes>
        <Route path="/" element={<HomepageDetails />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<RegisterScreen />} />
        <Route path="/forget" element={<ForgetPassScreen />} />
        <Route path="/dashboard" element={<DashboardContent />} />
        <Route path="/reports" element={<ReportScreen />} />
        <Route path="/course" element={<CourseScreen />} />
        <Route path="/add" element={<AddCoursesScreen />} />
        <Route path="/class" element={<ClassGroupScreen />} />
        <Route path="/:id/edit" element={<EditCoursesScreen />} />
        <Route path="/create" element={<CreateTimeTableScreen />} />
        <Route path="/examination" element={<ExaminationTimetableScreen />} />
        <Route path="/examination/edit" element={<EditTimeTableScreen />} />
        <Route path="/examination/view" element={<ViewTimeTable />} />
        <Route path="/addStudent" element={<AddStudentScreen />} />
        <Route path="/student" element={<StudentsScreen />} />

        <Route path="*" element={<PageError />} />
      </Routes>
    </div>
  );
}

export default App;
