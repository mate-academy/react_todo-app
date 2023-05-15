import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types/User';
import { addUser } from '../api/api';
import { GlobalContext } from '../helper/GlobalContext';

export const SignUpPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [signUpNotice, setSignUpNotice] = useState('');
  const { setUser, user } = useContext(GlobalContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name.trim().length < 4) {
      setSignUpNotice('name is too short');

      return;
    }

    if (name.trim().length > 20) {
      setSignUpNotice('name is too long');

      return;
    }

    const createUser: User = {
      id: 0,
      name,
      email,
    };

    try {
      const userFromServer = await addUser(createUser);

      setUser(userFromServer);
      setSignUpNotice(`Sucsses, your ID ${userFromServer.id}`);
    } catch (error) {
      setSignUpNotice('something went wrong');
    }

    setName('');
    setEmail('');
  };

  return (
    <div className="sign-up__container">
      <h1 className="sign-up__title">Sign up new user</h1>
      <Link className="sign-up__link" to="/">
        Home
      </Link>

      {user && (<h1>{`Hello ${user.name}`}</h1>)}

      <div>
        <h2 className="sign-up__sub-title">Sign Up</h2>
        <p className="sign-up__notice">{signUpNotice}</p>

        <form
          className="sign-up"
          onSubmit={handleSubmit}
        >
          <label className="sign-up__label">
            {/* name: */}
            <input
              className="sign-up__input"
              type="text"
              placeholder="Name min 4 symbols"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </label>

          <label className="sign-up__label">
            {/* email: */}
            <input
              className="sign-up__input"
              type="text"
              placeholder="Email optionally"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
          </label>

          <button type="submit" className="sign-up__button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
