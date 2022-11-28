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
  const [uuid, setUuid] = useState("");
  const api = Axios.create({
    baseURL: "http://localhost:5000",
  });
  if (!open) return null;

  const onStudentClick = async (student) => {
    await api
      .post("/session", {
        data: {
          userId: student._id,
          codeBlockId: codeBlock._id,
        },
      })
      .then((res) => {
        setUuid(res.data.uuid);

        setMentorLink(
          "/codeBlock?uuid="
            .concat(res.data.uuid)
            .concat("&student_login=false&isStudent=false")
        );
        setStudentLink(
          "/codeBlock?uuid="
            .concat(res.data.uuid)
            .concat("&student_login=true&isStudent=true")
        );

        setShowMessage(true);
      })
      .catch((res) => {
        console.log("failed");
        return res.message;
      });
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
