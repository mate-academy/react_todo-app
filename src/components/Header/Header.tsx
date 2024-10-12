import { useContext, useEffect, useRef, useState } from 'react';
import {
  TodosContext,
  TodosDispatchContext,
} from '../TodoAppContext/TodoAppContext';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

export const Header: React.FC = () => {
  const [title, setTitle] = useState('');
  const dispatch = useContext(TodosDispatchContext);
  const { todos } = useContext(TodosContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const completedTodosLength = todos.filter(el => el.completed).length;
  const field = useRef<HTMLInputElement>(null);

  useEffect(() => {
    field.current?.focus();
  }, [isSubmitting, todos]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!title.trim()) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: title.trim(),
      completed: false,
    };

    dispatch({
      type: 'addTodo',
      payload: newTodo,
    });
    setTitle('');
    setIsSubmitting(false);
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length !== 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todos.length === completedTodosLength,
          })}
          data-cy="ToggleAllButton"
          onClick={() => {
            dispatch({ type: 'toggleAllStatuses' });
          }}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleAdd}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={field}
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
