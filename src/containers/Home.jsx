import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IconContext } from 'react-icons';
import { GoSearch } from 'react-icons/go';
import Navbar from '../components/common/Navbar';
import { toggleSidebar } from '../store/actions/actionCreators';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const Home = (props) => {
  const {
    history, currentUser, toggleSidebar,
  } = props;
  useEffect(() => {
    if (!currentUser) history.replace('/login');
  }, []);

  return (
    <div className="home-main-container">
      <div className="header">
        <Navbar
          title="welcome"
          rightIcon={(
            <IconContext.Provider value={{ className: 'home-search-icon' }}>
              <GoSearch />
            </IconContext.Provider>
          )}
          leftAction={toggleSidebar}
        />
      </div>
        <>
          <div className="home-counters-counter-wrapper d-flex flex-center">
              <h1>Welcome, Create your attendance</h1>
          </div>
          {' '}

      <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
              User Attendance
              </Typography>
              <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                   <span class> Attendance Date: </span>
                    <TextField
                      required
                      fullWidth
                      id="EntranceDate"
                      name="EntranceDate"
                      type="date"
                      autoComplete="EntranceDate"
                      // value={formData.attendancedate}
                      // onChange={(e) => setFormData({
                      //   ...formData, attendancedate: e.target.value
                      // })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                  <span class> Attendance Entrance Time: </span>
                    <TextField
                      required
                      fullWidth
                      id="EntranceTime"
                      name="Entrance Time"
                      type="time"
                      autoComplete="Entrance Time" 
                      // value={formData.attendanceentrancetime}
                      //  onChange={(e) => setFormData({
                      //    ...formData, attendanceentrancetime: e.target.value
                      //  })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                  <span class> Attendance Entrance Exit Time: </span>
                    <TextField
                      required
                      fullWidth
                      id="EntranceExitTime"
                      name="Entrance Exit Time"
                      type="time"
                      autoComplete="Entrance Exit Time"
                      //  value={formData.attendanceexittime}
                      //  onChange={(e) => setFormData({
                      //    ...formData, attendanceexittime: e.target.value
                      //  })}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Create Attendance
                </Button>
              </Box>
            </Box>
          </Container>
    </ThemeProvider>
        </>

    </div>
  );
};

Home.defaultProps = {
  currentUser: null,
};

Home.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  currentUser: PropTypes.objectOf(PropTypes.any),
  toggleSidebar: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = {
  toggleSidebar: () => toggleSidebar(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
