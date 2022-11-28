import React, { Component, useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import Axios from "axios";

const CodeBlockPage = () => {
  const [textBox, setTextBox] = useState("hi");
  const [searchParams, setSearchParams] = useSearchParams();
  const [sessionUuid, setSessionUuid] = useState();
  const [student_login, setStudent_login] = useState();
  const [codeBlock, setCodeBlock] = useState();
  const api = Axios.create({
    baseURL: "http://localhost:5000",
  });
  const navigate = useNavigate();

  useEffect(() => {
    setSessionUuid(searchParams.get("uuid"));
    setStudent_login(searchParams.get("student_login"));
    if (student_login === "true") {
      console.log("student login true");
      navigate("/login?uuid=".concat(sessionUuid));
    }
  });

  const loadSession = () => {
    setSessionUuid(searchParams.get("uuid"));
    setStudent_login(searchParams.get("student_login"));
    if (student_login === "true") {
      console.log("student login true");
      navigate("/login", { uuid: sessionUuid });
    }
    // api
    //   .get("/session/".concat(sessionUuid))
    //   .then((res) => {
    //     console.log("first data", res.data);
    //     api.get("/codeBlock/".concat(res.data._id)).then((res) => {
    //       console.log("codeblock", res.data);
    //       setCodeBlock(res.data);
    //       setTextBox(codeBlock.code);
    //     });
    //   })
    //   .catch((err) => {});

    // api.get("/session/1").then((res) => {
    //   console.log(res.data[0]);
    // });
  };

  return (
    <div>
      {/* {loadSession()} */}
      {/* {console.log(searchParams.get("uuid"))}
      {console.log(searchParams.get("student_login"))} */}
      {console.log("student login", student_login)}
      {console.log("uuid", sessionUuid)}
      <div>code block</div>

      <input
        type="input"
        value={textBox}
        onChange={(ev) => setTextBox(ev.target.value)}
      />
    </div>
  );
};

// onChange={(ev) => this.setState({ textBox: ev.target.value })}

export default CodeBlockPage;
