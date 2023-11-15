import { useContext } from 'react';
import { TodosContext } from '../../context/TodosContext';

type Props = {

};

export const Footer: React.FC<Props> = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const clearDoneTodos = () => {
    setTodos(todos.filter(todo => todo.completed === false));
  };

  return (
    todos.length ? (
      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {`${todos.filter(todo => !todo.completed).length} items left`}
        </span>

        <ul className="filters">
          <li>
            <a href="#/" className="selected">All</a>
          </li>

          <li>
            <a href="#/active">Active</a>
          </li>

          <li>
            <a href="#/completed">Completed</a>
          </li>
        </ul>

        {todos.find(todo => todo.completed) && (
          <button
            type="button"
            className="clear-completed"
            onClick={clearDoneTodos}
          >
            Clear completed
          </button>
        )}
      </footer>
    ) : <></>);
};
