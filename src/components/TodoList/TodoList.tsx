import React, { useContext } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';
import { TodosContext } from '../TodosContext';
import { ActionType } from '../../types/Action';

type Props = {
  items: Todo[]
};

export const TodoList: React.FC<Props> = ({ items }) => {
  const { dispatch } = useContext(TodosContext);

  const allItemsCopmleted = items.every(({ completed }) => completed);

  const handleToggleAll = () => {
    dispatch({ type: ActionType.ChangeAllCompleted });
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={allItemsCopmleted}
        onChange={handleToggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">

        {items.map(item => (
          <TodoItem
            item={item}
            key={item.id}
          />
        ))}
      </ul>
    </section>
  );
};

/* <li className="completed">
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-completed" />
          <label htmlFor="toggle-completed">qwertyuio</label>
          <button
            aria-label="deleteTodo"
            type="button"
            className="destroy"
            data-cy="deleteTodo"
          />
        </div>
        <input type="text" className="edit" />
      </li>

      <li className="editing">
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-editing" />
          <label htmlFor="toggle-editing">zxcvbnm</label>
          <button
            aria-label="deleteTodo"
            type="button"
            className="destroy"
            data-cy="deleteTodo"
          />
        </div>
        <input type="text" className="edit" />
      </li>

      <li>
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-view2" />
          <label htmlFor="toggle-view2">1234567890</label>
          <button
            aria-label="deleteTodo"
            type="button"
            className="destroy"
            data-cy="deleteTodo"
          />
        </div>
        <input type="text" className="edit" />
      </li> */
