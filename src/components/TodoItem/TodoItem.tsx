/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../TodosContext/TodosContext';

type Props = {
  todo: Todo,
  id: string,
};

export const TodoItem: React.FC<Props> = ({ todo, id }) => {
  // const { todos, setTodos, setFilteredTodos } = useContext(TodosContext);
  const { todos, setTodos } = useContext(TodosContext);

  const handleCheckboxChange = () => {
    const updatedTodos = todos.map((item) => {
      if (item.id === todo.id) {
        return { ...item, completed: !item.completed };
      }

      return item;
    });

    setTodos(updatedTodos);
    // setFilteredTodos(updatedTodos);
  };

  const handleClick = () => {
    const todosAfterRemoving = todos.filter(item => item.id !== +id);

    setTodos(todosAfterRemoving);
    // setFilteredTodos(todosAfterRemoving);
  };

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: todo.isEditing,
      })}
    >
      <div className="view">
        <input
          checked={todo.completed}
          type="checkbox"
          className="toggle"
          id={todo.id.toString()}
          onChange={handleCheckboxChange}
        />
        <label htmlFor={id}>{todo.title}</label>
        <button
          onClick={handleClick}
          type="button"
          className="destroy"
          data-cy="deleteTodo"
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
