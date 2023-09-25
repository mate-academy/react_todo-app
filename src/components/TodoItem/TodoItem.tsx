/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import cn from 'classnames';
import { Todo } from '../../interfaces/Todo';
import { TodosContext } from '../../Store';

interface Props {
  item: Todo;
}

export const TodoItem: React.FC<Props> = ({ item }) => {
  const { id, title, completed } = item;
  const { setTodos } = useContext(TodosContext);

  const changeStatus = () => {
    setTodos((prevState) => {
      return prevState.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }

        return { ...todo, completed: !todo.completed };
      });
    });
  };

  return (
    <li className={cn({ completed: completed === true })}>
      {/* className="editing" */}
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={id.toString()}
          onChange={changeStatus}
        />
        <label htmlFor="toggle-view">{title}</label>
        <button type="button" className="destroy" data-cy="deleteTodo" />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
