import React from 'react';

export const UserWarning: React.FC = () => (
  <section className="section">
    <p className="box is-size-3">Please get your</p>
    <b> userId </b>
    <a href="https://mate-academy.github.io/react_student-registration">
      here
    </a>
    <p> and save it in the app </p>
    <pre>const USER_ID = ...</pre>
    <p>All requests to the API must be sent with this</p>
    <b> userId.</b>
  </section>
);
