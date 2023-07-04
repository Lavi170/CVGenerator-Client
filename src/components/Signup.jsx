import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./userpage.css";
const SignUp = () => {
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  }, []);

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    try {
      const newUser = await axios.post(
        "https://cvgeneratorapinew.onrender.com/user/register",
        {
          email: email,
          password: password,
        }
      );
      console.log(newUser.data);
      navigate("/");
    } catch (err) {
      if (err.response && err.response.status === 500) {
        alert("Something went wrong :( maybe try a different email?");
      } else {
        console.log(err);
      }
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <div className="signup-block">
        {refresh ? (
          <div className="banter-loader">
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
          </div>
        ) : (
          <form className="signup-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                required={true}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <br />
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                value={password}
                required={true}
                minLength={5}
                maxLength={20}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="btn1" type="submit">
              signup{" "}
            </button>
            <br />
            <h5>
              Already Have An Account? <a href="/">Login</a>
            </h5>
            <br />
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
