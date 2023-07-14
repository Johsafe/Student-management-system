import React from 'react';
import { Route, Routes } from 'react-router-dom';
// Component routes
import HomePageDetails from '../Components/Layout/HomepageDetails';
import ForgetPassScreen from '../Components/Pages/ForgetPassScreen';
import LoginScreen from '../Components/Pages/LoginScreen';
import RegisterScreen from '../Components/Pages/RegisterScreen';
import StudentLoginScreen from '../Components/Pages/StudentLoginScreen';

//Dashboard routes
import AddCoursesScreen from '../Dashboard/Pages/AddCoursesScreen';
import EditCoursesScreen from '../Dashboard/Pages/EditCourseScreen';
import AddStudentScreen from '../Dashboard/Pages/AddStudentScreen';
import ClassGroupScreen from '../Dashboard/Pages/ClassGroupScreen';
import CourseScreen from '../Dashboard/Pages/CourseScreen';
import CreateTimeTableScreen from '../Dashboard/Pages/CreateTimetableScreen';
import EditTimeTableScreen from '../Dashboard/Pages/EditExaminationTimeTable';
import ExaminationTimetableScreen from '../Dashboard/Pages/ExaminationTimetableScreen';
import ViewTimeTable from '../Dashboard/Pages/ViewExaminationTimeTableScreen';
import StudentsGroupScreen from '../Dashboard/Pages/StudentsGroupScreen';
import AllStudentsScreen from '../Dashboard/Pages/StudentsScreen';
import ReportScreen from '../Dashboard/Pages/ReportsScreen';
import RoomsScreen from '../Dashboard/Pages/RoomsScreen';
import PeriodsScreen from '../Dashboard/Pages/PeriodsScreen';
import DashboardContent from '../Dashboard/Layout/OverviewScreen';
import ProfileInfoScreen from '../Dashboard/StudentPages/ProfileInfoScreen';
import EditStudentScreen from '../Dashboard/StudentPages/EditStudentScreen';
// others
import PageError from './PageError';
import SearchStudent from '../Dashboard/Pages/SearchStudent';
import AdminUnitRegitration from '../Dashboard/Pages/AdminUnitRegitration';
import DepartmentScreen from '../Dashboard/Pages/DepartmentScreen';
import ViewGroupProfileScreen from '../Dashboard/Pages/ViewGroupProfileScreen';
import EditClassGroupScreen from '../Dashboard/Pages/EditClassGroup';
import ViewStudentScreen from '../Dashboard/Pages/ViewStudentScreen';
import AdminEditStudentScreen from '../Dashboard/Pages/EditStudentScreen';
import PrivateRoute from './PrivateRoute';

export default function PageAnimation() {
  return (
    <div>
      {' '}
      <Routes>
        <Route path="/" element={<HomePageDetails />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<RegisterScreen />} />
        <Route path="/forget" element={<ForgetPassScreen />} />
        <Route exact path="/dashboard" element={<DashboardContent />} />
        <Route path="/reports" element={<ReportScreen />} />
        <Route path="/course" element={<CourseScreen />} />
        <Route path="/add" element={<AddCoursesScreen />} />
        <Route path="/class" element={<ClassGroupScreen />} />
        <Route path="/:id/edit" element={<EditCoursesScreen />} />
        <Route
          path="/groups/:groupId/classedit"
          element={<EditClassGroupScreen />}
        />
        <Route path="/create" element={<CreateTimeTableScreen />} />
        <Route path="/examination" element={<ExaminationTimetableScreen />} />
        <Route path="/examination/edit" element={<EditTimeTableScreen />} />
        <Route path="/examination/view" element={<ViewTimeTable />} />
        <Route path="/addstudent" element={<AddStudentScreen />} />
        <Route path="/studentlogin" element={<StudentLoginScreen />} />
        <Route path="/groups" element={<StudentsGroupScreen />} />
        <Route path="/profile" element={<ProfileInfoScreen />} exact />
        <Route path="/groups/:id/students" element={<AllStudentsScreen />} />
        <Route path="/myprofile/update" element={<EditStudentScreen />} />
        <Route path="/rooms" element={<RoomsScreen />} />
        <Route path="/period" element={<PeriodsScreen />} />
        <Route path="/search" element={<SearchStudent />} />
        <Route path="/department" element={<DepartmentScreen />} />
        <Route path="/studentreg" element={<AllStudentsScreen />} />
        <Route path="/:studentId/viewstudent" element={<ViewStudentScreen />} />
        <Route
          path="/:studentId/editstudent"
          element={<AdminEditStudentScreen />}
        />
        <Route
          path="/adminunitregistration"
          element={<AdminUnitRegitration />}
        />
        <Route
          path="/groups/:groupId/viewclass"
          element={<ViewGroupProfileScreen />}
        />
        <Route path="*" element={<PageError />} />
      </Routes>
    </div>
  );
}
