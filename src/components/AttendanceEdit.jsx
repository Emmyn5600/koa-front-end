import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../services/Message";
import LoadingSpinner from "./common/LoadingSpinner";
import { loadAttendanceDetails, updateAttendance } from "../store/actions/actionCreators";
import FormContainer from "../services/FormContainer";
import { UPDATE_ATTENDANCES_RESET } from "../store/actions/actionTypes";


const AttendanceEdit = ({ match, history }) => {
  const attendanceId = match.params.id;

  const [attendancedate, setAttendanceDate] = useState("");
  const [attendanceentrancetime, setAttendanceEntranceTime] = useState("");
  const [attendanceexittime, setAttendanceExitTime] = useState("");


  const dispatch = useDispatch();

  const attendanceDetails = useSelector((state) => state.attendanceDetails);
  const { loading, error, attendance } = attendanceDetails;

  const attendanceUpdate = useSelector((state) => state.attendanceUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success } = attendanceUpdate;

  useEffect(() => {
    if (success) {
      dispatch({ type: UPDATE_ATTENDANCES_RESET });
      history.push("/dashboard/attendancelist");
    } else {
      if (!attendance.attendancedate || attendance._id !== attendanceId) {
        dispatch(loadAttendanceDetails(attendanceId));
      } else {
        setAttendanceDate(attendance.attendancedate);
        setAttendanceEntranceTime(attendance.attendanceentrancetime);
        setAttendanceExitTime(attendance.attendanceexittime);
      }
    }
  }, [dispatch, history, attendanceId, success, attendance]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateAttendance({
        _id: attendanceId,
        attendancedate,
        attendanceentrancetime,
        attendanceexittime,
      }),
    );
  };
  
  return (
    <>
      <Link to="/dashboard" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <LoadingSpinner />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
       
            <Form.Group controlId="entrancedate">
              <Form.Label>Entrance Date</Form.Label>
              <Form.Control
                type="date"
                value={attendancedate}
                onChange={(e) => setAttendanceDate(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="entrancetime">
            <Form.Label>Entrance Time</Form.Label>
              <Form.Control
                type="time"
                value={attendanceentrancetime}
                onChange={(e) => setAttendanceEntranceTime(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="countInStock">
            <Form.Label>Entrance Exit Time</Form.Label>
              <Form.Control
                type="type"
                value={attendanceexittime}
                onChange={(e) => setAttendanceExitTime(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="success">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
}

export default AttendanceEdit;
