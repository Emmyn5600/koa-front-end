import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { BiEdit } from 'react-icons/bi';
import defaultAvatar from './defaultAvatar.png';

const Attendance = ({ attendance, dashboard }) => {
  const {
    user, attendanceDate, attendanceEntranceTime, attendanceExitTime
  } = attendance;
  return (
    <div className="course-main-wrapper d-flex flex-column">
      { dashboard && (
      <button type="button" className="course-delete-btn">
        <IconContext.Provider value={{ className: 'course-delete-trash-icon' }}>
          <BiEdit />
        </IconContext.Provider>
      </button>
      )}
      <div className="course-info-wrapper">
        <div className="course-author-duration d-flex flex-between">
            <div className="course-author-name d-flex flex-column">
                  <h4 className="author-name">
                    {user?.email}
                    {' '}
                : User-Email
                  </h4>
            </div>
            <div className="course-author-name d-flex flex-column">
              <h4 className="author-name">
                {attendanceDate}
                {' '}
              : Entrance  Date
              </h4>
            </div>
          <div className="course-duration d-flex flex-center text-center m-4">
            {attendanceEntranceTime}
            {' '}
            : Entrance Time
          </div>
          <div>
            {attendanceExitTime}
            {' '}
            : Exit Time
          </div>
        </div>
      </div>
    </div>
  );
};

Attendance.defaultProps = {
  dashboard: true,
};

Attendance.propTypes = {
  attendance: PropTypes.objectOf(PropTypes.any).isRequired,
  dashboard: PropTypes.bool,
};

export default Attendance;
