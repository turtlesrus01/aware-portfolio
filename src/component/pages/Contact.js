import React, { useState } from "react";
import { validateEmail } from "../utils/helpers";

export default function Contact() {
  //state variable setup
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState("Submit");

  //handInputChange event arrow function
  const handleInputChange = (e) => {
    //value variables
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    //state setter if statement
    if (inputType === "name") {
      setName(inputValue);
    } else if (inputType === "email") {
      setEmail(inputValue);
    } else {
      setMessage(inputValue);
    }
  };

  //handleFormSubmit async arrow function
  const handleFormSubmit = async (e) => {
    //preventing page refresh
    e.preventDefault();
    //validate email if statement incase an invalid email is entered
    if (!validateEmail(email)) {
      //Error message for invalid input
      return setErrorMessage("Email or name is invalid");
    }

    //Arrange input data into JSON format
    const { name, email, message } = e.target.elements;
    const data = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    console.log(data);

    //fetch POST to localhost (email send)
    let response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });
    setStatus("Submit");
    //results
    const result = await response.json();
    console.log(result);

    //Clear fields after post
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div>
      <h1>Contact Me</h1>
      <div className="container">
        <div className="row">
          <div className="col-lg m-5"></div>
          <div className="col-lg-8 mt-5 mt-lg-0">
            {/* form */}
            <form className="form" onSubmit={handleFormSubmit}>
              <div className="col-md-6 form-group">
                <label htmlFor="name">Name: </label>
                <input
                  value={name}
                  type="text"
                  id="name"
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                  className="form-control"
                />
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="email">Email: </label>
                <input
                  value={email}
                  type="email"
                  id="email"
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="message">Message: </label>
                <input
                  value={message}
                  type="text"
                  id="message"
                  onChange={handleInputChange}
                  placeholder="Message"
                  className="form-control"
                  required
                />
              </div>
              <div className="text-center">
                <button type="submit" onClick={handleFormSubmit}>
                  {status}
                </button>
              </div>
            </form>
            {errorMessage && (
              <div>
                <p className="error-text">{errorMessage}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
