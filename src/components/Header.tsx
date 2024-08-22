import React, { useContext, useEffect, useRef, useState } from 'react';
import { TodosContext } from '../context/TodosContext';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

type Props = {
  activeTodos: Todo[];
};

const getNewTodoId = (todos: Todo[]) => {
  if (!todos.length) {
    return 1;
  }

  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
};

export const Header: React.FC<Props> = ({ activeTodos }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [title, setTitle] = useState('');

  const allTodosAreCompleted = !activeTodos.length;
  const someTodosAreCompleted =
    !!activeTodos.length && activeTodos.length < todos.length;

  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [todos.length]);

  const handleToggle = () => {
    if (someTodosAreCompleted) {
      setTodos(
        todos.map(todo => {
          if (!todo.completed) {
            return { ...todo, completed: !todo.completed };
          }

          return todo;
        }),
      );
    } else {
      setTodos(
        todos.map(todo => {
          return { ...todo, completed: !todo.completed };
        }),
      );
    }
  };

  const createNewTodo = (todoTitle: string) => {
    const newTodo: Todo = {
      id: getNewTodoId(todos),
      title: todoTitle.trim(),
      completed: false,
    };

    return newTodo;
  };

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    setTodos([...todos, createNewTodo(title)]);
    setTitle('');
  };

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allTodosAreCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggle}
        />
      )}

      <form onSubmit={handleAddTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={titleInputRef}
          value={title}
          onChange={event => {
            setTitle(event.target.value);
          }}
        />
      </form>
    </header>
  );
};
