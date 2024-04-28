import React, { useState, useMemo } from 'react';
import classNames from 'classnames';
import { useContext } from 'react';
import { TodoContext } from './TodoContext';
import { Todo } from '../type/Todo';

export const TodoList: React.FC = () => {
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editedTodoTitle, setEditedTodoTitle] = useState<string>('');

  const { todos, setTodos, filter } = useContext(TodoContext);

  const handleChange = (todo: Todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    const updatedTodos = todos.map(t => (t.id === todo.id ? updatedTodo : t));

    setTodos(updatedTodos);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTodoTitle(event.target.value);
  };

  const editTodo = (id: number, newTitle: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, title: newTitle };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);

    setTodos(updatedTodos);
  };

  const filteredTodos = useMemo(() => {
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
  }, [todos, filter]);

  const saveEditedTodoTitle = (id: number) => {
    const trimmedTitle = editedTodoTitle.trim();

    if (!trimmedTitle) {
      deleteTodo(id);
    } else {
      editTodo(id, trimmedTitle);
    }

    setEditingTodoId(null);
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
    id: number,
  ) => {
    if (event.key === 'Enter') {
      saveEditedTodoTitle(id);
    } else if (event.key === 'Escape') {
      setEditingTodoId(null);
    }
  };

  const handleDoubleClick = (id: number, title: string) => {
    setEditingTodoId(id);
    setEditedTodoTitle(title);
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.length > 0 &&
        filteredTodos.map(todo => (
          <div
            key={todo.id}
            data-cy="Todo"
            className={classNames('todo', { completed: todo.completed })}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
                onChange={() => handleChange(todo)}
              />
            </label>
            {editingTodoId !== null && editingTodoId === todo.id ? (
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                value={editedTodoTitle}
                onChange={handleTitleChange}
                onBlur={() => saveEditedTodoTitle(todo.id)}
                onKeyUp={event => handleKeyPress(event, todo.id)}
                autoFocus
              />
            ) : (
              <>
                <span
                  data-cy="TodoTitle"
                  className="todo__title"
                  onDoubleClick={() => handleDoubleClick(todo.id, todo.title)}
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
