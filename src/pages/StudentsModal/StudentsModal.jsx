import React, { useState } from "react";
import Axios from "axios";
import configData from "../../config.json";

export const StudentsModal = ({ open, onClose, codeBlock, students }) => {
  const [studentLink, setStudentLink] = useState("");
  const [mentorLink, setMentorLink] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const api = Axios.create({
    baseURL: configData.production
      ? configData.server_url_prod
      : configData.local_server_url,
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
        console.log("could not create session while choosing student", res);
      });
  };

  const onCloseModal = () => {
    setShowMessage(false);
    onClose();
  };

  return (
    <div className="modal_background">
      <div className="modal_container">
        <div className="title_close_button">
          <button className="close_modal" onClick={onCloseModal}>
            X
          </button>
        </div>
        <div className="title">
          <h1>Choose Student:</h1>
        </div>

        <div className="links">
          {showMessage && (
            <a className="link" href={studentLink}>
              student's link
            </a>
          )}
          {showMessage && (
            <a className="link" href={mentorLink}>
              mentor's link
            </a>
          )}
        </div>

        <div className="students_list">
          {students.map((student) => (
            <button
              key={student._id}
              className="student"
              onClick={() => onStudentClick(student)}
            >
              {student.username}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
