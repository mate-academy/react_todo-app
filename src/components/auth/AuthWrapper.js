import React, { useState, useEffect, useCallback } from 'react';
import {Route, Switch, Link, NavLink} from "react-router-dom";
import {TodoList} from "../TodoList";
import { Login } from "./Login";
import { Register } from "./Register";

export const AuthWrapper = ({ setAuthToken, setAlert }) => {

  return (
    <div className="auth-wrapper todoapp">
      <div className="auth-nav-wrapper">
        <NavLink
          to="/login"
          className={isActive => `auth-header-link ${isActive ? 'auth-header-link_active' : ''}`}
        >
          Login
        </NavLink>
        <NavLink
          to="/registration"
          className={isActive => `auth-header-link ${isActive ? 'auth-header-link_active' : ''}`}
        >
          Register
        </NavLink>
      </div>


      <div className="auth-form-wrapper">
        <Route path="/registration" exact>
          <Register setAuthToken={setAuthToken} setAlert={setAlert} />
        </Route>
        <Route path="/login" exact>
          <Login setAuthToken={setAuthToken} setAlert={setAlert} />
        </Route>
      </div>
    </div>
  );
};
