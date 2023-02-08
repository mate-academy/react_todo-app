import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export const Logout: FC = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <div className="todoapp__logout box">
      <p>
        {`Hi, ${user?.name}!`}
      </p>

      <Link
        to="/login"
        className="button is-primary"
        onClick={handleLogout}
      >
        Logout
      </Link>
    </div>
  );
};
