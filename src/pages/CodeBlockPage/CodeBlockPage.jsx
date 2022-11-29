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
  const [codeBlockId, setCodeBlockId] = useState("");
  const [first, setFirst] = useState("");

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

  const setParams = () => {
    setSessionUuid(searchParams.get("uuid"));
    setStudent_login(searchParams.get("student_login"));
    setIsStudent(searchParams.get("isStudent"));
  };

  // useEffect(() => {
  //   setParams();
  //   if (student_login === "true") {
  //     navigate("/login?uuid=".concat(sessionUuid));
  //   }
  //   api
  //     .get("/session/".concat(sessionUuid))
  //     .then((res) => {
  //       // console.log("got session", res.data[0]);
  //       api.get("/codeBlock/".concat(res.data[0].codeBlockId)).then((res) => {
  //         console.log("got codeBlock", res.data);
  //         setCodeBlockTitle(res.data[0].title);
  //         setCodeBlockCode(res.data[0].code);
  //         // setTextBox(res.data[0].code);
  //         console.log(codeBlockTitle);
  //         console.log(codeBlockCode);
  //       });
  //     })
  //     .catch((err) => console.log(err));
  // });

  useEffect(() => {
    setParams();
    if (student_login === "true") {
      navigate("/login?uuid=".concat(sessionUuid));
    }
    async function apiCall() {
      api
        .get("/session/".concat(sessionUuid))
        .then((res) => {
          console.log("got session", res.data);
          setCodeBlockId(res.data[0].codeBlockId);
          // console.log("code block id", codeBlockId);
          return res.data[0].codeBlockId;
        })
        .then((codeBlockId) => {
          console.log(codeBlockId);
          api.get("/codeBlock/".concat(codeBlockId)).then((response) => {
            setCodeBlockTitle(response.data[0].title);
            setCodeBlockCode(response.data[0].code);
            if (first === "") {
              setTextBox(response.data[0].code);
              console.log(textBox);
              setFirst("not first time here");
            }
            console.log(textBox);
            console.log(isStudent);
          });
        });
    }
    apiCall();
  });

  const handleChange = (text) => {
    setTextBox(text);
    sendCodeToMentor(text);
    if (text[text.length - 1] === "\n") {
      // If the last character is a newline character
      text += " "; // Add a placeholder space character to the final line
    }
  };

  return (
    <div className="code_block_page">
      <div className="code_clock_container">
        <h1>{codeBlockTitle}</h1>

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

        <Highlight id="highlighed_text" className="highlighed_text">
          {textBox}
        </Highlight>
      </div>
    </div>
  );
};

export default CodeBlockPage;
