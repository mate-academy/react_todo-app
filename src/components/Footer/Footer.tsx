import classNames from 'classnames';
import { useContext } from 'react';
import { deleteTodo } from '../../api/todos';
import { Error } from '../../types/Error';
import { AppContext } from '../AppContext/AppContext';
import { Filters } from '../Filters';

export const Footer = () => {
  const todoData = useContext(AppContext);

  const checkCompletedTodos = () => {
    if (todoData?.todos) {
      const { todos } = todoData;

      for (let i = 0; i < todos.length; i += 1) {
        if (todos[i].completed) {
          return true;
        }
      }
    }

    return false;
  };

  const removeAllCompletedTodos = () => {
    if (todoData?.todos) {
      const { todos, setIsError, setTodos } = todoData;

      for (let i = 0; i < todos.length; i += 1) {
        if (todos[i].completed) {
          deleteTodo(todos[i].id)
            .then(() => setTodos(todos.filter(item => !item.completed)))
            .catch(() => setIsError(Error.Delete));
        }
      }
    }
  };

  const getNumberOfLeftItems = () => {
    let number = 0;

    todoData?.todos.forEach((todo) => {
      if (!todo.completed) {
        number += 1;
      }
    });

    return number;
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${getNumberOfLeftItems()} items left`}
      </span>
      <Filters />
      <button
        type="button"
        className={classNames('clear-completed',
          { 'clear-completed-hidden': !checkCompletedTodos() })}
        onClick={removeAllCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
