import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Axios from "axios";

const LoginPage = ({}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [uuid, setUuid] = useState();
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const api = Axios.create({
    baseURL: "http://localhost:5000",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const value = event.target.value;
    setUserDetails({
      ...userDetails,
      [event.target.name]: value,
    });
  };

  React.useEffect(() => {}, [userDetails.username]);

  useEffect(() => setUuid(searchParams.get("uuid")));

  async function OnSubmitMentor() {
    console.log("on submit mentor");

    api
      .post("/users/login", {
        data: {
          username: userDetails.username,
          password: userDetails.password,
        },
      })
      .then((res) => {
        console.log("data back", res.data);
        if (res.data.length === 0) {
          setMessage("no such user");
        } else if (res.data[0].role !== "mentor") {
          setMessage("you have to be a mentor to log into lobby");
        } else {
          navigate("/lobby");
        }
      })
      .catch((res) => {
        console.log("error");
      });
  }

  const onSubminStudent = () => {
    api.get("./session/".concat(uuid)).then((resSession) => {
      api
        .post("./users/login", {
          data: {
            username: userDetails.username,
            password: userDetails.password,
          },
        })
        .then((resUser) => {
          if (resUser.data.length === 0) {
            setMessage("no such user");
          } else if (resUser.data[0].role !== "student") {
            setMessage("you have to be a mentor to log into lobby");
          } else if (resUser.data[0]._id !== resSession.data[0].userId) {
            setMessage("wrong user");
          } else {
            navigate(
              "/codeBlock?uuid="
                .concat(uuid)
                .concat("&student_login=false&isStudent=true")
            );
          }
        });
    });
  };
  return (
    <div className="login">
      {console.log("uuid from login", uuid)}
      <div className="login_contianer">
        <h1>Login Page</h1>
        <div className="inputs_container">
          <label> username</label>
          <input
            value={userDetails.username}
            name="username"
            type="text"
            onChange={handleChange}
          />
          <label> password</label>
          <input
            value={userDetails.password}
            name="password"
            type="text"
            onChange={handleChange}
          />
        </div>

        <button type="submit" onClick={uuid ? onSubminStudent : OnSubmitMentor}>
          login
        </button>

        <p>{message}</p>
      </div>
    </div>
  );
};

export default LoginPage;
