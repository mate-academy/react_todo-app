import { useContext } from 'react';
import { TodosContext } from '../../context/TodosContext';
import { TodosFilter } from '../TodosFilter';

type Props = {

};

export const Footer: React.FC<Props> = () => {
  const {
    todos,
    setTodos,
    status,
  } = useContext(TodosContext);

  const clearDoneTodos = () => {
    setTodos(todos.filter(todo => todo.completed === false));
  };

  return (
    todos.length ? (
      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {`${todos.filter(todo => !todo.completed).length} items left`}
        </span>

        <TodosFilter status={status} />

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
