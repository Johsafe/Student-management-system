import * as React from "react";
import { toast } from "react-toastify";
import { getError } from "../../Utils/GetError";
import { base_url } from "../../Utils/baseUrl";
import MessageBox from "../../Utils/MessageBox";

export default function AdminUnitRegitration({ group }) {
  const [loading, setLoading] = React.useState(false);
  const [classcourse, setClasscourse] = React.useState([]);

  async function getcourses() {
    try {
      const response = await fetch(
        `${base_url}course/group/${group._id}/course`
      );
      const getclasscourses = await response.json();
      setClasscourse(getclasscourses);
      setLoading(true);
      console.warn(getclasscourses);
    } catch (err) {
      toast.error(getError(err));
    }
  }

  React.useEffect(() => {
    getcourses();
  }, []);

  var i = 1;
  return (
    <div style={{ width: "800px" }}>
      <div className="dashboard">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">S/N</th>
              <th scope="col">Code</th>
              <th scope="col">Title</th>
              <th scope="col">Semeter</th>
              <th scope="col">year</th>
            </tr>
          </thead>
          <tbody>
            {classcourse.length > 0 ? (
              classcourse.map((course) => (
                <tr>
                  <th scope="row">{i++}</th>
                  <td>{course.code}</td>
                  <td>{course.title}</td>
                  <td>{course.semister}</td>
                  <td>{course.year}</td>
                </tr>
              ))
            ) : (
              <MessageBox>
                This Class Has No Units.Please Add New Units
              </MessageBox>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
