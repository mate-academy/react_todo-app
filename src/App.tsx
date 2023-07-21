import React, { useContext, useState } from 'react';
import { TodoForm } from './components/TodoForm';
import { StateContext } from './components/Store';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { ITodo, StatusType } from './types';

const getVisibleTodos = (todos: ITodo[], filter: StatusType) => {
  switch (filter) {
    case StatusType.Active:
      return todos.filter((todo) => !todo.completed);
    case StatusType.Completed:
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
};

export const App: React.FC = () => {
  const { todos } = useContext(StateContext);
  const [filter, setFilter] = useState<StatusType>(StatusType.All);

  const hasTodos = todos.length > 0;
  const visibleTodos = getVisibleTodos(todos, filter);

  return (
    <div className="todoapp">

      <TodoForm />

      {hasTodos && (
        <TodoList todos={visibleTodos} />
      )}

      { hasTodos && (
        <TodoFilter
          setFilter={setFilter}
        />
      )}

    </div>
  );
};
