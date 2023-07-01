import React from 'react';
import Button from '@mui/material/Button';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

export default function StudentUnitRegitration() {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '800px',
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
                <th scope="col">#</th>
                <th scope="col">Unit Code</th>
                <th scope="col">Unit Name</th>
                <th scope="col">Semeter</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">#</th>
                <td>COM 213</td>
                <td>INTRO TO GRAPHICS</td>
                <td>1</td>
                <td>confirmed</td>
                <td>
                  <Checkbox defaultChecked color="success" />
                </td>
              </tr>
              <tr>
                <th scope="row">#</th>
                <td>COM 214</td>
                <td>INTRO TO NETWORKING</td>
                <td>1</td>
                <td>
                  {' '}
                  <Button>Remove</Button>
                </td>
                <td>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="confirm" />
                  </FormGroup>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
