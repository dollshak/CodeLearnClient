import React, { useEffect, useState } from "react";
import Axios from "axios";

export const StudentsModal = ({ open, onClose, codeBlock }) => {
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

  const createSession = () => {
    return {
      uuid: 5,
    };
  };

  const onStudentClick = (student) => {
    console.log(codeBlock);
    console.log(student);
    // setStudentLink(student.username);
    // setChosenStudent((student) => ({
    //   ...student,
    //   username: student.username,
    // }));
    // setChosenStudent((student) => ({
    //   ...student,
    //   password: student.password,
    // }));
    // setChosenStudent((student) => ({
    //   ...student,
    //   role: student.role,
    // }));

    const session = createSession();

    setMentorLink(
      "/codeBlock?uuid=".concat(session.uuid).concat("&student_login=false")
    );
    setStudentLink(
      "/codeBlock?uuid=".concat(session.uuid).concat("&student_login=true")
    );

    setShowMessage(true);
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
          {showMessage && <a href={studentLink}>student's link</a>}
          {showMessage && <a href={mentorLink}>mentor's link</a>}
          {/* {showMessage && <p>{chosenStudent}</p>} */}
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
