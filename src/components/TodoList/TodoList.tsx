import React, { useContext, useState } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';
import { TodoContext } from '../TodoContext';

export const TodoList: React.FC = () => {
  const { state, dispatch } = useContext(TodoContext);
  const [checked, setChecked] = useState<boolean>(false);

  const markCompletedAllTodos = () => {
    dispatch({ type: 'mark_all_completed', payload: checked });

    setChecked(!checked);
  };

  return (
    <>
      <input
        onChange={markCompletedAllTodos}
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={checked}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list" data-cy="todoList">
        {state.filteredTodos.map((todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </>
  );
};
