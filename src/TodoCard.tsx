import React, { useState, useContext, useRef } from 'react';
import classNames from 'classnames';
import { Todo } from './types/Todo';
import { TodosContext } from './TodoContext';
import { deleteTodos, updateTodos, renameTodos } from './api/todos';

type Props = {
  todos: Todo[],
  currentTodo: Todo,
};

export const TodoCard: React.FC<Props> = ({
  todos,
  currentTodo,
}) => {
  const {
    setTodos,
    setIsDeleteError,
    selectedTodo,
    setSelectedTodo,
    setIsUpdateError,
  } = useContext(TodosContext);
  const [updatedTitle, setUpdatedTitle] = useState(currentTodo.title);
  const inputRef = useRef<HTMLInputElement>(null);
  const remove = async () => {
    setIsDeleteError(false);

    try {
      const response = await deleteTodos(currentTodo.id);

      if (response !== 0) {
        setTodos(
          todos.filter(todo => todo.id !== currentTodo.id),
        );
      } else {
        setIsDeleteError(true);
      }
    } catch {
      setIsDeleteError(true);
    }
  };

  const rename = async () => {
    setIsUpdateError(false);

    try {
      await renameTodos(
        currentTodo.id,
        updatedTitle,
      ).then((response) => {
        setTodos((prevTodos) => {
          return (
            prevTodos.map(todo => (
              todo.id === currentTodo.id
                ? {
                  ...todo,
                  title: response.title,
                }
                : todo))
          );
        });
      });
    } catch {
      setIsUpdateError(true);
    }
  };

  const updateHandler = () => {
    if (updatedTitle === '') {
      remove();
    }

    if (updatedTitle !== currentTodo.title) {
      rename();
    }

    setSelectedTodo(null);
  };

  return (
    <li className={classNames('', {
      completed: currentTodo.completed && currentTodo !== selectedTodo,
      editing: currentTodo === selectedTodo,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={currentTodo.completed ? 'toggle-view' : 'toggle-completed'}
          checked={currentTodo.completed}
          onChange={() => {
            updateTodos(
              currentTodo.id,
              !currentTodo.completed,
            ).then((response) => {
              setTodos((prevTodos) => {
                return (
                  prevTodos.map(todo => (
                    todo.id === currentTodo.id
                      ? {
                        ...todo,
                        completed: response.completed,
                      } : todo))
                );
              });
            });
          }}
        />

        <label
          onDoubleClick={() => {
            setSelectedTodo(currentTodo);

            if (inputRef.current) {
              inputRef.current.focus();
            }
          }}
        >
          {currentTodo.title}
        </label>

        <button
          type="button"
          className="destroy"
          aria-label="delete"
          data-cy="deleteTodo"
          onClick={() => remove()}
        />
      </div>

      <input
        type="text"
        className="edit"
        placeholder="Empty todo will be deleted"
        value={updatedTitle}
        onBlur={() => updateHandler()}
        onChange={(event) => {
          setUpdatedTitle(event.target.value);
        }}
        onKeyUp={(event) => {
          if (event.key === 'Escape') {
            setUpdatedTitle(currentTodo.title);
            setSelectedTodo(null);
          }

          if (event.key === 'Enter') {
            event.preventDefault();
            updateHandler();
          }
        }}
      />
    </li>
  );
};
