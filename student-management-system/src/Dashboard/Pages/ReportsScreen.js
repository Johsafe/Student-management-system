// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
// import SideBarDetails from '../SideBarDetails';
// import '../Dashboard.css'

// export default function ReportScreen() {
//   const [value, setValue] = React.useState('1');

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <>
//     <div className='container'>
//       <div>
//         <SideBarDetails />
//       </div>

//       <div>
//         {/* <Box> */}
//           <TabContext value={value}>
//             <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//               <TabList
//                 onChange={handleChange}
//                 aria-label="lab API tabs example"
//               >
//                 <Tab label="General Reports" value="1" />
//                 <Tab label="Class Reports" value="2" />
//                 <Tab label="Students Report" value="3" />
//               </TabList>
//             </Box>
//             <TabPanel value="1">General Report</TabPanel>
//             <TabPanel value="2">Class Reports</TabPanel>
//             <TabPanel value="3">Students Report</TabPanel>
//           </TabContext>
//         {/* </Box> */}
//       </div>
//       </div>
//     </>
//   );
// }
