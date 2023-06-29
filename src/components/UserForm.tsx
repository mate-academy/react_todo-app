/* eslint-disable react/button-has-type */
import { FC, useState } from 'react';

type Props = {
  setIsUser: (value: boolean) => void;
};

export const UserForm: FC<Props> = ({ setIsUser }) => {
  const [user, setUser] = useState('');
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUser(true);
    setUser('');
  };

  return (
    <div>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <h2 className="title">Log in to open todos</h2>
          <input
            className="input"
            type="email"
            placeholder="Please enter email"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <button className="button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
