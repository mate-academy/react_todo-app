import React, { useContext, useState } from 'react';
import { Todo } from './type/Todo';
import { TodoItem } from './TodoItem';
import { TodoContext } from './TodoProvider';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const { dispatch } = useContext(TodoContext);
  const [toggleAll, setToggleAll] = useState(false);

  const handleToggleAll = () => {
    setToggleAll(!toggleAll);
    dispatch({ type: 'TOGGLE_ALL', payload: !toggleAll });
  };

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={handleToggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todosList">
        {todos.map(item => (
          <TodoItem key={item.id} item={item} />
        ))}
      </ul>
    </>
  );
};

export default TodoList;
