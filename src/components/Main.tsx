import React, { useState } from 'react';
import cn from 'classnames';
import { TodoContext } from './TodoContext';
import { Status } from '../types/Status';
import { KeyboardKeys } from '../types/KeyboardKeys';

export const Main: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState<string>('');
  const {
    setTodos,
    todos,
    removeTodo,
    visibleTodos,
    isCompleted,
    setIsCompleted,
  } = React.useContext(TodoContext);

  const toggleCompleted = (id: number) => {
    if (isCompleted.includes(id)) {
      const completedTodo = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, status: Status.All };
        }

        return todo;
      });

      setTodos(completedTodo);
      setIsCompleted(isCompleted.filter((todoId) => todoId !== id));
    } else {
      const allTodo = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, status: Status.Completed };
        }

        return todo;
      });

      setTodos(allTodo);
      setIsCompleted([...isCompleted, id]);
    }
  };

  const allCompleted = () => {
    const completedId = todos.map(todo => todo.id);
    const allIsCompleted = completedId.every(id => isCompleted.includes(id));

    if (allIsCompleted) {
      const checkboxAllStatus = todos.map(todo => {
        return { ...todo, status: Status.All };
      });

      setTodos(checkboxAllStatus);
      setIsCompleted([]);
    } else {
      const checkboxAllCompleted = todos.map(todo => {
        return { ...todo, status: Status.Completed };
      });

      setTodos(checkboxAllCompleted);
      setIsCompleted(completedId);
    }
  };

  const handleDoubleClick = (id: number, title: string) => {
    setIsEditing(true);
    setEditingTodoId(id);
    setEditedText(title);
  };

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedText(event.target.value);
  };

  const handleEditKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === KeyboardKeys.Enter) {
      const changeTodo = todos.map(todo => {
        if (todo.id === editingTodoId) {
          return { ...todo, title: editedText };
        }

        return todo;
      });

      setTodos(changeTodo);
      setIsEditing(false);
      setEditingTodoId(null);
    }
  };

  return (
    <>
      <section className="main">
        {todos.length > 0 && (
          <>
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onClick={allCompleted}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul className="todo-list" data-cy="todoList">
              {visibleTodos.map((todo) => (
                <li
                  key={todo.id}
                  className={
                    cn({
                      completed: isCompleted.includes(todo.id),
                      editing: isEditing && editingTodoId === todo.id,
                    })
                  }
                  onDoubleClick={() => handleDoubleClick(todo.id, todo.title)}
                >
                  <div className="view">
                    <input
                      type="checkbox"
                      className="toggle"
                      id={`toggle-view-${todo.id}`}
                      onChange={() => toggleCompleted(todo.id)}
                      checked={isCompleted.includes(todo.id)}
                      value={editedText}
                    />
                    <label htmlFor={`toggle-view-${todo.id}`}>{todo.title}</label>
                    <button
                      type="button"
                      className="destroy"
                      data-cy="deleteTodo"
                      aria-label={`Delete todo: ${todo.title}`}
                      onClick={() => removeTodo(todo.id)}
                    />
                  </div>
                  <input
                    type="text"
                    className="edit"
                    value={editedText}
                    onChange={handleEditChange}
                    onKeyDown={handleEditKeyDown}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

    </>
  );
};
