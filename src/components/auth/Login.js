import React, { useState, useEffect, useCallback } from 'react';
import {login} from "../../api/api";

export const Login = ({ setAuthToken }) => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const loginFunc = useCallback(() => {
    login({
      password, email,
    })
      .then(res => setAuthToken(res.data));
  },
  [password, email]);

  const changePassField = (e) => {
    setPassword(e?.target?.value);
  };

  const changeEmailField = (e) => {
    setEmail(e.target.value);
    // setLoginData(data => ({ ...data, login: e?.target?.value || '' }));
  };

  return (
    <div className="form-block form-block-login">
      <div className="form-block form-block-login">
        <label>
          <p>Email</p>
          <input
            placeholder="Email"
            type="text"
            id="email-login"
            value={email}
            onChange={changeEmailField}
            className="input-form"
          />
        </label>
        <label>
          <p>Password</p>
          <input
            placeholder="Password"
            type="text"
            id="password"
            value={password}
            onChange={changePassField}
            className="input-form"
          />
        </label>
      </div>

      <button onClick={loginFunc} className="form-btn">Login</button>
    </div>
  );
};
