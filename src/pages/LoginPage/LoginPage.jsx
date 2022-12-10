import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Axios from "axios";
import configData from "../../config.json";

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const [uuid, setUuid] = useState();
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const url = configData.production
    ? configData.server_url_prod
    : configData.local_server_url;
  const api = Axios.create({
    baseURL: url,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const value = event.target.value;
    setUserDetails({
      ...userDetails,
      [event.target.name]: value,
    });
  };

  // React.useEffect(() => {}, [userDetails.username]);

  useEffect(() => setUuid(searchParams.get("uuid")), [searchParams]);

  //validate mentor details and continue to lobby page if valid
  async function OnSubmitMentor() {
    api
      .post("/users/login", {
        data: {
          username: userDetails.username,
          password: userDetails.password,
        },
      })
      .then((res) => {
        if (!res?.data?.length) {
          setMessage("no such user");
        } else if (res.data[0]?.role !== "mentor") {
          setMessage("you have to be a mentor to log into lobby");
        } else {
          navigate("/lobby");
        }
      })
      .catch((res) => {
        console.log(
          "could not get user from server while trying to log in",
          res
        );
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
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  return (
    <div className="login">
      <div className="login_contianer">
        <h1 className="login_page_title">Login:</h1>
        <div className="inputs_container">
          <label className="username_label"> username</label>
          <input
            value={userDetails.username}
            name="username"
            type="text"
            onChange={handleChange}
          />
          <label className="password_label"> password</label>
          <input
            value={userDetails.password}
            name="password"
            type="text"
            onChange={handleChange}
          />
        </div>

        <button
          className="login_button"
          type="submit"
          onClick={uuid ? onSubminStudent : OnSubmitMentor}
        >
          login
        </button>

        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default LoginPage;
