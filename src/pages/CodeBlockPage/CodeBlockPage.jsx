import React, { Component, useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import Highlight from "react-highlight";

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
          // console.log("got codeBlock", res.data);
          setCodeBlockTitle(res.data[0].title);
          setCodeBlockCode(res.data[0].code);
          console.log(codeBlockTitle);
          console.log(codeBlockCode);
        });
      })
      .catch((err) => console.log(err));
  });

  const update = () => {
    console.log("update");
    let textAreaContent = document.getElementById("editing");
    let result_element = document.getElementById("highlighting-content");
    console.log("object", textAreaContent, result_element);
    // result_element.innerText = textAreaContent;
  };

  return (
    <div className="code_block">
      <div className="code_clock_container">
        <h1>{codeBlockTitle}</h1>

        <textarea
          id="editing"
          value={textBox}
          className="text_area"
          onChange={(ev) => isStudent === "true" && setTextBox(ev.target.value)}
        ></textarea>

        <Highlight className="highlighed_text">{textBox}</Highlight>
      </div>
    </div>
  );
};

// onChange={(ev) => this.setState({ textBox: ev.target.value })}

export default CodeBlockPage;
