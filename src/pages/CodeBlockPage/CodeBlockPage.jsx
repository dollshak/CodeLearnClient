import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import Highlight from "react-highlight";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");

const CodeBlockPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sessionUuid, setSessionUuid] = useState();
  const [student_login, setStudent_login] = useState();
  const [codeBlockTitle, setCodeBlockTitle] = useState("");
  const [codeBlockCode, setCodeBlockCode] = useState("");
  const [textBox, setTextBox] = useState("const h = true;");
  const [isStudent, setIsStudent] = useState("");

  const api = Axios.create({
    baseURL: "http://localhost:5000",
  });
  const navigate = useNavigate();

  const sendCodeToMentor = (newCode) => {
    console.log("sending");
    socket.emit("update_code", { code: newCode, sessionUuid: sessionUuid });
  };

  useEffect(() => {
    socket.on("receive_updated_code", (data) => {
      setTextBox(data.code);
    });
  }, [socket]);

  useEffect(() => {
    socket.emit("join_session", sessionUuid);
  }, [sessionUuid]);

  useEffect(() => {
    setSessionUuid(searchParams.get("uuid"));
    setStudent_login(searchParams.get("student_login"));
    setIsStudent(searchParams.get("isStudent"));
    console.log("from params", searchParams.get("isStudent"));
    console.log("from this", isStudent);
    if (student_login === "true") {
      console.log("student login true");
      navigate("/login?uuid=".concat(sessionUuid));
    }

    api
      .get("/session/".concat(sessionUuid))
      .then((res) => {
        console.log("got session", res.data[0]);
        api.get("/codeBlock/".concat(res.data[0].codeBlockId)).then((res) => {
          console.log("got codeBlock", res.data);
          setCodeBlockTitle(res.data[0].title);
          setCodeBlockCode(res.data[0].code);
          console.log(codeBlockTitle);
          console.log(codeBlockCode);
        });
      })
      .catch((err) => console.log(err));
  });

  return (
    <div className="code_block">
      <div className="code_clock_container">
        <h1>{codeBlockTitle}</h1>

        <textarea
          id="editing"
          value={textBox}
          className="text_area"
          onChange={(ev) =>
            isStudent === "true" &&
            setTextBox(ev.target.value) & sendCodeToMentor(ev.target.value)
          }
        ></textarea>

        <Highlight className="highlighed_text">{textBox}</Highlight>
      </div>
    </div>
  );
};

export default CodeBlockPage;
