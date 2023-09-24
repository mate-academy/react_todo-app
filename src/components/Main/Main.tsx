/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useContext } from 'react';
import { TodoList } from '../TodoList/TodoList';
import { Todo } from '../../helpers/Todo';
import { DispatchTodos } from '../TodosContext/TodosContext';

/* eslint-disable jsx-a11y/control-has-associated-label */
interface Props {
  todos: Todo[];
}

export const Main: React.FC<Props> = ({ todos }) => {
  const dispatch = useContext(DispatchTodos);

  const completedTodos = todos.filter(todo => todo.completed === true);

  const handleClickChangeState = () => {
    if (completedTodos.length !== todos.length) {
      dispatch({ type: 'selectCompletedTodos' });
    } else {
      dispatch({ type: 'selectActiveTodos' });
    }
  };

  return (
    <section className="main">
      {todos.length !== 0 && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
          />
          <label
            htmlFor="toggle-all"
            onClick={handleClickChangeState}
          >
            Mark all as complete
          </label>
        </>
      )}

      <TodoList items={todos} />
    </section>
  );
};
