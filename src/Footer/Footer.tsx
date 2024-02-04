import React from 'react';
import { Status } from '../Types/Status';
import { Todo } from '../Types/Todo';
import { TodosFilter } from '../TodosFilter/TodosFilter';

type Props = {
  todos: Todo[],
  handleFilterTodos: (newFilter: Status) => void;
  clearCompleted: () => void;
  filterBy: Status,
  setFilterBy: (filter: Status) => void;
};

const Footer: React.FC<Props> = ({
  todos,
  handleFilterTodos,
  clearCompleted,
  filterBy,
  setFilterBy,
}) => {
  const activeTodosLength = todos.filter(todo => !todo.completed).length;
  const completedTodos = todos.some(todo => todo.completed);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodosLength} items left`}
      </span>

      <TodosFilter
        handleFilterTodos={handleFilterTodos}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
      />

      {completedTodos && (
        <button
          type="button"
          className="clear-completed"
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default Footer;
