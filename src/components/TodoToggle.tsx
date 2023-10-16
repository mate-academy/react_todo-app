import { useContext } from 'react';
import cn from 'classnames';
import { DispatchTodo, StateTodo } from '../context';
import { ActionTypes } from '../types';

export const TodoToggle = () => {
  const dispatch = useContext(DispatchTodo);
  const { todos } = useContext(StateTodo);

  const isAllCompleted = todos.every((todo) => todo.completed);

  const allTodosCompleted = () => {
    dispatch({
      type: ActionTypes.CHANGE_ALL_TODO_STATUS,
      payload: isAllCompleted,
    });
  };

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className={cn(
          'toggle-all',
          { checked: todos.length > 0 && isAllCompleted },
        )}
        data-cy="toggleAll"
        onClick={allTodosCompleted}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
};
