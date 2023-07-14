import React from 'react';
import Copyright from '../../Utils/Copyright';
import { Helmet } from 'react-helmet-async';
import { Card, Container } from '@mui/material';
import SideBarDetails from '../Layout/SideBarDetails';
import bg2 from '../../Static/bg2.png';

export default function SearchStudent() {
  return (
    <div style={{ display: 'flex' }}>
      <SideBarDetails />
      <Container component="main">
        <Helmet>
          <title>Search</title>
        </Helmet>
        <div style={{ margin: '3rem' }}>
          <h1>Search For A Student</h1>
          <Card
            style={{
              padding: '2rem',
              borderTop: '4px solid #42a5f5',
            }}
          >
            <div className="search-form">
              <form 
              // onSubmit={formSubmit}
              >
                <input
                  className="first-input"
                  type="text"
                  // value={name}
                  placeholder="Enter the name of student"
                  // onChange={(e) => setName(e.target.value)}
                  required
                />
                <select
                  id="class"
                  // value={classname}
                  // onChange={(e) => setClassname(e.target.value)}
                  required
                >
                  <option value="">Select Class</option>
                  <option value="Nursery">Nursery</option>
                  <option value="LKG">LKG</option>
                  <option value="UKG">UKG</option>
                  <option value="One">One</option>
                  <option value="Two">Two</option>
                  <option value="Three">Three</option>
                  <option value="Four">Four</option>
                  <option value="Five">Five</option>
                  <option value="Six">Six</option>
                  <option value="Seven">Seven</option>
                  <option value="Eight">Eight</option>
                  <option value="Nine">Nine</option>
                  <option value="Ten">Ten</option>
                </select>
                <input
                  type="number"
                  // value={rollno}
                  // onChange={(e) => setRollno(e.target.value)}
                  placeholder="Enter the roll no"
                  required
                />
                <button className="btn-search" type="submit">
                  Search
                </button>
              </form>
            </div>

            <div style={{ display: 'flex' }}>
              <div className="profile-card-2">
                <img src={bg2} className="img img-responsive" />
                <div class="profile-name">JOHN DOE PETERSON</div>
                <div class="profile-username">@johndoesurname</div>
              </div>

              <div className="profile-card-2">
                <img src={bg2} className="img img-responsive" />
                <div class="profile-name">JOHN DOE PETERSON</div>
                <div class="profile-username">@johndoesurname</div>
              </div>

              <div className="profile-card-2">
                <img src={bg2} className="img img-responsive" />
                <div class="profile-name">JOHN DOE PETERSON</div>
                <div class="profile-username">@johndoesurname</div>
              </div>

              <div className="profile-card-2">
                <img src={bg2} className="img img-responsive" />
                <div class="profile-name">JOHN DOE PETERSON</div>
                <div class="profile-username">@johndoesurname</div>
              </div>
            </div>
          </Card>
        </div>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </div>
  );
}
