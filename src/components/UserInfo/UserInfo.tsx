import React, { useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext';

export const UserInfo: React.FC = () => {
  const user = useContext(AuthContext);

  return (
    <div className="userinfo">
      {`Hello, ${user?.name}!`}
      <br />
      Let&apos;s create your own todo list!
      <br />
      Double-click to edit a todo!
    </div>
  );
};
