import { useContext } from 'react';
import { TodosContext } from '../../contextes/TodosContext';
import { Todo } from '../../types/Todo';
import { TodoFilter } from '../TodoFilter/TodoFilter';

export const Footer = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const revomeCompletedTodos = () => setTodos(todos
    .filter(todo => !todo.completed));

  const counterOfNonCompletedTodos = (todosList: Todo[]) => {
    return todosList.filter(todo => !todo.completed).length;
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${counterOfNonCompletedTodos(todos)} items left`}
      </span>

      <TodoFilter />

      {counterOfNonCompletedTodos(todos) !== todos.length && (
        <button
          onClick={revomeCompletedTodos}
          type="button"
          className="clear-completed"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
