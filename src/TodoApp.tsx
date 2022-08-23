import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { NewTodo } from './NewTodo';
import { ThemeChanger } from './ThemeChanger';

export const TodoApp: React.FC = React.memo(
  () => {
    const param = useParams();

    return (
      <div className="todoapp">
        <ThemeChanger />

        <header className="header">
          <h1>todos</h1>

          {param.username ? (<NewTodo />) : (<Outlet />)}

        </header>
        {param.username && (
          <Outlet />
        )}
      </div>
    );
  },
);
