import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { base_url } from "../../Utils/baseUrl";
import { getError } from "../../Utils/GetError";
import { toast } from "react-toastify";
import MessageBox from "../../Utils/MessageBox";

export default function StudentUnitRegitration({ group, student, studentId }) {
  //get students class unit registerd
  const [classcourse, setClasscourse] = React.useState([]);
  let User = JSON.parse(localStorage.getItem("Details"));

  async function getcourses() {
    try {
      const response = await fetch(
        `${base_url}course/group/${group._id}/course`
      );
      const getclasscourses = await response.json();
      setClasscourse(getclasscourses);
      console.warn(getclasscourses);
    } catch (err) {
      toast.error(getError(err));
    }
  }

  React.useEffect(() => {
    getcourses();
  }, []);

  //
  //student unit registration
  // async (isbn, userId) => {
  //   const res = await fetch("/v1/user/borrow", {
  //     method: "POST",
  //     body: JSON.stringify({ isbn, userId }),
  //     headers: { "Content-Type": "application/json" },
  //   })
  //   return res.json()
  // },
  async function regUnit(id) {
    try {
      const res = await fetch(`${base_url}unitreg/unitreg`, {
        method: "POST",
        body: JSON.stringify({ studentId, id }),
        headers: {
         "Content-Type": "application/json" ,
          authorization: `Bearer ${User.token}`,
        },
      });
      const reg = await res.json();
      console.warn(reg);
      toast.success("Unit added");
    } catch (err) {
      toast.error(getError(err));
    }
  }
  var i = 1;
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "800px",
        }}
      >
        <h5>Booked Units</h5>
        <Button>Remove All</Button>
      </div>

      <div>
        <div>
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">S/N</th>
                <th scope="col">Unit Code</th>
                <th scope="col">Unit Name</th>
                <th scope="col">Semeter</th>
                <th scope="col">Year</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {classcourse.map((unit) => (
                <tr key={unit._id}>
                  <th scope="row">{i++}</th>
                  <td>{unit.code} </td>
                  <td>{unit.title}</td>
                  <td>{unit.semister}</td>
                  <td>{unit.year}</td>
                  <td>
                    <Button
                      onClick={() => regUnit(unit._id)}

                      //  disabled={unit && student  && unit.borrowedBy.includes(studentId)}
                    >
                      Enroll
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
