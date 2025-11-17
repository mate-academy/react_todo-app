/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTodo } from '../hooks/useTodo';
import { Link } from '../types/Link';
import { Todo } from '../types/Todo';
import cn from 'classnames';

function filterTodos(todos: Todo[], filter: Link): Todo[] {
  switch (filter) {
    case 'All':
      return todos;

    case 'Active':
      return todos.filter(todo => !todo.completed);

    case 'Completed':
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
}

export const TodoAppMain: React.FC = () => {
  const {
    todos,
    filter,
    deleteTodo,
    selectTodo,
    editTodo,
    editingId,
    startEditing,
    finishEditing,
  } = useTodo();

  const [newTitle, setNewTitle] = useState<string>('');

  const newTitleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!editingId) {
      return;
    }

    newTitleRef.current?.focus();
  }, [editingId]);

  const visibleTodos: Todo[] = useMemo(() => {
    const readyTodos = filterTodos(todos, filter);

    return readyTodos;
  }, [todos, filter]);

  const onDableClick = (id: number, currTitle: string) => {
    startEditing(id);
    setNewTitle(currTitle);
  };

  const submitChangeTitile = () => {
    if (!editingId) {
      return;
    }

    const trimTitle = newTitle.trim();

    if (trimTitle === '') {
      deleteTodo(editingId);
      finishEditing();
      setNewTitle('');

      return;
    }

    editTodo(editingId, trimTitle);
    finishEditing();
    setNewTitle('');
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    submitChangeTitile();
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={cn('todo', { completed: todo.completed })}
        >
          <label className="todo__status-label" htmlFor={`todo-${todo.id}`}>
            <input
              id={`todo-${todo.id}`}
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => selectTodo(todo.id)}
            />
          </label>

          {editingId === todo.id ? (
            <form
              onSubmit={event => onSubmit(event)}
              onKeyUp={e => e.key === 'Escape' && finishEditing()}
            >
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={newTitle}
                onChange={event => setNewTitle(event.target.value)}
                ref={newTitleRef}
                onBlur={submitChangeTitile}
              />
            </form>
          ) : (
            <>
              <span
                data-cy="TodoTitle"
                className="todo__title"
                onDoubleClick={() => onDableClick(todo.id, todo.title)}
              >
                {todo.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => deleteTodo(todo.id)}
              >
                ×
              </button>
            </>
          )}
        </div>
      ))}
    </section>
  );
};
