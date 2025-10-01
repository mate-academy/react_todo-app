import React, { useContext, useEffect, RefObject } from 'react';
import { Context, Todo } from '../Context/Context';
import classNames from 'classnames';

type Props = {
  inputRef: RefObject<HTMLInputElement>;
};

export const TodoList: React.FC<Props> = ({ inputRef }) => {
  const { state, dispatch } = useContext(Context);

  const handleDelete = (id: number) => {
    const todos: Todo[] = JSON.parse(localStorage.getItem('todos')) || [];

    const deleted = todos.filter(todo => todo.id !== id);

    localStorage.setItem('todos', JSON.stringify(deleted));

    dispatch({ type: 'REMOVE_TODO', payload: id });

    inputRef.current?.focus();
  };

  useEffect(() => {
    const saved = localStorage.getItem('todos');

    if (saved) {
      const parsed: Todo[] = JSON.parse(saved);

      dispatch({ type: 'SET_TODOS', payload: parsed });
    } else {
      dispatch({ type: 'SET_TODOS', payload: [] }); // ключ не трогаем
    }
  }, [dispatch]);

  const handleChangeStatusTodo = (id?: number) => {
    const todos: Todo[] = JSON.parse(localStorage.getItem('todos')) || [];

    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );

    localStorage.setItem('todos', JSON.stringify(updatedTodos));

    dispatch({ type: 'CHANGE_STATUS', payload: id });
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {state.todos.map(todo => (
        <div
          data-cy="Todo"
          className={classNames({
            'todo completed': todo.completed,
            'todo item-enter-done': !todo.completed,
          })}
          key={todo.id}
        >
          <label className="todo__status-label" htmlFor={`todo-${todo.id}`}>
            <input
              id={`todo-${todo.id}`}
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              defaultChecked={todo.completed}
              onClick={() => handleChangeStatusTodo(todo.id)}
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          {/* Remove button appears only on hover */}

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDelete(todo.id)}
          >
            ×
          </button>
        </div>
      ))}
    </section>
  );
};

/*



  This todo is an active todo
          <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              Not Completed Todo
            </span>

            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>
          </div>

           This todo is being edited
          <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            /* This form is shown instead of the title and remove button
            <form>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value="Todo is being edited now"
              />
            </form>
          </div>

          /* This todo is in loadind state
          <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              Todo is being saved now
            </span>

            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>
          </div>

*/
