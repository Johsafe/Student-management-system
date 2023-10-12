import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { base_url } from "../../Utils/baseUrl";
import { getError } from "../../Utils/GetError";
import { toast } from "react-toastify";
import MessageBox from "../../Utils/MessageBox";

export default function StudentUnitAdminReg({ studentId }) {
  //get students unit registerd
  const [unitreg, setUnitreg] = useState([]);
  async function getunitreg() {
    try {
      const response = await fetch(
        `${base_url}unitreg/unitreg/${studentId}`
      );
      const getunitreg = await response.json();
      setUnitreg(getunitreg);
      
      console.log(getunitreg);
    } catch (err) {
      toast.error(getError(err));
    }
  }
  useEffect(() => {
    getunitreg();
  }, []);

//   removeUnit
async function  removeUnit(id) {
    try {
       
        const res = await fetch(`${base_url}unitreg/remove`, {
           method: "POST",
           body:JSON.stringify({ studentId, id }),
           headers: { "Content-Type": "application/json" },
         })
         const reg = await res.json();
         console.warn(reg)
         console.warn(studentId)
         console.warn(id)
        //  window.location = `${studentId}/viewstudent`;
         toast.success("Unit removed");
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
              {unitreg &&
                unitreg.map((unit) => (
                  <tr key={unit._id}>
                    <th scope="row">{i++}</th>
                    <td>{unit.code} </td>
                    <td>{unit.title}</td>
                    <td>{unit.semister}</td>
                    <td>{unit.year}</td>
                    <td>
                      {" "}
                      <Button onClick={() => removeUnit(unit._id)}>Remove</Button>
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
