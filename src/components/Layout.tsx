import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { TodoForm } from '../Pages/TodoForm';
import { TodoFooter } from '../Pages/TodoFooter';
import { TodoContext } from '../hoc/TodoProvider';
import './Layout.scss';

export const Layout: React.FC = () => {
  const { user } = useContext(TodoContext);

  return (
    <>
      <div className="conteiner is-max-widescreen px-6">
        <div
          className="box m-auto app"
        >
          <div className="panel is-primary">
            <h1 className="panel-heading has-text-centered is-size-1">
              {user?.name.toUpperCase()}
              <br />
              TODOS
            </h1>

            <div className="panel-block">
              <TodoForm />
            </div>

            <Outlet />

            <TodoFooter />
          </div>
        </div>
      </div>
    </>
  );
};
