/* eslint-disable react/no-unused-prop-types */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  onDelete: (id: number) => void;
  setTodos: (value: Todo[]) => void;
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ onDelete, todos, setTodos }) => {
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]');

    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleStartEditing = (todoId: number, title: string) => {
    setEditingTodoId(todoId);
    setNewTitle(title);
  };

  const handleSaveEditing = (todoId: number, title: string) => {
    if (!title.trim()) {
      onDelete(todoId);
    } else {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, title };
          // eslint-disable-next-line no-else-return
        } else {
          return todo;
        }
      });

      setTodos(updatedTodos);
      setEditingTodoId(null);
      setNewTitle('');
    }
  };

  return (
    <section className="todoapp__main">
      {todos.map(({ id, completed, title }) => {
        const isEditing = editingTodoId === id;

        return (
          <div
            key={id}
            className={classNames('todo', { completed, editing: isEditing })}
          >
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
                checked={completed}
                onChange={() => {
                  const updatedTodos = todos.map((todo) => {
                    if (todo.id === id) {
                      return { ...todo, completed: !completed };
                    // eslint-disable-next-line no-else-return
                    } else {
                      return todo;
                    }
                  });

                  setTodos(updatedTodos);
                }}
              />
            </label>

            {isEditing ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveEditing(id, newTitle);
                }}
              >
                <input
                  type="text"
                  className={classNames('todo__edit-input', {
                    'todo__edit-input--full-width': isEditing,
                  })}
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onBlur={() => handleSaveEditing(id, newTitle)}
                />
                <button type="submit" className="todo__remove">
                  ×
                </button>
              </form>
            ) : (
              <span
                className="todo__title"
                onDoubleClick={() => handleStartEditing(id, title)}
              >
                {title}
              </span>
            )}

            {!isEditing && (
              <button
                type="button"
                className="todo__remove"
                onClick={() => onDelete(id)}
              >
                ×
              </button>
            )}
          </div>
        );
      })}
    </section>
  );
};
