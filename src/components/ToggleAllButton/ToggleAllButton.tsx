/* eslint no-param-reassign: ["error", { "props": false }] */
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  items: Todo[],
  setItems: React.Dispatch<React.SetStateAction<Todo[]>>
};

export const ToggleAllButton: React.FC<Props> = ({ setItems, items }) => {
  const isChecked = !items.find(todo => todo.completed === false);

  const setStatus = (status: boolean) => setItems((currentItems => currentItems
    .map(itemTodo => {
      if (itemTodo.completed !== status) {
        itemTodo.completed = status;
      }

      return itemTodo;
    })));

  const handleClickToggleAllButton = () => {
    setStatus(!isChecked);
  };

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={handleClickToggleAllButton}
        checked={isChecked}
      />
      <label htmlFor="toggle-all">
        Mark all as complete
      </label>
    </>
  );
};
