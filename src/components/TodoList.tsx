/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import { useTodos } from '../context/TodoContext';
import classNames from 'classnames';
import { Todo } from '../type/Todo';

type TodoListProps = {
  filteredTodos: Todo[];
};

export const TododList: React.FC<TodoListProps> = ({ filteredTodos }) => {
  const { todos, setTodos } = useTodos();
  const [editingId, setEditingId] = useState<number>(0);
  const [titleTochange, setTitleToChange] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingId !== 0 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingId]);

  const deleteTodo = (todoId: number) => {
    setTodos(() => todos.filter(todo => todoId !== todo.id));
  };

  const changeCheckbox = (todoToUpdate: Todo) => {
    setTodos((currentTodos: Todo[]) => {
      return currentTodos.map(todo =>
        todo.id === todoToUpdate.id ? todoToUpdate : todo,
      );
    });
  };

  const handleEditingId = (event: React.FormEvent) => {
    event.preventDefault();
    if (!titleTochange.trim()) {
      deleteTodo(editingId);
    }

    setTodos(currentTodos =>
      currentTodos.map(currentTodo => {
        const updatedTodo = {
          ...currentTodo,
          title: titleTochange.trim(),
        };

        return currentTodo.id === editingId ? updatedTodo : currentTodo;
      }),
    );
    setEditingId(0);
  };

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setEditingId(0);
        setTitleToChange('');
      }
    };

    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <div
          data-cy="Todo"
          className={classNames('todo', { completed: todo.completed })}
          key={todo.id}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked
              onChange={() =>
                changeCheckbox({ ...todo, completed: !todo.completed })
              }
            />
          </label>
          {todo.id === editingId ? (
            <form onSubmit={handleEditingId}>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={titleTochange}
                onChange={e => {
                  setTitleToChange(e.target.value);
                  setEditingId(todo.id);
                }}
                onBlur={handleEditingId}
                ref={inputRef}
              />
            </form>
          ) : (
            <>
              <span
                data-cy="TodoTitle"
                className="todo__title"
                onDoubleClick={() => {
                  setEditingId(todo.id);
                  setTitleToChange(todo.title);
                }}
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
      {/* This todo is in loadind state */}
      {/* <div data-cy="Todo" className="todo">
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
      </div> */}
    </section>
  );
};
