/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodoUpdateContext } from '../TodosProvider/TodosProvider';

interface Props {
  items: Todo[];
}

export const TodoList: React.FC<Props> = (props) => {
  const { items } = props;
  const { toogleAll } = useContext(TodoUpdateContext);
  const [toogleAllTodos, setToogleAllTodos] = useState(false);
  const handleToogleAll = () => {
    setToogleAllTodos(!toogleAllTodos);
    toogleAll(!toogleAllTodos);
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={toogleAllTodos}
        onChange={handleToogleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todosList">
        {!!items.length && items.map(
          item => <TodoItem item={item} key={item.id} />,
        )}

        {!items.length && (
          <li className="view">
            <div className="view">
              <label>This list is empty.</label>
            </div>
          </li>
        )}
      </ul>
    </section>
  );
};
