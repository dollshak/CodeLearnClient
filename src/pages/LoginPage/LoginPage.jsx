import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Axios from "axios";

const api = Axios.create({
  baseURL: "http://localhost:5000",
});

const LoginPage = ({}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [uuid, setUuid] = useState();
  const [userDetails, setUserDetails] = React.useState({
    username: "",
    password: "",
  });
  const [users, setUsers] = useState([]);

  const user = { username: "gal", password: "123" };

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

  const validateMentorLogIn = () => {
    api.get("/users/mentor/");
  };

  async function OnSubmitMentor() {
    console.log("on submit mentor");
    api
      .get("/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    if (userDetails.password === user.password) {
      localStorage.setItem(userDetails.name, "token");
      navigate("/lobby");
    } else {
      alert("login is field, plese try again");
    }
  }

  const onSubminStudent = () => {
    console.log("on submit student");
    // validateLogIn();
    navigate(
      "/codeBlock?uuid="
        .concat(uuid)
        .concat("&student_login=false&isStudent=true")
    );
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
      </div>
    </div>
  );
};

export default LoginPage;
