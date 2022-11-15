/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import classNames from 'classnames';
import { Context } from './components/context';

// import { AddForm } from './components/AddForm';
// import { LoginForm } from './components/LoginForm';

import { useTheme } from './hooks/use-theme';

// import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const {
    setUser,
    userErrorHide,
    setUserErrorHide,
    userError,
    changeUserButton,
    setChangeUserButton,
  } = useContext(Context);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const userOnLocaleStorage = localStorage.getItem('user');

    if (userOnLocaleStorage) {
      setUser(JSON.parse(userOnLocaleStorage));
    }

    setTheme('nigth');
  }, []);

  return (
    <>
      <Outlet />

      <button
        type="button"
        className={classNames(
          'theme-switcher',
          theme === 'ligth' ? 'theme-switcher--ligth' : 'theme-switcher--nigth',
        )}
        onClick={(e) => {
          e.preventDefault();
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          theme === 'ligth'
            ? setTheme('nigth')
            : setTheme('ligth');
        }}
      >
        <div
          className={classNames(
            'theme-switcher__item',
            theme === 'ligth'
              ? 'theme-switcher__item--ligth'
              : 'theme-switcher__item--nigth',
          )}
        >
          <></>
        </div>
      </button>

      <div className={
        classNames(
          'error',
          { 'error--show': userErrorHide },
        )
      }
      >
        <button
          className="error__close"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setUserErrorHide(false);
          }}
        />
        <h2 className="error__text">{userError}</h2>
      </div>

      {(changeUserButton) && (
        <Link
          to="login"
          className="another-user"
          onClick={() => {
            localStorage.removeItem('user');
            setChangeUserButton(false);
          }}
        >
          Сhange user
        </Link>
      )}
    </>
  );
};
