import React, { useState } from "react";
import Axios from "axios";

export const StudentsModal = ({ open, onClose }) => {
  const [students, setStudents] = React.useState([]);
  // const students = [{username: 'dollshak', password: '123', role: ''},
  // {username: 'peleg', password: '2', role: ''},
  // {username: 'gal', password: '1', role: ''}]
  const [studentLink, setStudentLink] = useState("");
  const [mentorLink, setMentorLink] = useState("");
  const [chosenStudent, setChosenStudent] = useState({});
  const [showMessage, setShowMessage] = useState(false);
  const api = Axios.create({
    baseURL: "http://localhost:5000",
  });
  if (!open) return null;

  //   const handleChange = (event) => {
  //     const value = event.target.value
  //     console.log(value);
  //     setChosenStudent(value)
  //     console.log(chosenStudent)
  // }

  const onStudentClick = (student) => {
    console.log(student.username);
    setStudentLink(student.username);
    setShowMessage(true);
    setChosenStudent(student);
  };

  const onCloseModal = () => {
    setShowMessage(false);
    onClose();
  };

  const loadStudents = () => {
    api
      .get("/users/students")
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {});
  };

  return (
    <div className="students_modal">
      <div className="students_container">
        <div className="close_modal">
          <button onClick={onCloseModal}>X</button>
        </div>

        <h1>Choose a Student</h1>

        <div className="links">
          {showMessage && <p>{studentLink}</p>}
          {showMessage && <p>{mentorLink}</p>}
          {showMessage && <p>{chosenStudent}</p>}
        </div>

        <div className="students_list">
          {loadStudents()}
          {students.map((student) => (
            <button className="student" onClick={() => onStudentClick(student)}>
              {student.username}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
