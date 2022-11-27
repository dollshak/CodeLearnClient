import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import GetAllUsers from "../../api";

const api = Axios.create({
  baseURL: "http://localhost:5000",
});

const LoginPage = () => {
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

  async function OnSubmit() {
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
  return (
    <div className="login">
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

        <button type="submit" onClick={OnSubmit}>
          login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
