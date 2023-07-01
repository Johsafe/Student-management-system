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
              display: 'flex',
              borderTop: '4px solid #42a5f5',
            }}
          >
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
