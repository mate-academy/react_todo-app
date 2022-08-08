import React from 'react';
import { Todo } from '../../types/Todo';
import { TodosFilter } from '../TodosFilter';

type Props = {
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
};

export const Footer: React.FC<Props> = ({ todos, setTodos }) => {
  const filtredTodods = todos.filter(todo => !todo.completed);
  const onClearUnComplited = () => {
    const allUnCompleted = todos.filter(todo => !todo.completed);

    setTodos(allUnCompleted);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${filtredTodods.length} items left`}
      </span>

      <TodosFilter />

      <button
        type="button"
        className="clear-completed"
        onClick={onClearUnComplited}
      >
        Clear completed
      </button>
    </footer>
  );
};
