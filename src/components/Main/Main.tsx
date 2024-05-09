import { DispatchContext, StateContext } from '../../store/store';

import cn from 'classnames';
import { useContext } from 'react';
import { filteredTodos } from '../../utils/getFilteredTodos';

const Main = () => {
  const { todos, status } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleToggleComplete = (id: number) => {
    dispatch({ type: 'toggle-completed', payload: id });
    // console.log('handleToggleComplete');
  };

  const visibleTodos = filteredTodos(todos, status);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={cn('todo', {
            completed: todo.completed === true,
          })}
        >
          <label
            className="todo__status-label"
            onClick={() => handleToggleComplete(todo.id)}
          >
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => dispatch({ type: 'delete', payload: todo.id })}
          >
            ×
          </button>
        </div>
      ))}
    </section>
  );
};

export default Main;
