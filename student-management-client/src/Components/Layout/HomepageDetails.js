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

import { motion } from 'framer-motion';

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
  title: 'Online Room Booking For Schools Examination Hall',
  description:
    'Designed to let the administration to manage and have an easy time to set exams timetable and classes',
  image: 'https://source.unsplash.com/random',
  imageText: 'main image description',
  // linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Booking',
    description:
      'Lectures can book rooms where there students would take exams from.',
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
      {/* <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}
      />
      <CssBaseline /> */}
      <HeaderBar />
      {/* Hero unit */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ pt: 3, pb: 2 }}>
          {/* <Header title="Blog" sections={sections} /> */}
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

      {/* Footer */}
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

      {/* End footer */}
    </React.Fragment>
  );
}

export default function HomePageDetails() {
  return (
    <motion.div
      intial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HomepageDetails />
    </motion.div>
  );
}
