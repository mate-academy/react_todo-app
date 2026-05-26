import React, { useContext, useState } from 'react';
import { TodoHeader } from './Components/TodoHeader/TodoHeader';
import { TodoList } from './Components/TodoList/TodoList';
import { TodoFooter } from './Components/TodoFooter/todoFooter';
import { TodoContext } from './TodoContext';
import { Filter } from './Components/utils/Filter';

export const App: React.FC = () => {
  const { todos } = useContext(TodoContext);

  const [filter, setFilter] = useState<Filter>(Filter.All);

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return true;
    }
  });

  const handleFilterChange = (
    event: React.MouseEvent<HTMLAnchorElement>,
    value: Filter,
  ) => {
    event.preventDefault();
    setFilter(value);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        {todos.length > 0 && <TodoList todos={filteredTodos} />}

        {todos.length > 0 && (
          <TodoFooter filter={filter} onFilterChange={handleFilterChange} />
        )}
      </div>
    </div>
  );
};
