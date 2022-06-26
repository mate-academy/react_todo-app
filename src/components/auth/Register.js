import React, { useState, useEffect, useCallback } from 'react';
import { registration } from "../../api/api";

export const Register = ({ setAuthToken, setAlert }) => {
  // const [name, setName] = useState('');
  // const [password, setPassword] = useState('');
  // const [email, setEmail] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const valid = useCallback(() => {
    const { name, password, email } = formData;
    let error = false;

    const checkedIsEmpty = (value, type) => {
      if (value && value.trim()) {
        return true;
      }

      setFormData(prevFormData => ({ ...prevFormData, [`${type}Err`]: true }));
      error = true;

      return false;
    };

    checkedIsEmpty(name, 'name');
    checkedIsEmpty(password, 'password');
    checkedIsEmpty(email, 'email');

    // if (password.length > 5 && password.length < 30) {
    //   error = true
    //   setFormData(prevFormData => ({ ...prevFormData, [`passwordErr`]: true }));
    // }
    //
    // // if (type === 'password') {
    // //   return value.length > 5 && value.length < 30;
    // // }
    // //
    // if (/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(value)) {
    //   error = true;
    //   setFormData(prevFormData => ({ ...prevFormData, [`emailErr`]: true }));
    // }

    if (error) {
      return false;
    }

    return true;
  }, [formData]);

  const registerFunc = useCallback(() => {
    if (!(valid())) {
      return setAlert({
        title: 'Помилка',
        message: 'Заповніть всі поля та перевірте коректність данних',
        type: 'error',
      });
    }

    return registration(formData)
      .then(res => setAuthToken(res.data));
  },
  [formData]);

  const changeFormField = (e) => {
    const value = e?.target?.value;
    const typeInut = e?.target?.dataset.type;

    setFormData(prevData => ({
      ...prevData,
      [typeInut]: value,
      [`${typeInut}Err`]: false,
    }));
    // setName(e?.target?.value);
  };

  return (
    <div className="form-block form-block-login">
      <div className="form-block form-block-register">
        <label>
          <p>Email</p>
          <input
            placeholder="Email"
            type="email"
            id="Email-register"
            data-type="email"
            value={formData.email}
            // required
            onChange={changeFormField}
            className={`input-form ${formData.emailErr ? 'input-form-error' : ''}`}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            placeholder="password"
            type="text"
            id="password-register"
            data-type="password"
            value={formData.password}
            onChange={changeFormField}
            className={`input-form ${formData.passwordErr ? 'input-form-error' : ''}`}
          />
        </label>
        <label>
          <p>Name</p>
          <input
            placeholder="your name"
            type="text"
            id="name-register"
            value={formData.name}
            data-type="name"
            onChange={changeFormField}
            className={`input-form ${formData.nameErr ? 'input-form-error' : ''}`}
          />
        </label>
      </div>

      <button onClick={registerFunc} className="form-btn">
        Register
      </button>
    </div>
  );
};
