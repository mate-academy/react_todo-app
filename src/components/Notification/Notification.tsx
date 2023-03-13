import React from 'react';
import { Link } from 'react-router-dom';

export const Notification = React.memo(() => (
  <div className="box">
    <div className="control has-icons-right">
      <div className="field">
        <h2 className="title">
          Hello there, check it out!
        </h2>

        <span className="icon is-right">
          <i className="fa-solid fa-circle-info is-right" />
        </span>
      </div>
    </div>

    <p>
      You can also use the random ID if you don&apos;t want to register.
      This will help you check the app on a random user basis.
    </p>
    <Link to="/auth/reg">Or Sign In!</Link>
  </div>
));
