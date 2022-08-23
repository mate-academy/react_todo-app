import React, { useCallback, useState } from 'react';
import classNames from 'classnames';

import './styles/ThemeChanger.scss';

if (!localStorage.getItem('theme')) {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  }
} else if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-theme');
}

export const ThemeChanger = React.memo(() => {
  const [theme, setTheme] = useState(localStorage.getItem('theme')
    || 'dark');

  const handlerChangeTheme = useCallback(
    () => {
      setTheme(() => {
        const prevTheme = localStorage.getItem('theme');

        document.body.classList.toggle('dark-theme');

        if (prevTheme === 'dark') {
          localStorage.setItem('theme', 'light');

          return 'light';
        }

        localStorage.setItem('theme', 'dark');

        return 'dark';
      });
    },
    [],
  );

  return (
    <div className="container">
      <input
        checked={theme === 'light'}
        className="input"
        onChange={handlerChangeTheme}
        type="checkbox"
        id="toggle"
      />
      <label className={'toggle '.concat(theme)} htmlFor="toggle">
        <i className={classNames(
          'bx',
          { 'bxs-sun': theme === 'light', 'bx-sun': theme === 'dark' },
        )}
        />
        <i className={classNames(
          'bx',
          { 'bxs-moon': theme === 'dark', 'bx-moon': theme === 'light' },
        )}
        />
        <span className="ball" />
      </label>
    </div>
  );
});
