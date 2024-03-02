import React, { useContext } from 'react';
import { Header } from '../header/Header';
import { Main } from '../Main/Main';
import { TodoFilter } from '../TodoFilter/TodoFilter';
import { StateContext } from '../../Store';

export const TodoApp: React.FC = () => {
  const { todos } = useContext(StateContext);

  return (
    <div className="todoapp">
      <Header />
      {!!todos.length && (
        <>
          <Main />
          <TodoFilter />
        </>
      )}
    </div>
  );
};
