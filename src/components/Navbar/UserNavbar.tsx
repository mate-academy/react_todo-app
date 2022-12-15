import React from 'react';

type Props = {
  userName: string | undefined;
  userEmail: string | undefined;
};

export const UserNavbar: React.FC<Props> = ({ userName, userEmail }) => {
  const logout = async () => {
    try {
      await localStorage.removeItem('user');
      await window.location.reload();
    } catch (error) {
      throw new Error();
    }
  };

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <p
            className="navbar-item has-text-weight-medium"
          >
            Name:&nbsp;
            <span className="has-text-weight-normal">{userName}</span>
          </p>

          <p
            className="navbar-item has-text-weight-medium"
          >
            Email:&nbsp;
            <span className="has-text-weight-normal">{userEmail}</span>
          </p>

          <button
            type="button"
            className="navbar-item button is-success mt-1"
            onClick={logout}
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
};
