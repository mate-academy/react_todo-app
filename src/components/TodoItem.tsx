import React, { useContext, useEffect, useRef } from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';
import { TodosContext } from './TodosContext';
import { TodosCases } from '../types/TodosFilter';

type Props = {
  getTodo: Todo
};

export const TodoItem: React.FC<Props> = ({ getTodo }) => {
  const context = useContext(TodosContext);

  const editRef = useRef<HTMLInputElement>(null);

  if (!context) {
    return null;
  }

  const {
    todoEditId,
    todoEdit,
    setTodos,
    setTodoEditId,
    setTodoEdit,
  } = context;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    editRef.current?.focus();
  }, [todoEditId]);

  const handleCheckbox = (id: number) => {
    setTodos(prevTodos => prevTodos.map(todo => {
      return todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo;
    }));
  };

  const handleDelete = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const handleDoubleClick = (id: number, title: string) => {
    setTodoEditId(id);
    setTodoEdit(title);
  };

  const resetChange = () => {
    setTodoEditId(0);
    setTodoEdit('');
  };

  const saveChange = () => {
    if (todoEditId !== 0) {
      if (!todoEdit) {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoEditId));
      } else {
        setTodos(prevTodos => prevTodos
          .map(todo => (todo.id === todoEditId
            ? { ...todo, title: todoEdit } : todo)));
      }

      resetChange();
    }
  };

  const handleChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case TodosCases.escape:
        resetChange();
        break;

      case TodosCases.enter:
        if (!todoEdit) {
          setTodos(prevTodos => prevTodos
            .filter(todo => todo.id !== todoEditId));
          resetChange();

          return;
        }

        saveChange();
        break;

      default:
        break;
    }
  };

  const { id, title, completed } = getTodo;

  return (
    <li
      className={cn(
        { completed },
        { editing: todoEditId === id },
      )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-view-${id}`}
          onChange={() => handleCheckbox(id)}
          checked={completed}
        />

        <label
          onDoubleClick={() => handleDoubleClick(id, title)}
        >
          {title}
        </label>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleDelete(id)}
        />
      </div>

      <input
        type="text"
        className="edit"
        value={todoEdit}
        onChange={(event) => setTodoEdit(event.target.value)}
        onKeyUp={handleChange}
        onBlur={saveChange}
        ref={editRef}
      />
    </li>
  );
};
