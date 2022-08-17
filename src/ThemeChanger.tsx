import React, { useMemo, useState } from 'react';
import classNames from 'classnames';

import './styles/ThemeChanger.scss';

export const ThemeChanger = React.memo(() => {
  const useDark = useMemo(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (isDark) {
      document.body.classList.toggle('dark-theme');
    }

    return isDark;
  }, []);

  const [theme, setTheme] = useState(useDark ? 'dark' : 'light');

  return (
    <div className="container">
      <input
        checked={theme === 'light'}
        className="input"
        onChange={() => {
          setTheme(prevTheme => {
            document.body.classList.toggle('dark-theme');

            if (prevTheme === 'dark') {
              return 'light';
            }

            return 'dark';
          });
        }}
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
