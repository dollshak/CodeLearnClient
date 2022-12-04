import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import Highlight from "react-highlight";
import io from "socket.io-client";
import configData from "../../config.json";

const socket = io.connect(
  configData.production ? configData.socket_prod : configData.local_server_url
);

const CodeBlockPage = () => {
  const [searchParams] = useSearchParams();
  const [sessionUuid, setSessionUuid] = useState();
  const [student_login, setStudent_login] = useState();
  const [codeBlockTitle, setCodeBlockTitle] = useState("");
  const [textBox, setTextBox] = useState("");
  const [isStudent, setIsStudent] = useState("");
  const [first, setFirst] = useState("");

  const api = Axios.create({
    baseURL: configData.production
      ? configData.server_url_prod
      : configData.local_server_url,
  });

  const navigate = useNavigate();

  const sendCodeToMentor = (newCode) => {
    socket.emit("update_code", { code: newCode, sessionUuid: sessionUuid });
  };

  //recive updated code from student via socket
  useEffect(() => {
    socket.on("receive_updated_code", (data) => {
      setTextBox(data.code);
    });
  }, []);

  //make mentor register to student changes via socket
  useEffect(() => {
    socket.emit("join_session", sessionUuid);
  }, [sessionUuid]);

  const setParams = () => {
    setSessionUuid(searchParams.get("uuid"));
    setStudent_login(searchParams.get("student_login"));
    setIsStudent(searchParams.get("isStudent"));
  };

  useEffect(() => {
    setParams();
    if (student_login === "true") {
      navigate("/login?uuid=".concat(sessionUuid));
    }

    api
      .get("/session/".concat(sessionUuid))
      .then((res) => {
        return res?.data[0]?.codeBlockId;
      })
      .catch((err) => {
        console.log(err);
      })
      .then((codeBlockId) => {
        if (codeBlockId) {
          api.get("/codeBlock/".concat(codeBlockId)).then((response) => {
            setCodeBlockTitle(response?.data[0]?.title);
            if (first === "") {
              setTextBox(response?.data[0]?.code);
              setFirst("not first time"); //make sure textBox update happens one time
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const handleChange = (text) => {
    setTextBox(text);
    sendCodeToMentor(text);
  };

  return (
    <div className="code_block_page">
      <div className="code_clock_container">
        <h1 className="code_block_name">{codeBlockTitle}</h1>
        <div className="text_area_contaier">
          <textarea
            id="editing"
            hidden={isStudent === "false"}
            spellCheck="false"
            value={textBox}
            className="text_area"
            onChange={(ev) =>
              isStudent === "true" && handleChange(ev.target.value)
            }
          ></textarea>
        </div>

        <div className="highlight" id="highlighting">
          <Highlight className="javascript">{textBox}</Highlight>
        </div>
      </div>
    </div>
  );
};

export default CodeBlockPage;
