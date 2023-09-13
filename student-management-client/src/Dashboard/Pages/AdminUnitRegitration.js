import * as React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getError } from "../../Utils/GetError";
import { base_url } from "../../Utils/baseUrl";

export default function AdminUnitRegitration() {
  const [loading, setLoading] = React.useState(false);
  const [classcourse, setClasscourse] = React.useState([]);
  const params = useParams();
  const { id: groupId } = params;

  async function getcourses() {
    try {
      const response = await fetch(`${base_url}course/group/${groupId}/course`);
      const getclasscourses = await response.json();
      setClasscourse(getclasscourses);
      setLoading(true);
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
        {classcourse.length > 0 ? (
          classcourse.map((course) => (
            <table key={course.id} class="table table-hover">
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
                <tr>
                  <th scope="row">{i++}</th>
                  <td>{course.code}</td>
                  <td>{course.title}</td>
                  <td>{course.semister}</td>
                  <td>{course.year}</td>
                </tr>
              </tbody>
            </table>
          ))
        ) : (
          <tr>
            <td colSpan={7}>No Class Units Found.Please Add New Class Units</td>
          </tr>
        )}
      </div>
    </div>
  );
}
