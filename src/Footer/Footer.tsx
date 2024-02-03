import React from 'react';
import { Status } from '../Types/Status';
import { Todo } from '../Types/Todo';
import { TodosFilter } from '../TodosFilter/TodosFilter';

type Props = {
  todos: Todo[],
  handleFilterTodos: (newFilter: Status) => void;
  clearCompleted: () => void;
};

const Footer: React.FC<Props> = ({
  todos,
  handleFilterTodos,
  clearCompleted,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      <TodosFilter handleFilterTodos={handleFilterTodos} />

      {todos.some(todo => todo.completed) && (
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
