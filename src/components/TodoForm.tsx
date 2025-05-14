import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { add, toggleAll } from '../features/todosSlice';
import { useEffect, useRef, useState } from 'react';
import { getTodoId } from '../helpers/getTodoId';
import { Todo } from '../types/Todo';

export const TodoForm = () => {
  const { todos } = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');
  const inputField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputField.current?.focus();
  }, [todos]);

  const areAllCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    const newTodo: Todo = {
      id: getTodoId(),
      title: trimmedTitle,
      completed: false,
    };

    dispatch(add(newTodo));
    setTitle('');
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: areAllCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={() => dispatch(toggleAll())}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={inputField}
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
