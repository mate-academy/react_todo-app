import React, { useContext } from 'react';
import { FilteredTodos } from '../FilteredTodos/FilteredTodos';
import { TodosContext } from '../TodosContext';

export const Footer:React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const filteredTodos = todos.filter(todo => !todo.completed).length;
  const filtToComplete = todos.filter(todo => todo.completed).length;

  const handleClear = () => {
    const toComplete = todos.filter(todo => !todo.completed);

    setTodos(toComplete);
  };

  return (
    <>
      <span className="todo-count" data-cy="todosCounter">
        {`${filteredTodos} items left`}
      </span>

      {todos.length > 0
        && (
          <FilteredTodos />
        ) }

      {filtToComplete > 0
      && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClear}
        >
          Clear completed
        </button>
      )}
    </>
  );
};
