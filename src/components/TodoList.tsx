/* eslint-disable jsx-a11y/label-has-associated-control */
import { useContext } from 'react';
import { MyContext } from './state';
import { Filter } from '../Types/Filter';
import React from 'react';
import { Todo } from '../Types/Todo';

export const TodoList: React.FC = () => {
  const {
    todos,
    setTodos,
    filter,
    deleteTodo,
    setEditingTodoId,
    editingTodoId,
  } = useContext(MyContext);

  const filteredTodos = todos.filter((todo: Todo) => {
    switch (filter) {
      case Filter.ACTIVE:
        return !todo.completed;
      case Filter.COMPLETED:
        return todo.completed;
      case Filter.ALL:
        return true;
      default:
        return false;
    }
  });

  const toggleTodoCompleted = (id: number) => {
    setTodos((currentTodos: Todo[]) =>
      currentTodos.map((todo: Todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleUpdateTodo = (id: number, newTitle: string) => {
    const trimmedTitle = newTitle.trim();

    if (trimmedTitle) {
      setTodos((currentTodos: Todo[]) =>
        currentTodos.map((todo: Todo) =>
          todo.id === id ? { ...todo, title: trimmedTitle } : todo,
        ),
      );
    } else {
      deleteTodo(id);
    }

    setEditingTodoId(null);
  };

  const handleBlur = (id: number, currentTitle: string) => {
    handleUpdateTodo(id, currentTitle);
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map((todo: Todo) => (
        <div
          data-cy="Todo"
          className={`todo ${todo.completed ? 'completed' : ''}`}
          key={todo.id}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => toggleTodoCompleted(todo.id)}
            />
          </label>

          {editingTodoId === todo.id ? (
            <input
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              defaultValue={todo.title}
              onBlur={e => handleBlur(todo.id, e.target.value)}
              autoFocus
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleUpdateTodo(todo.id, e.currentTarget.value);
                }

                if (e.key === 'Escape') {
                  setEditingTodoId(null);
                }
              }}
            />
          ) : (
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => setEditingTodoId(todo.id)}
            >
              {todo.title}
            </span>
          )}

          {editingTodoId !== todo.id && (
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => deleteTodo(todo.id)}
            >
              ×
            </button>
          )}
        </div>
      ))}
    </section>
  );
};
