// // import React, { useState } from 'react';
// // // import axios from 'axios';
// // // import './App.css';

// // function Test() {
// //   const [group, setGroup] = useState('');
// //   const [students, setStudents] = useState([]);
// //   const [message, setMessage] = useState('');

// //   const handleAddStudent = () => {
// //     setStudents([...students, { firstname: '', lastname: '', admission: '', present: true }]);
// //   };

// //   const handleStudentChange = (index, field, value) => {
// //     const updatedStudents = [...students];
// //     updatedStudents[index][field] = value;
// //     setStudents(updatedStudents);
// //   };

// //   const handleSubmit = async () => {
// //     try {
// //     //   const response = await axios.post('/attendance/mark', { group, students });
// //     //   setMessage(response.data.message);
// //     console.log({ group, students });
// //     } catch (error) {
// //       setMessage('An error occurred.');
// //     }
// //   };

// //   return (
// //     <div className="App">
// //       <h2>Mark Student Attendance</h2>
// //       <div>
// //         <label htmlFor="group">Group:</label>
// //         <input
// //           type="text"
// //           id="group"
// //           value={group}
// //           onChange={(e) => setGroup(e.target.value)}
// //         />
// //       </div>
// //       <h3>Students:</h3>
// //       <button onClick={handleAddStudent}>Add Student</button>
// //       {students.map((student, index) => (
// //         <div key={index} className="student">
// //           <input
// //             type="text"
// //             placeholder="First Name"
// //             value={student.firstname}
// //             onChange={(e) => handleStudentChange(index, 'firstname', e.target.value)}
// //           />
// //           <input
// //             type="text"
// //             placeholder="Last Name"
// //             value={student.lastname}
// //             onChange={(e) => handleStudentChange(index, 'lastname', e.target.value)}
// //           />
// //           <input
// //             type="text"
// //             placeholder="Admission ID"
// //             value={student.admission}
// //             onChange={(e) => handleStudentChange(index, 'admission', e.target.value)}
// //           />
// //           <label>
// //             Present:
// //             <input
// //               type="checkbox"
// //               checked={student.present}
// //               onChange={(e) => handleStudentChange(index, 'present', e.target.checked)}
// //             />
// //           </label>
// //         </div>
// //       ))}
// //       <button onClick={handleSubmit}>Submit</button>
// //       <p>{message}</p>
// //     </div>
// //   );
// // }

// // export default Test;



// // import React, { useState } from 'react';
// // import axios from 'axios';

// // const MarkAttendance = () => {
// //   const [studentsData, setStudentsData] = useState([
// //     {
// //       firstname: 'John',
// //       lastname: 'Doe',
// //       admission: 'A123',
// //       group: 'GroupA',
// //       attendanceStatus: 'present', // Default attendance status
// //     },
// //     {
// //       firstname: 'Jane',
// //       lastname: 'Smith',
// //       admission: 'A456',
// //       group: 'GroupA',
// //       attendanceStatus: 'present', // Default attendance status
// //     },
// //     // ...add more student data
// //   ]);
// //   const [message, setMessage] = useState('');

// //   const handleAttendanceStatusChange = (index, value) => {
// //     const updatedStudentsData = [...studentsData];
// //     updatedStudentsData[index].attendanceStatus = value;
// //     setStudentsData(updatedStudentsData);
// //   };

// //   const handleMarkAttendance = async () => {
// //     try {
// //       // const response = await axios.post('/attendance/mark', {
// //       //   students: studentsData,
// //       // });
// //       // setMessage(response.data.message);
// //       console.log({ studentsData });
// //     } catch (error) {
// //       setMessage('An error occurred.');
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Mark Student Attendance</h2>
// //       {studentsData.map((student, index) => (
// //         <div key={index} className="student">
// //           <p>{`${student.firstname} ${student.lastname} (${student.admission})`}</p>
// //           <select
// //             value={student.attendanceStatus}
// //             onChange={(e) => handleAttendanceStatusChange(index, e.target.value)}
// //           >
// //             <option value="present">Present</option>
// //             <option value="absent">Absent</option>
// //             <option value="excused">Excused</option>
// //           </select>
// //         </div>
// //       ))}
// //       <button onClick={handleMarkAttendance}>Mark Attendance</button>
// //       <p>{message}</p>
// //     </div>
// //   );
// // };

// // export default MarkAttendance;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { Navigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { getError } from '../../Utils/GetError';

// const MarkAttendance = () => {
//   // const { groupId } = useParams();
//   const groupId = '123456qweertyu'
//   const [students, setStudents] = useState([
//     {
//       firstname: 'John',
//       lastname: 'Doe',
//       admission: 'A123',
//       group: 'GroupA',
//       status: 'absent',
//     },
//     {
//       firstname: 'Jane',
//       lastname: 'Smith',
//       admission: 'A456',
//       group: 'GroupA',
//       status: 'absent',
//     },
//   ]);

//   const handleStatusChange = (index, status) => {
//     const updatedStudents = [...students];
//     updatedStudents[index].status = status;
//     setStudents(updatedStudents);
//   };

//   // const handleSubmit = async () => {
//   //   try {
//   //     const response = await axios.post(`http://localhost:8000/system/student/mark`, {
//   //       group: groupId,
//   //       students: students,
//   //     });
//   //     console.log({groupId ,students})
//   //     console.log(response.data.message);
//   //   } catch (error) {
//   //     console.error('An error occurred:', error);
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const body = {
//         group: groupId,
//         students: students,
//       };
//       console.warn(body)
//       const result = await fetch('http://localhost:8000/system/student/mark',
//         {
//           method: 'POST',
//           headers: { 'Content-type': 'application/json' },
//           body: JSON.stringify(body),

//         }
//       );
//       const adddepartment = await result.json();
//       // console.log(abbr, title);
//       // console.log(adddepartment);
//       console.log({groupId ,students})
//     } catch (err) {
//       toast.error(getError(err));
//       console.error(err.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Mark Student Attendance</h2>
//       <h3>Group: {groupId}</h3>
//       {students.map((student, index) => (
//         <div key={index} className="student">
//           <p>
// //             {student.firstname} {student.lastname} - {student.admission}
// //           </p>
// //           <select
// //             value={student.status}
// //             onChange={(e) => handleStatusChange(index, e.target.value)}
// //           >
// //             <option value="present">Present</option>
// //             <option value="absent">Absent</option>
// //             <option value="excused">Excused</option>
// //           </select>
// //         </div>
// //       ))}
// //       <button onClick={handleSubmit}>Submit</button>
// //     </div>
// //   );
// // };

// // export default MarkAttendance;


import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}
