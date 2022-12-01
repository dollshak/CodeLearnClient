import React, { useState } from "react";
import Axios from "axios";
import configData from "../../config.json";

export const StudentsModal = ({ open, onClose, codeBlock }) => {
  const [students, setStudents] = React.useState([]);
  const [studentLink, setStudentLink] = useState("");
  const [mentorLink, setMentorLink] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const api = Axios.create({
    baseURL: configData.server_url,
  });
  if (!open) return null;

  //create new session with chosen student and code block
  const onStudentClick = async (student) => {
    await api
      .post("/session", {
        data: {
          userId: student._id,
          codeBlockId: codeBlock._id,
        },
      })
      .then((res) => {
        setMentorLink(
          "/codeBlock?uuid="
            .concat(res?.data?.uuid)
            .concat("&student_login=false&isStudent=false")
        );
        setStudentLink(
          "/codeBlock?uuid="
            .concat(res?.data?.uuid)
            .concat("&student_login=true&isStudent=true")
        );
        setShowMessage(true);
      })
      .catch((res) => {
        console.log("could not create session while choosing student");
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
        setStudents(res?.data);
      })
      .catch((err) => {});
  };

  return (
    <div className="students_modal">
      <div className="students_container">
        <button className="close_modal" onClick={onCloseModal}>
          X
        </button>
        <div className="title">
          <h1>Choose a Student</h1>
        </div>

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
