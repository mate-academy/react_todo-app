import React from 'react';
import { Outlet } from 'react-router-dom';
import { TodoForm } from '../Pages/TodoForm';
import { TodoFooter } from '../Pages/TodoFooter';

export const Layout: React.FC = () => {
  return (
    <>
      <div className="conteiner is-max-widescreen px-6">
        <div
          className="box m-auto"
          style={{
            maxWidth: '600px',
            minWidth: '400px',
          }}
        >
          <div className="panel is-primary">
            <h1 className="panel-heading has-text-centered is-size-1">
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
