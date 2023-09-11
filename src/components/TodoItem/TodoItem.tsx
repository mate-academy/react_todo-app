/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext, useRef } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/todo';
import { TodosContext } from '../../TodosContext';

type Props = {
  todo: Todo
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const index = todos.findIndex(({ id }) => id === todo.id);
  const updateTodo = (): Todo[] => {
    const todosCopy = [...todos];

    todosCopy.splice(index, 1, { ...todo, completed: !todo.completed });

    return todosCopy;
  };

  const handleCompleteTodo = () => {
    setTodos(updateTodo());
  };

  return (
    <li
      className={cn({
        completed: todo.completed,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          onChange={handleCompleteTodo}
        />
        <label htmlFor="toggle-view">{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
