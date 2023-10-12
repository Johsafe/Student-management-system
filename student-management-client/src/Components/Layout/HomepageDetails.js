import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedDetails from './FeaturedDetails';
import HeaderBar from './HeaderBar';
import { Container } from '@mui/material';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="#">
        Johsafe
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const mainFeaturedPost = {
  title: 'School Management System',
  description:
    'Designed to let the administration to manage and have an easy time to set exams timetable and classes',
  image: 'https://source.unsplash.com/random',
  imageText: 'main image description',
  // linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Admissions',
    description:
      'Register Students.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
  {
    title: 'Letting',
    description:
      'Alows for other lectures and other teachers to book rooms in the school for there use.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
];

const theme = createTheme();

function HomepageDetails() {
  return (
    <React.Fragment>
      <HeaderBar />
      {/* Hero unit */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ pt: 3, pb: 2 }}>
          <main>
            <MainFeaturedPost post={mainFeaturedPost} />
            <Grid container spacing={4}>
              {featuredPosts.map((post) => (
                <FeaturedDetails key={post.title} post={post} />
              ))}
            </Grid>
          </main>
        </Container>
      </ThemeProvider>
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 4,
          py: [1, 3],
        }}
      >
        <Copyright sx={{ mt: 2 }} />
      </Container>
    </React.Fragment>
  );
}

export default function HomePageDetails() {
  return (
    <div>
      <HomepageDetails />
    </div>
  );
}
