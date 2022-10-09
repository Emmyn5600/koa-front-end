import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IconContext } from 'react-icons';
import { GoSearch } from 'react-icons/go';
import PropTypes from 'prop-types';

import { toggleSidebar } from '../store/actions/actionCreators';
import Navbar from '../components/common/Navbar';
import Counter from '../components/common/Counter';
import UsersList from './UsersList';
import { loadUsersAsync, removeUserAsync } from '../store/thunks/usersThunk';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard = (props) => {
  const [currentTab, setCurrentTab] = useState('Attendances');
  const [showAttendancesForm, setShowAttendancesForm] = useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const {
    history,
    currentUser,
    isAdmin,
    toggleSidebar,
    loadUsers,
    users,
    removeUser,
    loadingUsers,
  } = props;

  useEffect(() => {
    if (!currentUser) history.replace('/login');
    if (!isAdmin) history.replace('/');
    loadUsers();
  }, []);

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
  };

  const handleIndexChange = (index) => {
    setCurrentIndex(index);
  };

  const handleToggleAttendancesForm = () => {
    setShowAttendancesForm(!showAttendancesForm);
  };

  const handleSubmitForm = (values) => {
    // addAttendances(values);
  };

  return (
    <div className="dashboard-main-container">
      <div className="dashboard-header">
        <Navbar
          title="Administrator"
          rightIcon={(
            <IconContext.Provider value={{ className: 'home-search-icon' }}>
              <GoSearch />
            </IconContext.Provider>
          )}
          leftAction={toggleSidebar}
        />
        <div className="dashboard-tabs-wrapper d-flex flex-center">
          <ul className="d-flex flex-center tabs-wrapper flex-unit">
            <li className="flex-unit">
              <a
                href="#f"
                className={
                  currentTab === 'Attendances'
                    ? 'dashboard-tab d-flex flex-center active'
                    : 'dashboard-tab d-flex flex-center'
                }
                onClick={() => handleTabClick('Attendances')}
              >
                Attendances
              </a>
            </li>
            <li className="flex-unit">
              <a
                href="#f"
                className={
                  currentTab === 'users'
                    ? 'dashboard-tab d-flex flex-center active'
                    : 'dashboard-tab d-flex flex-center'
                }
                onClick={() => handleTabClick('users')}
              >
                Users
              </a>
            </li>
          </ul>
        </div>
      </div>
     {/* <div>
       Attendances logic here
     </div> */}
    </div>
  );
};

Dashboard.defaultProps = {
  currentUser: null,
};

Dashboard.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  currentUser: PropTypes.objectOf(PropTypes.any),
  loadAttendances: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  loadUsers: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeUser: PropTypes.func.isRequired,
  removeAttendance: PropTypes.func.isRequired,
  // loadingAttendances: PropTypes.bool.isRequired,
  loadingUsers: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  isAdmin: state.auth.isAdmin,
  users: state.users.list,
  removeUser: state.users.removeUser,
  loadingAttendances: state.Attendances.loading,
  loadingUsers: state.users.loading,
});

const mapDispatchToProps = {
  toggleSidebar: () => toggleSidebar(),
  loadUsers: () => loadUsersAsync(),
  removeUser: (userId) => removeUserAsync(userId),
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
