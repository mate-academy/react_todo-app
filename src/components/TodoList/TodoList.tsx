import React, { Fragment, useContext, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from './TodoItem/TodoItem';
import { TodosContext } from '../TodosContext';

type Props = {
  items: Todo[];
};

export const TodoList: React.FC<Props> = ({ items }) => {
  const { todos, filterList } = useContext(TodosContext);
  const [toggleAll, setToggle] = useState(false);

  const handleToggleClick = () => {
    if (!toggleAll) {
      filterList('completed');
    } else {
      filterList('not completed');
    }

    setToggle(!toggleAll);
  };

  return (
    <Fragment>
      {todos.length !== 0 && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onClick={handleToggleClick}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list" data-cy="todosList">
            {items.map(todo => (
              <TodoItem key={todo.id} todo={todo} toggleAll={toggleAll} />
            ))}
          </ul>
        </>
      )}
    </Fragment>
  );
};
