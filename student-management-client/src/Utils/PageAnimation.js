import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePageDetails from '../Components/Layout/HomepageDetails';
import ForgetPassScreen from '../Components/Pages/ForgetPassScreen';
import LoginScreen from '../Components/Pages/LoginScreen';
import RegisterScreen from '../Components/Pages/RegisterScreen';
import AddCoursesScreen from '../Dashboard/Pages/AddCoursesScreen';
import AddStudentScreen from '../Dashboard/Pages/AddStudentScreen';
import ClassGroupScreen from '../Dashboard/Pages/ClassGroupScreen';
import CourseScreen from '../Dashboard/Pages/CourseScreen';
import CreateTimeTableScreen from '../Dashboard/Pages/CreateTimetableScreen';
import EditCoursesScreen from '../Dashboard/Pages/EditCourseScreen';
import EditTimeTableScreen from '../Dashboard/Pages/EditExaminationTimeTable';
import ExaminationTimetableScreen from '../Dashboard/Pages/ExaminationTimetableScreen';
import ViewTimeTable from '../Dashboard/Pages/ViewExaminationTimeTableScreen';
import DashboardContent from '../Dashboard/Layout/OverviewScreen';
import ReportScreen from '../Dashboard/Pages/ReportsScreen';
import PageError from './PageError';

import { AnimatePresence } from 'framer-motion';
import ProfileInfoScreen from '../Dashboard/StudentPages/ProfileInfoScreen';
import StudentLoginScreen from '../Components/Pages/StudentLoginScreen';
import StudentsGroupScreen from '../Dashboard/Pages/StudentsGroupScreen';
import AllStudentsScreen from '../Dashboard/Pages/StudentsScreen';
import EditStudentScreen from '../Dashboard/StudentPages/EditStudentScreen';
// import PrivateRoute from './PrivateRoutes';
import ChangePassword from '../Dashboard/StudentPages/ChangePassword';

export default function PageAnimation() {
  const location = useLocation();
  return (
    <div>
      {' '}
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePageDetails />} />
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
          <Route path="/group/:id/student" element={<AddStudentScreen />} />
          <Route path="/studentlogin" element={<StudentLoginScreen />} />
          <Route path="/groups" element={<StudentsGroupScreen />} />
          <Route path="/profile" element={<ProfileInfoScreen />} exact />
          <Route path="/groups/:id/students" element={<AllStudentsScreen />} />
          <Route path="/myprofile/update" element={<EditStudentScreen />} />
          <Route path="/changepassword" element={<ChangePassword/>}/>

          <Route path="*" element={<PageError />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
