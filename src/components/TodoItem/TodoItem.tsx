/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../TodosContext/TodosContext';

type Props = {
  todo: Todo,
  id: string,
};

export const TodoItem: React.FC<Props> = ({ todo, id }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [newTitle, setNewTitle] = useState(todo.title); // eslint-disable-line

  const handleCheckboxChange = () => {
    const updatedTodos = todos.map((item) => {
      if (item.id === todo.id) {
        return { ...item, completed: !item.completed };
      }

      return item;
    });

    setTodos(updatedTodos);
  };

  const handleClick = () => {
    const todosAfterRemoving = todos.filter(item => item.id !== +id);

    setTodos(todosAfterRemoving);
  };

  const handleDoubleClick = (event: React.MouseEvent<HTMLLIElement>) => {
  // const handleDoubleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.textContent); // eslint-disable-line
    const updatedTodos = todos.map((item) => {
      if (item.id === todo.id) {
        return { ...item, isEditing: true };
      }

      return item;
    });

    setTodos(updatedTodos);
  };

  // const handleInputChange = (event: React.MouseEvent<HTMLInputElement>) => {
  //   console.log(event.currentTarget.textContent);
  //   const newText = event.currentTarget.textContent || '';

  //   setNewTitle(newText);
  // };

  return (
    <li
      onDoubleClick={handleDoubleClick}
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
        <label>{todo.title}</label>
        <button
          onClick={handleClick}
          type="button"
          className="destroy"
          data-cy="deleteTodo"
        />
      </div>
      <input
        type="text"
        className="edit"
        // onChange={handleInputChange}
      />
    </li>
  );
};
