import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, register } from "../services/user";

function RegisterUser() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function onRegister() {
    if (firstName.length === 0) toast.warning("enter first name");
    else if (lastName.length === 0) toast.warning("enter last name");
    else if (email.length === 0) toast.warning("enter email");
    else if (phoneNumber.length === 0) toast.warning("enter phone number");
    else if (password.length === 0) toast.warning("enter password");
    else if (confirmPassword.length === 0)
      toast.warning("retype your password");
    else {
      if (password === confirmPassword) {
        const result = await register(
          firstName,
          lastName,
          email,
          phoneNumber,
          password
        );
        if (result.status === "success") {
          toast.success("welcome");
          navigate("/login");
        } else {
          toast.error("Unable to register you pls try again");
        }
      } else toast.warning("passwords not matching");
    }
  }

  return (
    <div style={{ marginTop: "125px" }}>
      <div className="signup">
        <div className="container">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              <div className="register-form" id="register-form">
                <div className="form-group">
                  <label htmlFor="First name">
                    <i className="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="First name"
                    id="fname"
                    placeholder="first Name"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Last name">
                    <i className="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="Last name"
                    id="lname"
                    placeholder="Last Name"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="zmdi zmdi-email"></i>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">
                    <i className="zmdi zmdi-phone"></i>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="Phone Number"
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pass">
                    {/* <i className="zmdi zmdi-lock"></i> */}
                  </label>
                  <input
                    type="password"
                    name="pass"
                    id="pass"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="re-pass">
                    {/* <i className="zmdi zmdi-lock-outline"></i> */}
                  </label>
                  <input
                    type="password"
                    name="re_pass"
                    id="re_pass"
                    placeholder="Repeat your password"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="checkbox"
                    name="agree-term"
                    id="agree-term"
                    className="agree-term"
                  />
                  <label htmlFor="agree-term" className="label-agree-term">
                    <span>
                      <span></span>
                    </span>
                    I agree all statements in
                    <a href="#" className="term-service">
                      Terms of service
                    </a>
                  </label>
                </div>
                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signup"
                    id="signup"
                    className="form-submit"
                    value="Register"
                    onClick={onRegister}
                  />
                </div>
              </div>
            </div>
            <div className="signup-image">
              <figure>
                <img src={require("../images/signup-image.jpg")} alt="" />
              </figure>
              <div>
                <Link to="/login"> I am already member</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RegisterUser;
