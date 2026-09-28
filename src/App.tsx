/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useMemo, useState } from 'react';
import { NewTodo } from './Components/NewTodo';
import { TodoList } from './Components/TodoList';
import { Todo } from './types/Todo';
import { Footer } from './Components/Footer/Footer';
import { FILTERS } from './types/Filters';
import { useTodos } from './context/TodoContext';

function getFilteredTodos(todos: Todo[], selectedStatus: FILTERS) {
  return todos.filter(todo => {
    switch (selectedStatus) {
      case FILTERS.active:
        return !todo.completed;

      case FILTERS.completed:
        return todo.completed;

      case FILTERS.all:
      default:
        return true;
    }
  });
}

export const App: React.FC = () => {
  const { todos } = useTodos();
  const [selectedStatus, setSelectedStatus] = useState(FILTERS.all);

  const visibleTodos = useMemo(() => {
    return getFilteredTodos(todos, selectedStatus);
  }, [todos, selectedStatus]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodo />

        {todos.length > 0 && <TodoList todos={visibleTodos} />}

        {todos.length > 0 && (
          <Footer
            todos={todos}
            selectedStatus={selectedStatus}
            onSelectedStatus={setSelectedStatus}
          />
        )}
      </div>
    </div>
  );
};
