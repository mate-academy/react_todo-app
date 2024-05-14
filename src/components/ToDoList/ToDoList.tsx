import React, { useContext } from 'react';
import { ToDo } from '../../types/ToDo';
import { ToDoItem } from '../ToDoItem/ToDoItem';
import { ToDoContext } from '../../context/ToDoProvider';

type Props = {
  todos: ToDo[];
};

export const ToDoList: React.FC<Props> = ({ todos }) => {
  const { dispatch } = useContext(ToDoContext);

  const toggleAll = todos.every(todo => todo.completed);

  const handleToggleAll = () => {
    dispatch({ type: 'TOGGLE_ALL', payload: !toggleAll });
  };

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={toggleAll}
        onChange={handleToggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todosList">
        {todos.map(item => (
          <ToDoItem key={item.id} item={item} />
        ))}
      </ul>
    </>
  );
};

export default ToDoList;
