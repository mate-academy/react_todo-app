/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';

import { Todo } from './types/Todo';
import { FilterBy } from './types/FilterBy';
import { StateContext } from './states/TodosContext';
import { TodoHeader } from './components/TodoHeader';
import { TodoFooter } from './components/TodoFooter';
import { TodoList } from './components/TodoList';

const prepareTodos = (todos: Todo[], filterBy: FilterBy): Todo[] => {
  return todos.filter((todo) => {
    switch (filterBy) {
      case FilterBy.Completed:
        return todo.completed;
      case FilterBy.Active:
        return !todo.completed;
      default:
        return true;
    }
  })
    .sort((a, b) => a.id - b.id);
};

export const App: React.FC = () => {
  const { todos } = useContext(StateContext);
  const [filterBy, setFilterBy] = useState(FilterBy.All);
  const preparedTodos = prepareTodos(todos, filterBy);

  return (
    <div className="todoapp">
      <TodoHeader />

      { todos.length !== 0 && (
        <>
          <TodoList
            todos={preparedTodos}
          />
          <TodoFooter
            selectedFilter={filterBy}
            onFilterSelected={setFilterBy}
          />
        </>
      )}
    </div>
  );
};
