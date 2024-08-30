/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC } from 'react';
import { TodoFilter } from './components/todoFilter/TodoFilter';
import { TodoForm } from './components/todoForm/TodoForm';
import { useTodosContext } from './context/TodosContext';
import { TodoList } from './components/todoList/TodoList';

export const App: FC = () => {
  const { todos } = useTodosContext();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoForm />

        {!!todos.length && <TodoList />}

        {!!todos.length && <TodoFilter />}
      </div>
    </div>
  );
};
