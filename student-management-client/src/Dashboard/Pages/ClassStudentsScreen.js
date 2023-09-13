import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Container from "@mui/material/Container";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { getError } from "../../Utils/GetError";
import { useParams } from "react-router-dom";
import LoadingBox from "../../Utils/LoadingBox";
import { base_url } from "../../Utils/baseUrl";

export default function ClassStudentsScreen() {
  //get Students
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const params = useParams();
  async function getClassStudents() {
    try {
      const response = await fetch(
        `${base_url}student/group/${params.groupId}/students`
      );
      const getclassstudents = await response.json();
      setStudents(getclassstudents);
      setLoading(true);
    } catch (err) {
      toast.error(getError(err));
    }
  }

  useEffect(() => {
    getClassStudents();
  }, []);

  var i = 1;
  return (
    <div style={{ display: "flex" }}>
      <Container>
        <Helmet>
          <title>StudentsScreen</title>
        </Helmet>

        <div style={{ width: "800px" }}>
          <div style={{ height: 400, width: "100%" }}>
            <div className="dashboard">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">S/N</th>
                    <th scope="col">Admission</th>
                    <th scope="col">Lastname</th>
                    <th scope="col">Firstname</th>
                    <th scope="col">Email</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {students.length > 0 ? (
                    students.map((student) => (
                      <tr key={student._id}>
                        <th scope="row">{i++}</th>
                        <td>{student.admission} </td>
                        <td>{student.lastname}</td>
                        <td>{student.firstname} </td>
                        <td>{student.email} </td>
                        <td> {student.gender} </td>
                        <td> {student.phone} </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7}>
                        This Class Has No Students Found.Please Add New Students
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* ) : (
            <div>
              The Class Currently does not have any students pleaseregister new
              students
            </div>
          )
          //  :(
          //   <LoadingBox />
          // )
        } */}
      </Container>
    </div>
  );
}
