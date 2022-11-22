/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useContext, useCallback } from 'react';
import { Outlet, Link } from 'react-router-dom';
import classNames from 'classnames';
import { Context } from './components/context';

import { useTheme } from './hooks/use-theme';

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

  const changeTheme = useCallback(
    () => {
      if (theme === 'ligth') {
        setTheme('nigth');
      } else {
        setTheme('ligth');
      }
    },
    [theme],
  );

  return (
    <>
      <Outlet />

      <button
        type="button"
        className={classNames(
          'theme-switcher',
          {
            'theme-switcher--ligth': theme === 'ligth',
            'theme-switcher--nigth': theme === 'nigth',
          },
        )}
        onClick={changeTheme}
      >
        <div
          className={classNames(
            'theme-switcher__item',
            {
              'theme-switcher__item--ligth': theme === 'ligth',
              'theme-switcher__item--nigth': theme === 'nigth',
            },
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
