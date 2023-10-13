import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  //added first and last name useState on RegisterForm 
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  //useState username and password. 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        firstname: firstname, //added the firstname property to get dispatched. 
        lastname: lastname, //added the lastname property to get dispatched. 
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      {/* added the inputs for first and last name  */}
      <div>
        <label htmlFor="firstname">
          First Name:
          <input
            type="text"
            name="firstname"
            value={firstname}
            required
            onChange={(event) => setFirstname(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="lastname">
          Last name:
          <input
            type="text"
            name="lastname"
            value={lastname}
            required
            onChange={(event) => setLastname(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
